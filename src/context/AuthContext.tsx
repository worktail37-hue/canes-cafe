import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { useToast } from '../components/Toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isOwner: boolean;
  ownerUid: string | null;
  getIdToken: () => Promise<string | null>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  verifyOwnerSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 30-minute inactivity timeout for owner session security
const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [ownerUid, setOwnerUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const inactivityTimerRef = useRef<any>(null);

  const getIdToken = useCallback(async (): Promise<string | null> => {
    if (!auth.currentUser) return null;
    try {
      return await auth.currentUser.getIdToken(false);
    } catch {
      return null;
    }
  }, []);

  /**
   * Authorize exclusively via server-side verification:
   * Cryptographically verifies ID token + email_verified === true + server-locked UID.
   * Never trusts browser local state.
   */
  const verifyOwnerSession = useCallback(async (): Promise<boolean> => {
    const token = await getIdToken();
    if (!token) {
      setIsOwner(false);
      setOwnerUid(null);
      return false;
    }

    try {
      const res = await fetch('/api/admin/auth-verify', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.authorized && data.role === 'owner') {
          setIsOwner(true);
          setOwnerUid(data.uid || null);
          return true;
        }
      }
    } catch {
      // Network or verification error
    }

    setIsOwner(false);
    setOwnerUid(null);
    return false;
  }, [getIdToken]);

  const logout = useCallback(async () => {
    try {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      setIsOwner(false);
      setOwnerUid(null);
      await signOut(auth);
      showToast('Signed Out', 'You have been signed out successfully.', 'info');
    } catch {
      // Ignored
    }
  }, [showToast]);

  // Inactivity timeout handler
  const resetInactivityTimer = useCallback(() => {
    if (!isOwner) return;
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    inactivityTimerRef.current = setTimeout(() => {
      logout();
      showToast('Session Expired', 'Signed out due to 30 minutes of inactivity.', 'info');
    }, INACTIVITY_TIMEOUT_MS);
  }, [isOwner, logout, showToast]);

  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const handleActivity = () => resetInactivityTimer();

    events.forEach((evt) => window.addEventListener(evt, handleActivity));
    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleActivity));
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await verifyOwnerSession();
      } else {
        setIsOwner(false);
        setOwnerUid(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [verifyOwnerSession]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();

      const verifyRes = await fetch('/api/admin/auth-verify', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (verifyRes.ok) {
        setIsOwner(true);
        showToast('Owner Verified', 'Authenticated securely as Cane\'s Serve owner.', 'success');
      } else {
        setIsOwner(false);
        showToast('Access Denied', 'This Google account is not authorized as the website owner.', 'info');
      }
    } catch (err: any) {
      setIsOwner(false);
      showToast('Sign-In Notice', err.message || 'Authentication could not be completed.', 'info');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isOwner,
        ownerUid,
        getIdToken,
        signInWithGoogle,
        logout,
        verifyOwnerSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

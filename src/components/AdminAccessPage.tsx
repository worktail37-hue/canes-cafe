import React, { useState, useEffect } from 'react';
import {
  Lock,
  ShieldAlert,
  ShieldCheck,
  LogOut,
  ArrowLeft,
  SlidersHorizontal,
  RefreshCw,
  MessageSquare,
  Calendar,
  Store,
  Phone,
  ExternalLink,
  Send,
  Save,
  Trash2,
  Bot,
  Zap,
  RotateCcw,
} from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';
import { useHeadManager } from './HeadManager';

interface InquiryRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  topic: string;
  message: string;
  createdAt: string;
  status?: 'new' | 'contacted' | 'resolved';
  autoReplyText?: string;
  autoReplySentAt?: string;
  autoReplyStatus?: string;
}

interface WhatsAppStatus {
  isConfigured: boolean;
  provider: string;
  hasRecipientPhone: boolean;
  phoneMasked: string;
}

export const AdminAccessPage: React.FC = () => {
  const { user, isOwner, loading: authLoading, getIdToken, signInWithGoogle, logout } = useAuth();
  const { showToast } = useToast();
  const { navigateTo } = useHeadManager();

  const [activeTab, setActiveTab] = useState<'inquiries' | 'reservations' | 'store'>('inquiries');
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [reservations, setReservations] = useState<any[]>([]);
  const [storeInfo, setStoreInfo] = useState<any>({
    phone: '',
    email: '',
    address: '',
    city: '',
    bakingSchedule: '',
    adminWhatsAppPhone: '',
  });
  const [whatsappStatus, setWhatsappStatus] = useState<WhatsAppStatus | null>(null);
  const [aiUsage, setAiUsage] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dataLoading, setDataLoading] = useState(false);
  const [testingWhatsapp, setTestingWhatsapp] = useState(false);
  const [purging, setPurging] = useState(false);

  // Clear private data immediately if not verified owner
  useEffect(() => {
    if (!isOwner) {
      setInquiries([]);
      setReservations([]);
      setWhatsappStatus(null);
      setAiUsage(null);
    }
  }, [isOwner]);

  const loadData = async () => {
    if (!isOwner) return;
    setDataLoading(true);
    try {
      const token = await getIdToken();
      if (!token) {
        throw new Error('Owner session token not available');
      }

      const authHeaders: HeadersInit = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const [resData, storeData, inqData, waData, aiUsageData] = await Promise.all([
        fetch('/api/reservations', { headers: authHeaders }).then((res) => (res.ok ? res.json() : [])),
        fetch('/api/store-info').then((res) => (res.ok ? res.json() : ({} as any))),
        fetch('/api/admin/inquiries', { headers: authHeaders }).then((res) => (res.ok ? res.json() : [])),
        fetch('/api/admin/whatsapp-status', { headers: authHeaders }).then((res) => (res.ok ? res.json() : null)),
        fetch('/api/admin/ai-usage', { headers: authHeaders }).then((res) => (res.ok ? res.json() : null)),
      ]);

      setReservations(resData || []);
      setAiUsage(aiUsageData);
      if (storeData && storeData.phone) {
        setStoreInfo(storeData);
      }

      const combinedMap = new Map<string, InquiryRecord>();
      if (Array.isArray(inqData)) {
        inqData.forEach((item: InquiryRecord) => {
          if (item?.id) combinedMap.set(item.id, item);
        });
      }

      // Also query private Firestore inquiries collection
      try {
        const snap = await getDocs(collection(db, 'inquiries'));
        snap.forEach((docSnap) => {
          const fsData = docSnap.data() as InquiryRecord;
          if (fsData && docSnap.id) {
            combinedMap.set(docSnap.id, { ...fsData, id: docSnap.id });
          }
        });
      } catch (fsErr) {
        console.warn('Firestore live inquiries read notice:', fsErr);
      }

      const mergedList = Array.from(combinedMap.values()).sort(
        (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );

      setInquiries(mergedList);
      setWhatsappStatus(waData);
    } catch (err) {
      console.error('Error loading admin portal data:', err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleDeleteInquiry = async (inquiryId: string) => {
    if (!window.confirm(`Permanently delete inquiry #${inquiryId}? This cannot be undone.`)) return;
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/admin/inquiries/${inquiryId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token || ''}` },
      });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== inquiryId));
        showToast('Lead Deleted', `Inquiry #${inquiryId} permanently removed.`, 'success');
      } else {
        showToast('Error', 'Could not delete inquiry.', 'info');
      }
    } catch {
      showToast('Error', 'Deletion failed.', 'info');
    }
  };

  const handleDeleteReservation = async (resId: string) => {
    if (!window.confirm(`Permanently delete reservation ${resId}? This cannot be undone.`)) return;
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/admin/reservations/${resId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token || ''}` },
      });
      if (res.ok) {
        setReservations((prev) => prev.filter((r) => r.id !== resId));
        showToast('Reservation Deleted', `Reservation ${resId} permanently removed.`, 'success');
      } else {
        showToast('Error', 'Could not delete reservation.', 'info');
      }
    } catch {
      showToast('Error', 'Deletion failed.', 'info');
    }
  };

  const handleToggleAi = async (enable: boolean) => {
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/ai-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`,
        },
        body: JSON.stringify({ enabled: enable }),
      });
      if (res.ok) {
        const data = await res.json();
        setAiUsage((prev: any) => ({ ...prev, enabled: data.aiControl.enabled }));
        showToast('AI Auto-Replies', enable ? 'Auto-replies activated.' : 'Auto-replies disabled.', 'success');
      }
    } catch {
      showToast('Error', 'Failed to update AI settings.', 'info');
    }
  };

  const handleResetCircuitBreaker = async () => {
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/ai-settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`,
        },
        body: JSON.stringify({ resetCircuitBreaker: true }),
      });
      if (res.ok) {
        setAiUsage((prev: any) => ({ ...prev, circuitBreakerActive: false }));
        showToast('Circuit Breaker Reset', 'AI auto-replies resumed successfully.', 'success');
      }
    } catch {
      showToast('Error', 'Failed to reset circuit breaker.', 'info');
    }
  };

  const handlePurgeOldRecords = async () => {
    if (!window.confirm('Purge all inquiries and reservations older than 180 days according to the data retention policy?')) return;
    setPurging(true);
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/retention-purge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`,
        },
        body: JSON.stringify({ retentionDays: 180 }),
      });
      if (res.ok) {
        const data = await res.json();
        showToast(
          'Data Retention Purge Completed',
          `Purged ${data.purgedInquiries} inquiries and ${data.purgedReservations} reservations older than 180 days.`,
          'success'
        );
        loadData();
      }
    } catch {
      showToast('Error', 'Purge operation failed.', 'info');
    } finally {
      setPurging(false);
    }
  };

  useEffect(() => {
    if (isOwner) {
      loadData();
    }
  }, [isOwner]);

  const handleUpdateInquiryStatus = async (inquiryId: string, newStatus: 'new' | 'contacted' | 'resolved') => {
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/admin/inquiries/${inquiryId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === inquiryId ? { ...item, status: newStatus } : item))
        );
        showToast('Status Updated', `Inquiry #${inquiryId} marked as ${newStatus}.`, 'success');
      } else {
        const errJson = await res.json().catch(() => ({}));
        showToast('Unauthorized', errJson.error || 'Failed to update status', 'info');
      }
    } catch (err) {
      console.error(err);
      showToast('Error', 'Could not update status.', 'info');
    }
  };

  const handleSaveStoreInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = await getIdToken();
      const res = await fetch('/api/store-info', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`,
        },
        body: JSON.stringify(storeInfo),
      });
      if (res.ok) {
        showToast('Store Info Updated', 'New phone, email, and location details saved.', 'success');
      } else {
        const errJson = await res.json().catch(() => ({}));
        showToast('Unauthorized', errJson.error || 'Failed to update store info', 'info');
      }
    } catch (err) {
      console.error(err);
      showToast('Save Failed', 'Could not save store info.', 'info');
    }
  };

  const handleTestWhatsApp = async () => {
    setTestingWhatsapp(true);
    try {
      const token = await getIdToken();
      const res = await fetch('/api/admin/whatsapp-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token || ''}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        showToast(
          'WhatsApp Alert Test Sent!',
          `Dispatched test notification via ${data.result?.provider || 'server channel'}.`,
          'success'
        );
      } else {
        showToast('Unauthorized', data.error || 'WhatsApp test alert rejected.', 'info');
      }
    } catch (err) {
      console.error(err);
      showToast('Test Failed', 'Could not dispatch WhatsApp test alert.', 'info');
    } finally {
      setTestingWhatsapp(false);
    }
  };

  // 1. Loading state during session bootstrap
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#F4F0EA] flex items-center justify-center p-6 text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 border-4 border-[#3B322C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-[#3B322C] text-sm font-semibold tracking-wide">
            Verifying Owner Authentication &amp; Permissions...
          </p>
        </div>
      </div>
    );
  }

  // 2. UNAUTHORIZED / ACCESS DENIED VIEW
  if (!isOwner) {
    return (
      <div className="min-h-screen bg-[#F4F0EA] flex flex-col justify-between p-6 sm:p-12 text-[#2F2823]">
        <div className="max-w-md mx-auto w-full pt-8">
          <button
            onClick={() => navigateTo('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C7B6E] hover:text-[#3B322C] mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cane's Serve Storefront</span>
          </button>

          <div className="bg-white rounded-3xl border border-[#D6CCBE] shadow-xl p-8 sm:p-10 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#E9E3DA] border-2 border-[#D6CCBE] text-[#3B322C] flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-10 h-10 text-[#C9A24B]" />
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#8C7B6E] block mb-1">
                403 Forbidden · Owner Only
              </span>
              <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#3B322C]">
                Access Denied
              </h1>
              <p className="text-xs text-[#8C7B6E] mt-2 leading-relaxed">
                Cane's Serve Manager contains private customer contact records, table bookings, and operational controls. Access is strictly restricted to the verified website owner.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#D6CCBE]/70 text-left text-xs space-y-2">
              <div className="flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#3B322C] leading-snug">
                  <strong>Strict Authorization Required:</strong> Regular visitors and ordinary customers cannot view or manage customer records.
                </p>
              </div>
              <div className="p-2 bg-white rounded-xl font-mono text-[11px] text-[#3B322C] border border-[#D6CCBE]/40 text-center">
                Access Policy: <strong>Authorized Owner Google Account Only</strong>
              </div>
            </div>

            {user ? (
              <div className="space-y-3 pt-2">
                <p className="text-xs text-red-600 font-semibold">
                  Signed in as <strong>{user.email}</strong> (Unauthorized)
                </p>
                <button
                  onClick={logout}
                  className="w-full py-3.5 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-bold uppercase tracking-wider hover:bg-[#2A231E] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out &amp; Switch Account</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <button
                  onClick={signInWithGoogle}
                  className="w-full py-3.5 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-bold uppercase tracking-wider hover:bg-[#2A231E] transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C9A24B]" />
                  <span>Sign In with Owner Google Account</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center text-xs text-[#8C7B6E] pt-8">
          © {new Date().getFullYear()} Cane's Serve · Verified Owner Security Protected
        </div>
      </div>
    );
  }

  // 3. AUTHORIZED OWNER FULL-PAGE MANAGER
  const filteredInquiries = inquiries.filter((item) => {
    const matchesStatus = filterStatus === 'all' || (item.status || 'new') === filterStatus;
    const matchesQuery =
      searchQuery.trim() === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#F4F0EA] text-[#2F2823] flex flex-col">
      {/* Top Bar */}
      <header className="bg-[#E9E3DA] border-b border-[#D6CCBE] px-4 sm:px-8 py-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('/')}
              className="p-2 rounded-full hover:bg-[#D6CCBE]/40 text-[#8C7B6E] hover:text-[#3B322C] transition-colors cursor-pointer"
              title="Return to Storefront"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#3B322C]">
                  CANE'S SERVE MANAGER
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#3B322C] text-[#C9A24B]">
                  <ShieldCheck className="w-3 h-3" />
                  Owner Verified
                </span>
              </div>
              <p className="text-xs text-[#8C7B6E]">
                Authenticated as: <strong>{user?.email}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadData}
              className="p-2.5 text-[#8C7B6E] hover:text-[#3B322C] rounded-full hover:bg-[#D6CCBE]/40 cursor-pointer"
              title="Refresh leads and data"
            >
              <RefreshCw className={`w-4 h-4 ${dataLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={logout}
              className="px-3.5 py-1.5 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-bold uppercase tracking-wider hover:bg-[#2A231E] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 flex-1">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#D6CCBE] bg-white rounded-2xl p-1.5 mb-6 shadow-xs gap-1">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-[#3B322C] text-[#F3EEE7] shadow-sm'
                : 'text-[#8C7B6E] hover:text-[#3B322C] hover:bg-[#F4F0EA]'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-[#C9A24B]" />
            <span>Customer Leads &amp; Enquiries ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reservations')}
            className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'reservations'
                ? 'bg-[#3B322C] text-[#F3EEE7] shadow-sm'
                : 'text-[#8C7B6E] hover:text-[#3B322C] hover:bg-[#F4F0EA]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Table Requests ({reservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('store')}
            className={`flex-1 py-3 px-4 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer ${
              activeTab === 'store'
                ? 'bg-[#3B322C] text-[#F3EEE7] shadow-sm'
                : 'text-[#8C7B6E] hover:text-[#3B322C] hover:bg-[#F4F0EA]'
            }`}
          >
            <Store className="w-4 h-4" />
            <span>Store &amp; WhatsApp Alerts</span>
          </button>
        </div>

        {/* 1. INQUIRIES TAB */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Search leads by customer name, mobile, message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 p-3 rounded-2xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#3B322C] placeholder-[#8C7B6E] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="p-3 rounded-2xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#3B322C] font-semibold cursor-pointer"
              >
                <option value="all">All Leads ({inquiries.length})</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            {filteredInquiries.length === 0 ? (
              <div className="text-center py-20 text-[#8C7B6E] bg-white rounded-3xl border border-[#D6CCBE]">
                <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-30 text-[#3B322C]" />
                <p className="font-serif text-lg text-[#3B322C]">No customer inquiries match</p>
                <p className="text-xs mt-1">Customer inquiries submitted from the website will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredInquiries.map((inq) => {
                  const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
                  const defaultGreeting = `Hi ${inq.name}, thank you for reaching out to Cane's Serve regarding ${inq.topic}! How can we help you?`;
                  const waReplyText = encodeURIComponent(inq.autoReplyText || defaultGreeting);
                  const waDirectUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${waReplyText}` : null;

                  return (
                    <div
                      key={inq.id}
                      className="p-5 rounded-3xl bg-white border border-[#D6CCBE] shadow-xs space-y-3.5 hover:border-[#3B322C] transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#D6CCBE]/60">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-md bg-[#3B322C] text-[#F3EEE7]">
                            #{inq.id}
                          </span>
                          <span className="text-xs font-semibold text-[#8C7B6E] truncate max-w-[200px]">
                            {inq.topic}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <select
                            value={inq.status || 'new'}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as any)}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer ${
                              (inq.status || 'new') === 'new'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : inq.status === 'contacted'
                                ? 'bg-blue-100 text-blue-900 border-blue-300'
                                : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            }`}
                          >
                            <option value="new">● New Lead</option>
                            <option value="contacted">● Contacted</option>
                            <option value="resolved">● Resolved</option>
                          </select>
                          <span className="text-[10px] font-mono text-[#8C7B6E]">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-[#F4F0EA] p-3 rounded-2xl">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6E] block">
                            Customer Name
                          </span>
                          <p className="font-bold text-[#3B322C] text-sm">{inq.name}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6E] block">
                            Mobile Phone
                          </span>
                          <div className="flex items-center gap-1.5 font-mono text-[#3B322C]">
                            <Phone className="w-3.5 h-3.5 text-[#8C7B6E]" />
                            {inq.phone ? (
                              <a href={`tel:${inq.phone}`} className="hover:underline font-bold">
                                {inq.phone}
                              </a>
                            ) : (
                              <span className="italic text-[#8C7B6E]">Not provided</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-[#2F2823] bg-white p-3 rounded-2xl border border-[#D6CCBE]/60">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7B6E] block mb-1">
                          Message
                        </span>
                        <p className="leading-relaxed whitespace-pre-wrap">{inq.message}</p>
                      </div>

                      <div className="text-xs bg-[#FAF7F2] p-3 rounded-2xl border border-[#C9A24B]/40 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C9A24B] flex items-center gap-1">
                            <span>🤖</span>
                            <span>Automated AI WhatsApp Reply</span>
                          </span>
                          <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            Dispatched
                          </span>
                        </div>
                        <p className="text-[#3B322C] leading-relaxed text-[11px] whitespace-pre-wrap bg-white p-2.5 rounded-xl border border-[#D6CCBE]/50">
                          {inq.autoReplyText || defaultGreeting}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        {waDirectUrl ? (
                          <a
                            href={waDirectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 px-3 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#1EBE5D] transition-colors shadow-2xs"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Reply on WhatsApp</span>
                          </a>
                        ) : (
                          <button
                            disabled
                            className="flex-1 py-2.5 px-3 rounded-xl bg-gray-200 text-gray-500 text-xs font-bold cursor-not-allowed"
                          >
                            No Phone For WhatsApp
                          </button>
                        )}

                        {cleanPhone && (
                          <a
                            href={`tel:${cleanPhone}`}
                            className="py-2.5 px-3.5 rounded-xl bg-[#3B322C] text-[#F3EEE7] text-xs font-bold flex items-center gap-1.5 hover:bg-[#2A231E] transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-[#C9A24B]" />
                            <span>Call</span>
                          </a>
                        )}

                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer border border-red-200"
                          title="Permanently Delete Lead (Privacy Right)"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* 2. RESERVATIONS TAB */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            {reservations.length === 0 ? (
              <div className="text-center py-20 text-[#8C7B6E] bg-white rounded-3xl border border-[#D6CCBE]">
                <Calendar className="w-12 h-12 mx-auto mb-2 opacity-40 text-[#3B322C]" />
                <p className="font-serif text-lg text-[#3B322C]">No table reservations yet</p>
                <p className="text-xs mt-1">Confirmed guest bookings will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reservations.map((res) => (
                  <div
                    key={res.id}
                    className="p-5 rounded-3xl bg-white border border-[#D6CCBE] shadow-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-[#3B322C]">
                        {res.id}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#E9E3DA] text-[#3B322C]">
                          {res.guests} {res.guests === 1 ? 'Guest' : 'Guests'}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteReservation(res.id)}
                          className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer border border-red-200"
                          title="Permanently Delete Reservation"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="text-xs text-[#8C7B6E] space-y-1 bg-[#F4F0EA] p-3 rounded-2xl">
                      <p>
                        <strong className="text-[#3B322C]">Guest:</strong> {res.name} ·{' '}
                        <a href={`tel:${res.phone}`} className="text-[#3B322C] underline">
                          {res.phone}
                        </a>
                      </p>
                      <p>
                        <strong className="text-[#3B322C]">Date &amp; Time:</strong> {res.date} at {res.time}
                      </p>
                      <p>
                        <strong className="text-[#3B322C]">Seating Area:</strong> {res.seating}
                      </p>
                      {res.notes && (
                        <p>
                          <strong className="text-[#3B322C]">Special Notes:</strong> {res.notes}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. STORE & WHATSAPP ALERTS TAB */}
        {activeTab === 'store' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#D6CCBE] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💬</span>
                  <h3 className="font-serif font-bold text-base text-[#3B322C]">
                    Owner WhatsApp Alert System
                  </h3>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    whatsappStatus?.isConfigured
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {whatsappStatus?.isConfigured ? 'Active & Dispatched' : 'Server Logging Active'}
                </span>
              </div>

              <div className="text-xs text-[#2F2823] space-y-2.5 bg-[#F4F0EA] p-4 rounded-2xl border border-[#D6CCBE]/60">
                <div className="flex justify-between items-center">
                  <span className="text-[#8C7B6E]">Alert Provider:</span>
                  <span className="font-bold text-[#3B322C]">
                    {whatsappStatus?.provider || 'Initializing...'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#8C7B6E]">Recipient WhatsApp Phone:</span>
                  <span className="font-mono font-bold text-[#3B322C]">
                    {whatsappStatus?.phoneMasked || 'Not configured'}
                  </span>
                </div>
                <p className="text-[11px] text-[#8C7B6E] pt-2 border-t border-[#D6CCBE]/60">
                  🔒 <strong>Privacy Protection:</strong> Phone numbers and credentials reside solely on the server and are never exposed in client bundles or public APIs.
                </p>
              </div>

              <button
                onClick={handleTestWhatsApp}
                disabled={testingWhatsapp}
                type="button"
                className="w-full py-3 rounded-2xl bg-[#3B322C] text-[#F3EEE7] text-xs font-bold uppercase tracking-wider hover:bg-[#2A231E] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                {testingWhatsapp ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Test Alert...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>Send WhatsApp Test Alert</span>
                  </>
                )}
              </button>
            </div>

            {/* AI WhatsApp Auto-Reply Cost & Volume Controls (Step 4) */}
            <div className="p-6 rounded-3xl bg-white border border-[#D6CCBE] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-[#C9A24B]" />
                  <h3 className="font-serif font-bold text-base text-[#3B322C]">
                    AI WhatsApp Auto-Reply Controls
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  {aiUsage?.circuitBreakerActive && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800 animate-pulse">
                      Circuit Breaker Tripped
                    </span>
                  )}
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      aiUsage?.enabled
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {aiUsage?.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-[#F4F0EA] rounded-2xl border border-[#D6CCBE]/60">
                  <span className="text-[10px] text-[#8C7B6E] block font-semibold">Today's Auto-Replies</span>
                  <span className="text-xl font-mono font-bold text-[#3B322C]">
                    {aiUsage?.todayCount ?? 0} / {aiUsage?.dailyCap ?? 50}
                  </span>
                  <span className="text-[10px] text-[#8C7B6E] block mt-0.5">
                    {aiUsage?.todayRemaining ?? 50} remaining today
                  </span>
                </div>
                <div className="p-3.5 bg-[#F4F0EA] rounded-2xl border border-[#D6CCBE]/60">
                  <span className="text-[10px] text-[#8C7B6E] block font-semibold">Security Guard</span>
                  <span className="text-xs font-bold text-[#3B322C] flex items-center gap-1 mt-1">
                    <Zap className="w-3.5 h-3.5 text-amber-600" />
                    Injection Shield Active
                  </span>
                  <span className="text-[10px] text-[#8C7B6E] block mt-0.5">
                    Max 120 tokens · Schema constrained
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleAi(!aiUsage?.enabled)}
                  className={`flex-1 py-2.5 px-3 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                    aiUsage?.enabled
                      ? 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300'
                  }`}
                >
                  {aiUsage?.enabled ? 'Pause AI Auto-Replies' : 'Enable AI Auto-Replies'}
                </button>

                {aiUsage?.circuitBreakerActive && (
                  <button
                    type="button"
                    onClick={handleResetCircuitBreaker}
                    className="py-2.5 px-3 rounded-2xl text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-300 transition-all cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Breaker</span>
                  </button>
                )}
              </div>
            </div>

            {/* Data Retention & Privacy Management (Step 5) */}
            <div className="p-6 rounded-3xl bg-white border border-[#D6CCBE] shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-700" />
                <h3 className="font-serif font-bold text-base text-[#3B322C]">
                  Guest Data Privacy &amp; Retention
                </h3>
              </div>
              <p className="text-xs text-[#8C7B6E] leading-relaxed">
                In compliance with data minimization principles, customer inquiries and table requests older than 180 days can be permanently purged from the database.
              </p>
              <button
                type="button"
                onClick={handlePurgeOldRecords}
                disabled={purging}
                className="w-full py-3 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{purging ? 'Purging Records...' : 'Purge Records Older Than 180 Days'}</span>
              </button>
            </div>

            {/* Store Information Form */}
            <form onSubmit={handleSaveStoreInfo} className="bg-white p-6 rounded-3xl border border-[#D6CCBE] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#3B322C] mb-2">
                Storefront &amp; Contact Configuration
              </h3>

              <div className="p-4 bg-[#EAF7EE] rounded-2xl border border-[#A6E1BA] space-y-1.5">
                <label className="block text-xs font-bold text-[#1E7E34]">
                  Owner WhatsApp Phone Number (Incoming Alert Channel)
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +1 (555) 234-5678"
                  value={storeInfo.adminWhatsAppPhone || ''}
                  onChange={(e) => setStoreInfo({ ...storeInfo, adminWhatsAppPhone: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-[#A6E1BA] text-xs sm:text-sm text-[#1E7E34] font-bold focus:outline-none focus:ring-2 focus:ring-[#1E7E34]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B322C] mb-1">
                  Public Contact Phone
                </label>
                <input
                  type="text"
                  value={storeInfo.phone}
                  onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#3B322C] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B322C] mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={storeInfo.address}
                  onChange={(e) => setStoreInfo({ ...storeInfo, address: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#3B322C] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B322C] mb-1">
                  City, State &amp; Postal Code
                </label>
                <input
                  type="text"
                  value={storeInfo.city}
                  onChange={(e) => setStoreInfo({ ...storeInfo, city: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#3B322C] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3B322C] mb-1">
                  Baking Schedule Announcement
                </label>
                <input
                  type="text"
                  value={storeInfo.bakingSchedule}
                  onChange={(e) => setStoreInfo({ ...storeInfo, bakingSchedule: e.target.value })}
                  className="w-full p-3 rounded-xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#3B322C] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-bold uppercase tracking-wider hover:bg-[#2A231E] transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Store Settings to Backend</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  ShoppingBag,
  Clock,
  RotateCcw,
  LogIn,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Receipt,
  Search,
  ArrowUpDown,
  Filter,
  Sparkles,
  ChevronDown,
  Copy,
  Printer,
  Coffee,
  Check,
  TrendingUp,
  Package,
} from 'lucide-react';
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useOrderHistory } from '../context/OrderHistoryContext';
import { useToast } from './Toast';

export interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

export interface OrderRecord {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  pickupTime: string;
  notes?: string;
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'received' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
}

type SortOption = 'date_desc' | 'date_asc' | 'amount_desc' | 'amount_asc' | 'status_active';
type StatusFilter = 'all' | 'active' | 'ready' | 'completed';

export const OrderHistoryDashboard: React.FC = () => {
  const { isOrderHistoryOpen, closeOrderHistory, setOrdersCount } = useOrderHistory();
  const { user, isOwner, signInWithGoogle } = useAuth();
  const { addItem, setIsCartOpen } = useCart();
  const { showToast } = useToast();

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('date_desc');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [receiptOrderId, setReceiptOrderId] = useState<string | null>(null);
  const [lookupIdInput, setLookupIdInput] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);

  // Fetch purchase records
  useEffect(() => {
    if (!isOrderHistoryOpen) return;

    setLoading(true);

    const ordersCollection = collection(db, 'orders');

    // Retrieve local saved guest order IDs if any
    let localSavedIds: string[] = [];
    try {
      localSavedIds = JSON.parse(localStorage.getItem('canes_my_order_ids') || '[]');
    } catch {
      localSavedIds = [];
    }

    let unsubscribe: () => void = () => {};

    if (isOwner) {
      try {
        unsubscribe = onSnapshot(
          ordersCollection,
          (snapshot) => {
            const allDocs: OrderRecord[] = [];
            snapshot.forEach((d) => {
              allDocs.push({ id: d.id, ...(d.data() as any) });
            });
            setOrders(allDocs);
            setOrdersCount(allDocs.length);
            setLoading(false);
          },
          (error) => {
            console.warn('Firestore onSnapshot notice:', error?.message);
            setLoading(false);
          }
        );
      } catch (err) {
        console.warn('Firestore listener notice:', err);
        setLoading(false);
      }
    } else {
      // Non-owner / guest: retrieve only specific order references from server or Firestore single gets
      if (localSavedIds.length > 0) {
        Promise.all(
          localSavedIds.slice(0, 10).map((id) =>
            fetch(`/api/orders/${id}`)
              .then((r) => (r.ok ? r.json() : null))
              .catch(() => null)
          )
        ).then((results) => {
          const validOrders = results.filter(Boolean) as OrderRecord[];
          setOrders(validOrders);
          setOrdersCount(validOrders.length);
          setLoading(false);
        });
      } else {
        setOrders([]);
        setOrdersCount(0);
        setLoading(false);
      }
    }

    return () => unsubscribe();
  }, [isOrderHistoryOpen, user, isOwner, setOrdersCount]);

  // Handle single order lookup by Order ID
  const handleManualLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = lookupIdInput.trim().toUpperCase();
    if (!cleanId) return;

    setIsLookingUp(true);
    try {
      const orderDocRef = doc(db, 'orders', cleanId);
      const docSnap = await getDoc(orderDocRef);

      if (docSnap.exists()) {
        const found = { id: docSnap.id, ...(docSnap.data() as any) } as OrderRecord;
        setOrders((prev) => {
          const exists = prev.some((o) => o.id === found.id);
          return exists ? prev : [found, ...prev];
        });
        setExpandedOrderId(found.id);
        showToast('Order Found', `Retrieved order #${found.id} from Firestore.`, 'success');
        setLookupIdInput('');
      } else {
        // Check server api
        const res = await fetch(`/api/orders/${cleanId}`);
        if (res.ok) {
          const sOrder = await res.json();
          setOrders((prev) => {
            const exists = prev.some((o) => o.id === sOrder.id);
            return exists ? prev : [sOrder, ...prev];
          });
          setExpandedOrderId(sOrder.id);
          showToast('Order Found', `Retrieved order #${sOrder.id}.`, 'success');
          setLookupIdInput('');
        } else {
          showToast('Not Found', `No record found matching "${cleanId}".`, 'info');
        }
      }
    } catch (error) {
      console.error(error);
      showToast('Lookup Error', 'Could not verify order record.', 'info');
    } finally {
      setIsLookingUp(false);
    }
  };

  // Seed sample demo order in Firestore for demonstration & testing
  const handleCreateDemoOrder = async () => {
    const demoId = `CC-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDemoOrder: OrderRecord = {
      id: demoId,
      userId: user?.uid || 'guest_demo',
      customerName: user?.displayName || 'Coffee Connoisseur',
      customerPhone: '+1 (555) 789-0123',
      customerEmail: user?.email || 'guest@canescoffee.com',
      pickupTime: 'In 15–20 minutes',
      notes: 'Oat milk, extra dusting of cinnamon on croissant',
      paymentMethod: 'Pay at Counter (Card/Cash)',
      items: [
        { id: 'item-demo-1', name: 'Velvet Cortado', price: '$4.80', quantity: 1 },
        { id: 'item-demo-2', name: 'Golden Butter Croissant', price: '$4.25', quantity: 2 },
      ],
      subtotal: 13.3,
      tax: 1.06,
      total: 14.36,
      status: 'preparing',
      createdAt: new Date().toISOString(),
    };

    try {
      if (isOwner) {
        await setDoc(doc(db, 'orders', demoId), newDemoOrder).catch(() => null);
      }

      // Save to local list
      try {
        const existing = JSON.parse(localStorage.getItem('canes_my_order_ids') || '[]');
        existing.unshift(demoId);
        localStorage.setItem('canes_my_order_ids', JSON.stringify(existing));
      } catch {}

      setOrders((prev) => [newDemoOrder, ...prev]);
      setExpandedOrderId(demoId);
      showToast('Demo Order Placed', `Created order #${demoId}.`, 'success');
    } catch (err) {
      console.warn('Demo order note:', err);
    }
  };

  // Status advancement for interactive testing
  const handleAdvanceStatus = async (order: OrderRecord, e: React.MouseEvent) => {
    e.stopPropagation();
    const transitions: Record<string, OrderRecord['status']> = {
      received: 'preparing',
      preparing: 'ready',
      ready: 'completed',
      completed: 'received',
    };
    const nextStatus = transitions[order.status] || 'preparing';

    try {
      if (isOwner) {
        await updateDoc(doc(db, 'orders', order.id), { status: nextStatus }).catch(() => null);
      }
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: nextStatus } : o))
      );
      showToast('Status Updated', `Order #${order.id} is now "${nextStatus}".`, 'success');
    } catch (err) {
      console.warn('Update status error:', err);
      // Update locally
      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? { ...o, status: nextStatus } : o))
      );
    }
  };

  // Re-order items
  const handleReorder = (order: OrderRecord, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!order.items || order.items.length === 0) return;

    order.items.forEach((item) => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
      });
    });

    closeOrderHistory();
    setIsCartOpen(true);
    showToast(
      'Re-order Added to Bag',
      `${order.items.length} items added to your order bag.`,
      'success'
    );
  };

  // Copy order ID
  const handleCopyOrderId = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    showToast('Copied', `Order ID #${id} copied to clipboard.`, 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtered & Sorted orders list
  const processedOrders = useMemo(() => {
    let result = [...orders];

    // Status filter
    if (statusFilter === 'active') {
      result = result.filter((o) => o.status === 'received' || o.status === 'preparing');
    } else if (statusFilter === 'ready') {
      result = result.filter((o) => o.status === 'ready');
    } else if (statusFilter === 'completed') {
      result = result.filter((o) => o.status === 'completed' || o.status === 'cancelled');
    }

    // Text Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((o) => {
        const idMatch = o.id?.toLowerCase().includes(q);
        const nameMatch = o.customerName?.toLowerCase().includes(q);
        const itemMatch = o.items?.some((i) => i.name.toLowerCase().includes(q));
        const noteMatch = o.notes?.toLowerCase().includes(q);
        return idMatch || nameMatch || itemMatch || noteMatch;
      });
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'date_desc') {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      if (sortBy === 'date_asc') {
        return new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime();
      }
      if (sortBy === 'amount_desc') {
        return (b.total || 0) - (a.total || 0);
      }
      if (sortBy === 'amount_asc') {
        return (a.total || 0) - (b.total || 0);
      }
      if (sortBy === 'status_active') {
        const rank: Record<string, number> = {
          ready: 0,
          preparing: 1,
          received: 2,
          completed: 3,
          cancelled: 4,
        };
        const rankA = rank[a.status] ?? 99;
        const rankB = rank[b.status] ?? 99;
        if (rankA !== rankB) return rankA - rankB;
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
      return 0;
    });

    return result;
  }, [orders, statusFilter, searchQuery, sortBy]);

  // Dashboard lifetime calculations
  const metrics = useMemo(() => {
    const totalCount = orders.length;
    const totalSpent = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalItems = orders.reduce(
      (sum, o) => sum + (o.items?.reduce((iSum, item) => iSum + (item.quantity || 1), 0) || 0),
      0
    );

    // Identify favorite item
    const itemFreq: Record<string, number> = {};
    orders.forEach((o) => {
      o.items?.forEach((i) => {
        itemFreq[i.name] = (itemFreq[i.name] || 0) + (i.quantity || 1);
      });
    });

    let favoriteItem = 'Signature Pour-Over';
    let maxFreq = 0;
    for (const [name, freq] of Object.entries(itemFreq)) {
      if (freq > maxFreq) {
        maxFreq = freq;
        favoriteItem = name;
      }
    }

    return {
      totalCount,
      totalSpent,
      totalItems,
      favoriteItem,
      avgSpend: totalCount > 0 ? totalSpent / totalCount : 0,
    };
  }, [orders]);

  if (!isOrderHistoryOpen) return null;

  const getStatusBadge = (status: OrderRecord['status']) => {
    switch (status) {
      case 'received':
        return {
          label: 'Received',
          bg: 'bg-amber-100 text-amber-900 border-amber-300',
          dot: 'bg-amber-500',
        };
      case 'preparing':
        return {
          label: 'Brewing & Baking',
          bg: 'bg-blue-100 text-blue-900 border-blue-300',
          dot: 'bg-blue-500 animate-pulse',
        };
      case 'ready':
        return {
          label: 'Ready for Pickup',
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          dot: 'bg-emerald-500 animate-ping',
        };
      case 'completed':
        return {
          label: 'Completed',
          bg: 'bg-[#E9E3DA] text-[#3B322C] border-[#D6CCBE]',
          dot: 'bg-[#8C7B6E]',
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          bg: 'bg-red-100 text-red-900 border-red-300',
          dot: 'bg-red-500',
        };
      default:
        return {
          label: status,
          bg: 'bg-[#E9E3DA] text-[#3B322C] border-[#D6CCBE]',
          dot: 'bg-[#8C7B6E]',
        };
    }
  };

  const formatDate = (isoStr?: string) => {
    if (!isoStr) return 'Just now';
    try {
      const d = new Date(isoStr);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      });
    } catch {
      return isoStr;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-history-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2A231E]/75 backdrop-blur-xs transition-opacity"
        onClick={closeOrderHistory}
      />

      <div className="min-h-full flex items-center justify-center p-3 sm:p-6">
        <div className="relative bg-[#F4F0EA] rounded-3xl max-w-4xl w-full p-5 sm:p-8 border border-[#D6CCBE] shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-[#2F2823] my-8">
          {/* Header */}
          <div className="flex items-start justify-between pb-5 border-b border-[#D6CCBE]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#3B322C] text-[#C9A24B] flex items-center justify-center shadow-sm">
                <Receipt className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2
                    id="order-history-title"
                    className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#3B322C]"
                  >
                    ORDER HISTORY & DASHBOARD
                  </h2>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#E9E3DA] text-[#3B322C] border border-[#D6CCBE]">
                    FIRESTORE LIVE
                  </span>
                </div>
                <p className="text-xs text-[#8C7B6E] mt-0.5">
                  Track pickup status, view itemized receipts, and re-order signature roasts.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={closeOrderHistory}
                className="p-2 text-[#8C7B6E] hover:text-[#2A231E] rounded-full hover:bg-[#D6CCBE]/50 transition-colors"
                aria-label="Close Order History"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Account & Guest Banner */}
          <div className="mt-4 p-3.5 rounded-2xl bg-[#E9E3DA] border border-[#D6CCBE] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              {user ? (
                <>
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-7 h-7 rounded-full object-cover border border-[#D6CCBE]"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-[#3B322C] text-[#F3EEE7] flex items-center justify-center text-xs font-bold">
                      {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                    </div>
                  )}
                  <div>
                    <span className="font-semibold text-[#3B322C]">
                      {user.displayName || 'Customer'}
                    </span>
                    <span className="text-[#8C7B6E] ml-1.5">({user.email})</span>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2 text-[#8C7B6E]">
                  <ShoppingBag className="w-4 h-4 text-[#3B322C]" />
                  <span>Viewing Guest Orders in this session. Sign in to sync across devices.</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!user && (
                <button
                  onClick={signInWithGoogle}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#F4F0EA] border border-[#D6CCBE] text-[#3B322C] font-semibold text-xs transition-colors shadow-2xs"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Google Sign-In</span>
                </button>
              )}
              <button
                onClick={handleCreateDemoOrder}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#3B322C] hover:bg-[#2A231E] text-[#F3EEE7] font-semibold text-xs transition-all shadow-xs"
                title="Create a test order in Firestore to see live real-time sync"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span>+ Test Demo Order</span>
              </button>
            </div>
          </div>

          {/* DASHBOARD METRICS STRIP */}
          {orders.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <div className="p-3.5 rounded-2xl bg-white border border-[#D6CCBE] shadow-2xs">
                <div className="flex items-center justify-between text-[#8C7B6E] text-[11px] uppercase font-semibold">
                  <span>Total Orders</span>
                  <Package className="w-3.5 h-3.5 text-[#C9A24B]" />
                </div>
                <div className="mt-1 font-mono font-black text-xl text-[#3B322C]">
                  {metrics.totalCount}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#D6CCBE] shadow-2xs">
                <div className="flex items-center justify-between text-[#8C7B6E] text-[11px] uppercase font-semibold">
                  <span>Lifetime Spend</span>
                  <TrendingUp className="w-3.5 h-3.5 text-[#C9A24B]" />
                </div>
                <div className="mt-1 font-mono font-black text-xl text-[#3B322C]">
                  ${metrics.totalSpent.toFixed(2)}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#D6CCBE] shadow-2xs">
                <div className="flex items-center justify-between text-[#8C7B6E] text-[11px] uppercase font-semibold">
                  <span>Items Enjoyed</span>
                  <Coffee className="w-3.5 h-3.5 text-[#C9A24B]" />
                </div>
                <div className="mt-1 font-mono font-black text-xl text-[#3B322C]">
                  {metrics.totalItems}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#D6CCBE] shadow-2xs">
                <div className="flex items-center justify-between text-[#8C7B6E] text-[11px] uppercase font-semibold">
                  <span>Top Favorite</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                </div>
                <div className="mt-1 font-medium text-xs text-[#3B322C] truncate">
                  {metrics.favoriteItem}
                </div>
              </div>
            </div>
          )}

          {/* CONTROLS: SEARCH, FILTER & SORT */}
          <div className="mt-5 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#8C7B6E] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by order ID, coffee, bake, or note..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-[#D6CCBE] text-xs text-[#2F2823] placeholder-[#8C7B6E] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8C7B6E] hover:text-[#3B322C]"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Order ID / Phone Direct Lookup */}
              <form onSubmit={handleManualLookup} className="flex gap-1.5 shrink-0">
                <input
                  type="text"
                  placeholder="Lookup Order # (e.g. CC-1234)"
                  value={lookupIdInput}
                  onChange={(e) => setLookupIdInput(e.target.value)}
                  className="w-44 px-3 py-2 rounded-xl bg-white border border-[#D6CCBE] text-xs uppercase placeholder-normal text-[#2F2823] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                />
                <button
                  type="submit"
                  disabled={isLookingUp}
                  className="px-3.5 py-2 rounded-xl bg-[#3B322C] hover:bg-[#2A231E] text-[#F3EEE7] font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  {isLookingUp ? 'Searching...' : 'Lookup'}
                </button>
              </form>
            </div>

            {/* Filter pills & Sort selector */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <span className="text-[#8C7B6E] font-medium mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter:</span>
                </span>
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    statusFilter === 'all'
                      ? 'bg-[#3B322C] text-[#F3EEE7]'
                      : 'bg-white border border-[#D6CCBE] text-[#8C7B6E] hover:text-[#3B322C]'
                  }`}
                >
                  All ({orders.length})
                </button>
                <button
                  onClick={() => setStatusFilter('active')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    statusFilter === 'active'
                      ? 'bg-[#3B322C] text-[#F3EEE7]'
                      : 'bg-white border border-[#D6CCBE] text-[#8C7B6E] hover:text-[#3B322C]'
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => setStatusFilter('ready')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    statusFilter === 'ready'
                      ? 'bg-[#3B322C] text-[#F3EEE7]'
                      : 'bg-white border border-[#D6CCBE] text-[#8C7B6E] hover:text-[#3B322C]'
                  }`}
                >
                  Ready for Pickup
                </button>
                <button
                  onClick={() => setStatusFilter('completed')}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    statusFilter === 'completed'
                      ? 'bg-[#3B322C] text-[#F3EEE7]'
                      : 'bg-white border border-[#D6CCBE] text-[#8C7B6E] hover:text-[#3B322C]'
                  }`}
                >
                  Completed
                </button>
              </div>

              {/* Sorting control */}
              <div className="flex items-center gap-1.5 text-xs text-[#8C7B6E]">
                <ArrowUpDown className="w-3.5 h-3.5 text-[#3B322C]" />
                <span className="font-semibold uppercase text-[11px]">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-2.5 py-1.5 rounded-xl bg-white border border-[#D6CCBE] text-xs text-[#3B322C] font-medium focus:outline-none focus:ring-1 focus:ring-[#3B322C]"
                >
                  <option value="date_desc">Newest Order First</option>
                  <option value="date_asc">Oldest Order First</option>
                  <option value="amount_desc">Highest Price First</option>
                  <option value="amount_asc">Lowest Price First</option>
                  <option value="status_active">Active Pickup First</option>
                </select>
              </div>
            </div>
          </div>

          {/* ORDERS LIST CONTAINER */}
          <div className="mt-5 max-h-[55vh] overflow-y-auto space-y-3.5 pr-1.5">
            {loading ? (
              <div className="py-20 text-center text-[#8C7B6E] space-y-3">
                <Clock className="w-8 h-8 animate-spin mx-auto text-[#3B322C]" />
                <p className="text-xs font-medium">Fetching purchase records from Firestore...</p>
              </div>
            ) : processedOrders.length === 0 ? (
              <div className="py-16 text-center text-[#8C7B6E] p-8 bg-white rounded-3xl border border-[#D6CCBE] space-y-3">
                <ShoppingBag className="w-12 h-12 mx-auto opacity-40 text-[#3B322C]" />
                <h3 className="font-serif font-bold text-lg text-[#3B322C]">No orders found</h3>
                <p className="text-xs max-w-sm mx-auto leading-relaxed">
                  {searchQuery
                    ? `No orders matching "${searchQuery}". Try clearing your search.`
                    : 'You haven’t placed any orders yet. Try a demo order or browse our specialty coffee bar!'}
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={handleCreateDemoOrder}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-semibold hover:bg-[#2A231E]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C9A24B]" />
                    <span>Create Sample Order</span>
                  </button>
                  <button
                    onClick={() => {
                      closeOrderHistory();
                      const coffeeEl = document.querySelector('#our-coffee');
                      if (coffeeEl) coffeeEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E9E3DA] border border-[#D6CCBE] text-[#3B322C] text-xs font-semibold hover:bg-white"
                  >
                    <span>Browse Menu</span>
                  </button>
                </div>
              </div>
            ) : (
              processedOrders.map((order) => {
                const statusBadge = getStatusBadge(order.status);
                const isExpanded = expandedOrderId === order.id;

                return (
                  <div
                    key={order.id}
                    className="rounded-2xl bg-white border border-[#D6CCBE] shadow-2xs hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Main Row / Header */}
                    <div
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                      className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-[#F4F0EA]/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {/* Status Icon */}
                        <div className="w-9 h-9 rounded-xl bg-[#E9E3DA] text-[#3B322C] flex items-center justify-center shrink-0">
                          <Coffee className="w-4 h-4" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-[#3B322C]">
                              #{order.id}
                            </span>
                            <span
                              className={`inline-flex items-center gap-1.5 text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusBadge.bg}`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`} />
                              {statusBadge.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-[#8C7B6E]">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(order.createdAt)}</span>
                            </span>
                            <span>•</span>
                            <span>
                              {order.items?.length || 0}{' '}
                              {order.items?.length === 1 ? 'item' : 'items'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-mono font-black text-base text-[#3B322C]">
                            ${(order.total || 0).toFixed(2)}
                          </div>
                          <div className="text-[11px] text-[#8C7B6E]">
                            {order.pickupTime || 'Counter'}
                          </div>
                        </div>

                        <ChevronDown
                          className={`w-5 h-5 text-[#8C7B6E] transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </div>

                    {/* EXPANDED DETAILS ACCORDION */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-[#D6CCBE]/60 bg-[#F4F0EA]/30 space-y-4">
                        {/* Progress Stepper */}
                        <div className="py-2 px-3 rounded-xl bg-white border border-[#D6CCBE]/60">
                          <div className="flex items-center justify-between text-[11px] font-semibold text-[#8C7B6E] mb-2">
                            <span>Pickup Stage</span>
                            <button
                              onClick={(e) => handleAdvanceStatus(order, e)}
                              className="text-[10px] text-[#C9A24B] hover:text-[#3B322C] underline flex items-center gap-1"
                              title="Click to simulate next status step in Firestore"
                            >
                              <span>Next Status Step →</span>
                            </button>
                          </div>
                          <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                            <div
                              className={`p-1.5 rounded-lg ${
                                order.status === 'received' ||
                                order.status === 'preparing' ||
                                order.status === 'ready' ||
                                order.status === 'completed'
                                  ? 'bg-[#3B322C] text-[#F3EEE7]'
                                  : 'bg-[#E9E3DA] text-[#8C7B6E]'
                              }`}
                            >
                              1. Received
                            </div>
                            <div
                              className={`p-1.5 rounded-lg ${
                                order.status === 'preparing' ||
                                order.status === 'ready' ||
                                order.status === 'completed'
                                  ? 'bg-[#3B322C] text-[#F3EEE7]'
                                  : 'bg-[#E9E3DA] text-[#8C7B6E]'
                              }`}
                            >
                              2. Brewing
                            </div>
                            <div
                              className={`p-1.5 rounded-lg ${
                                order.status === 'ready' || order.status === 'completed'
                                  ? 'bg-[#3B322C] text-[#F3EEE7]'
                                  : 'bg-[#E9E3DA] text-[#8C7B6E]'
                              }`}
                            >
                              3. Ready
                            </div>
                            <div
                              className={`p-1.5 rounded-lg ${
                                order.status === 'completed'
                                  ? 'bg-[#3B322C] text-[#F3EEE7]'
                                  : 'bg-[#E9E3DA] text-[#8C7B6E]'
                              }`}
                            >
                              4. Picked Up
                            </div>
                          </div>
                        </div>

                        {/* Customer & Pickup Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white p-3.5 rounded-xl border border-[#D6CCBE]/60">
                          <div>
                            <span className="text-[#8C7B6E] block text-[11px]">Pickup Customer:</span>
                            <span className="font-semibold text-[#3B322C]">
                              {order.customerName}
                            </span>
                            <span className="text-[#8C7B6E] block">{order.customerPhone}</span>
                          </div>
                          <div>
                            <span className="text-[#8C7B6E] block text-[11px]">Timing & Payment:</span>
                            <span className="font-semibold text-[#3B322C]">
                              {order.pickupTime}
                            </span>
                            <span className="text-[#8C7B6E] block">
                              {order.paymentMethod || 'At Counter'}
                            </span>
                          </div>
                          {order.notes && (
                            <div className="sm:col-span-2 pt-2 border-t border-[#D6CCBE]/40 text-[#8C7B6E]">
                              <span className="font-semibold text-[#3B322C]">Custom Note:</span>{' '}
                              {order.notes}
                            </div>
                          )}
                        </div>

                        {/* Itemized breakdown */}
                        <div className="bg-white rounded-xl p-3.5 border border-[#D6CCBE]/60 text-xs space-y-2">
                          <span className="font-semibold text-[#3B322C] block pb-1 border-b border-[#D6CCBE]/40">
                            Items Ordered
                          </span>
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-[#2F2823]">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-[#8C7B6E]">
                                  {item.quantity}x
                                </span>
                                <span className="font-medium">{item.name}</span>
                              </div>
                              <span className="font-mono text-[#3B322C]">{item.price}</span>
                            </div>
                          ))}

                          <div className="pt-2 border-t border-[#D6CCBE]/40 space-y-1 text-[#8C7B6E]">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span className="font-mono">
                                ${((order.subtotal || order.total * 0.92) || 0).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Taxes & Roastery Fees</span>
                              <span className="font-mono">
                                ${((order.tax || order.total * 0.08) || 0).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between font-bold text-sm text-[#3B322C] pt-1 border-t border-[#D6CCBE]/40">
                              <span>Total Paid</span>
                              <span className="font-mono">${(order.total || 0).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleCopyOrderId(order.id, e)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#E9E3DA] border border-[#D6CCBE] text-[11px] font-semibold text-[#3B322C] transition-colors"
                            >
                              {copiedId === order.id ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5 text-[#8C7B6E]" />
                              )}
                              <span>
                                {copiedId === order.id ? 'Copied' : `Copy #${order.id}`}
                              </span>
                            </button>

                            <button
                              onClick={() =>
                                setReceiptOrderId(receiptOrderId === order.id ? null : order.id)
                              }
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#E9E3DA] border border-[#D6CCBE] text-[11px] font-semibold text-[#3B322C] transition-colors"
                            >
                              <Printer className="w-3.5 h-3.5 text-[#8C7B6E]" />
                              <span>
                                {receiptOrderId === order.id ? 'Hide Receipt' : 'View Receipt'}
                              </span>
                            </button>
                          </div>

                          <button
                            onClick={(e) => handleReorder(order, e)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3B322C] hover:bg-[#2A231E] text-[#F3EEE7] text-xs font-semibold transition-all shadow-xs"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-[#C9A24B]" />
                            <span>Re-order to Bag</span>
                          </button>
                        </div>

                        {/* Printable Thermal Receipt Mock */}
                        {receiptOrderId === order.id && (
                          <div className="p-4 rounded-xl bg-white border border-dashed border-[#8C7B6E] font-mono text-xs text-[#2F2823] space-y-2 mt-2 shadow-inner">
                            <div className="text-center pb-2 border-b border-dashed border-[#D6CCBE]">
                              <p className="font-bold text-sm">CANE&apos;S COFFEE</p>
                              <p className="text-[10px] text-[#8C7B6E]">
                                428 Chestnut Mill Road, Suite 101, Portland
                              </p>
                              <p className="text-[10px] text-[#8C7B6E]">
                                Tel: +1 (555) 234-5678 • Order #{order.id}
                              </p>
                            </div>
                            <div className="space-y-1">
                              {order.items?.map((item, idx) => (
                                <div key={idx} className="flex justify-between">
                                  <span>
                                    {item.quantity}x {item.name}
                                  </span>
                                  <span>{item.price}</span>
                                </div>
                              ))}
                            </div>
                            <div className="pt-2 border-t border-dashed border-[#D6CCBE] flex justify-between font-bold">
                              <span>TOTAL</span>
                              <span>${(order.total || 0).toFixed(2)}</span>
                            </div>
                            <div className="text-center text-[10px] text-[#8C7B6E] pt-1">
                              *** Thank you for brewing with Cane&apos;s! ***
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, MapPin, Coffee } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrderHistory } from '../context/OrderHistoryContext';
import { useToast } from './Toast';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const { openOrderHistory } = useOrderHistory();
  const { showToast } = useToast();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [pickupTime, setPickupTime] = useState('In 15–20 minutes');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Pay at Counter (Card/Cash)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);

  useEffect(() => {
    if (user && !customerName && user.displayName) {
      setCustomerName(user.displayName);
    }
  }, [user]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => {
    const numeric = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + numeric * item.quantity;
  }, 0);
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      showToast('Missing Details', 'Please provide your name and phone number.', 'info');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.uid || 'guest',
          customerName: customerName.trim(),
          customerPhone: customerPhone.trim(),
          pickupTime,
          notes: notes.trim(),
          paymentMethod,
          items,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const data = await response.json();
      setConfirmedOrder(data.order);
      clearCart();

      // Cache order ID in local storage for guest & instant retrieval
      try {
        const existing = JSON.parse(localStorage.getItem('canes_my_order_ids') || '[]');
        if (!existing.includes(data.order.id)) {
          existing.unshift(data.order.id);
          localStorage.setItem('canes_my_order_ids', JSON.stringify(existing));
        }
      } catch (storageErr) {
        console.warn('Could not cache order ID in localStorage', storageErr);
      }

      // Persist in Firestore (also synchronized by server)
      try {
        await setDoc(doc(db, 'orders', data.order.id), {
          ...data.order,
          userId: user?.uid || 'guest',
        });
      } catch (fsErr) {
        console.warn('Direct Firestore order client write notice:', fsErr);
      }

      showToast('Order Placed!', `Your order ${data.order.id} has been received.`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Order Failed', 'Could not submit order to server. Please try again.', 'info');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAll = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#2A231E]/70 backdrop-blur-xs transition-opacity"
        onClick={confirmedOrder ? handleCloseAll : onClose}
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-[#F4F0EA] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#D6CCBE] shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-[#2F2823]">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#D6CCBE]">
            <div className="flex items-center gap-2">
              <Coffee className="w-5 h-5 text-[#3B322C]" />
              <h2 className="font-serif text-xl font-bold tracking-tight text-[#3B322C]">
                {confirmedOrder ? 'Order Confirmed!' : 'Express Counter Pickup'}
              </h2>
            </div>
            <button
              onClick={confirmedOrder ? handleCloseAll : onClose}
              className="p-1.5 text-[#8C7B6E] hover:text-[#2A231E] rounded-full hover:bg-[#D6CCBE]/40 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* If Order is Confirmed Receipt View */}
          {confirmedOrder ? (
            <div className="mt-6 space-y-6">
              <div className="p-6 rounded-2xl bg-white border border-[#D6CCBE] text-center shadow-sm">
                <div className="w-14 h-14 rounded-full bg-[#3B322C] text-[#C9A24B] flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#8C7B6E]">
                  Order Number
                </span>
                <h3 className="font-mono font-black text-3xl text-[#3B322C] mt-1">
                  {confirmedOrder.id}
                </h3>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9E3DA] text-[#3B322C] text-xs font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#C9A24B]" />
                  <span>Ready for pickup: {confirmedOrder.pickupTime}</span>
                </div>
              </div>

              {/* Order Itemized Summary */}
              <div className="p-4 rounded-2xl bg-[#E9E3DA]/80 border border-[#D6CCBE] text-xs space-y-2">
                <div className="font-serif font-bold text-sm text-[#3B322C] pb-2 border-b border-[#D6CCBE]">
                  Items Ordered
                </div>
                {confirmedOrder.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between text-[#2F2823]">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-mono">{item.price}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#D6CCBE] flex justify-between font-bold text-sm text-[#3B322C]">
                  <span>Total (incl. tax)</span>
                  <span className="font-mono">${confirmedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Pickup Note */}
              <div className="text-xs text-[#8C7B6E] flex items-start gap-2 bg-white p-3.5 rounded-xl border border-[#D6CCBE]">
                <MapPin className="w-4 h-4 text-[#3B322C] shrink-0 mt-0.5" />
                <p>
                  Please present your order code <strong className="text-[#3B322C] font-mono">{confirmedOrder.id}</strong> or name <strong className="text-[#3B322C]">{confirmedOrder.customerName}</strong> at the pick-up counter.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => {
                    handleCloseAll();
                    openOrderHistory();
                  }}
                  className="flex-1 py-3.5 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-semibold uppercase tracking-wider hover:bg-[#2A231E] transition-colors flex items-center justify-center gap-2"
                >
                  <Coffee className="w-4 h-4 text-[#C9A24B]" />
                  <span>Track in Order History</span>
                </button>
                <button
                  onClick={handleCloseAll}
                  className="py-3.5 px-6 rounded-full border border-[#D6CCBE] bg-white text-[#3B322C] text-xs font-semibold uppercase tracking-wider hover:bg-[#E9E3DA] transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* Order Input Form */
            <form onSubmit={handleSubmitOrder} className="mt-6 space-y-4">
              {/* Item overview */}
              <div className="p-3.5 rounded-xl bg-[#E9E3DA] border border-[#D6CCBE] text-xs flex justify-between items-center">
                <span className="text-[#8C7B6E]">
                  {items.length} {items.length === 1 ? 'item' : 'items'} in order bag
                </span>
                <span className="font-mono font-bold text-[#3B322C]">
                  Total: ${total.toFixed(2)}
                </span>
              </div>

              {/* Customer Name */}
              <div>
                <label className="block text-xs font-semibold text-[#3B322C] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#2F2823] placeholder-[#8C7B6E] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                />
              </div>

              {/* Mobile Phone Number */}
              <div>
                <label className="block text-xs font-semibold text-[#3B322C] mb-1">
                  Mobile Number <span className="text-red-500">*</span> (for pickup SMS)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +1 (555) 987-6543"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#2F2823] placeholder-[#8C7B6E] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                />
              </div>



              {/* Pickup Time Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#3B322C] mb-1">
                    Pickup Timing
                  </label>
                  <select
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#2F2823] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                  >
                    <option value="In 15–20 minutes">In 15–20 minutes</option>
                    <option value="In 30 minutes">In 30 minutes</option>
                    <option value="In 45 minutes">In 45 minutes</option>
                    <option value="In 1 hour">In 1 hour</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#3B322C] mb-1">
                    Payment Option
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#2F2823] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                  >
                    <option value="Pay at Counter (Card/Cash)">Pay at Counter</option>
                    <option value="Credit Card on Pickup">Credit / Debit Card</option>
                    <option value="Cash on Pickup">Cash on Pickup</option>
                  </select>
                </div>
              </div>

              {/* Special Instructions / Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#3B322C] mb-1">
                  Barista Notes / Customizations
                </label>
                <input
                  type="text"
                  placeholder="e.g. Oat milk, extra hot, no cinnamon on bun..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-[#D6CCBE] text-xs sm:text-sm text-[#2F2823] placeholder-[#8C7B6E] focus:outline-none focus:ring-2 focus:ring-[#3B322C]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || items.length === 0}
                  className="w-full py-4 rounded-full bg-[#3B322C] text-[#F3EEE7] text-xs font-bold uppercase tracking-wider hover:bg-[#2A231E] active:scale-98 transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Placing Order...</span>
                  ) : (
                    <span>Confirm & Send Order (${total.toFixed(2)})</span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

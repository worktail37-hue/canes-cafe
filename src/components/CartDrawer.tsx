import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Receipt } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrderHistory } from '../context/OrderHistoryContext';
import { CheckoutModal } from './CheckoutModal';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, items, count, removeItem, clearCart } = useCart();
  const { openOrderHistory } = useOrderHistory();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Calculate approximate subtotal from price strings like "$4.80"
  const subtotal = items.reduce((sum, item) => {
    const numeric = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
    return sum + numeric * item.quantity;
  }, 0);

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />

      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#2A231E]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#F4F0EA] border-l border-[#D6CCBE] shadow-2xl flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-[#D6CCBE] flex items-center justify-between bg-[#E9E3DA]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#3B322C]" />
                  <h2 className="font-serif text-lg font-bold tracking-tight text-[#3B322C]">
                    YOUR ORDER BAG ({count})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-[#3B322C] hover:text-[#2A231E] rounded-full hover:bg-[#D6CCBE]/50 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items list */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8C7B6E]">
                    <ShoppingBag className="w-12 h-12 mb-3 stroke-[1.2]" />
                    <p className="font-serif text-lg text-[#3B322C] font-semibold">Your bag is empty</p>
                    <p className="text-xs mt-1 text-[#8C7B6E] max-w-xs">
                      Explore our specialty brew bar and fresh morning bakes to add items.
                    </p>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        openOrderHistory();
                      }}
                      className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E9E3DA] hover:bg-[#3B322C] text-[#3B322C] hover:text-[#F3EEE7] text-xs font-semibold transition-all border border-[#D6CCBE]"
                    >
                      <Receipt className="w-3.5 h-3.5 text-[#C9A24B]" />
                      <span>View Past Orders</span>
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-white border border-[#D6CCBE]/60 flex items-center justify-between shadow-sm"
                    >
                      <div>
                        <h3 className="font-serif text-sm font-bold text-[#3B322C]">{item.name}</h3>
                        <p className="text-xs text-[#8C7B6E] mt-0.5">
                          Qty: {item.quantity} · {item.price} each
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-semibold text-[#3B322C]">
                          ${((parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0) * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#8C7B6E] hover:text-[#3B322C] transition-colors p-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer with subtotal */}
              {items.length > 0 && (
                <div className="p-6 border-t border-[#D6CCBE] bg-[#E9E3DA] space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#8C7B6E]">Estimated Subtotal</span>
                    <span className="font-mono font-bold text-lg text-[#3B322C]">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#8C7B6E]">
                    * Express pickup ready at counter in 15–20 mins.
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={handleOpenCheckout}
                      className="flex-1 py-3 px-5 rounded-full bg-[#3B322C] text-[#F3EEE7] font-medium text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#2A231E] transition-all duration-200 active:scale-[0.99] shadow-md"
                    >
                      <span>Proceed to Pickup</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={clearCart}
                      className="py-3 px-4 rounded-full border border-[#D6CCBE] text-[#3B322C] text-xs font-medium hover:bg-[#D6CCBE]/40 transition-colors"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};


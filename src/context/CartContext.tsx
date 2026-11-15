import React, { createContext, useContext, useState } from 'react';
import { useToast } from '../components/Toast';

export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image?: string;
}

interface CartContextType {
  count: number;
  items: CartItem[];
  addItem: (item: { id: string; name: string; price: string; image?: string }) => void;
  removeItem: (id: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 'c1',
      name: 'VELVET LATTE',
      price: '$4.80',
      quantity: 1,
    },
    {
      id: 'b1',
      name: 'BUTTER CROISSANT',
      price: '$3.90',
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { showToast } = useToast();

  const count = items.reduce((acc, curr) => acc + curr.quantity, 0);

  const addItem = (newItem: { id: string; name: string; price: string; image?: string }) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === newItem.id);
      if (existing) {
        return prev.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });

    showToast(`Added to bag`, `${newItem.name} (${newItem.price}) · Demo only`, 'success');
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        count,
        items,
        addItem,
        removeItem,
        isCartOpen,
        setIsCartOpen,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

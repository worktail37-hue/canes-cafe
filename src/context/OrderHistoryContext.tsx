import React, { createContext, useContext, useState } from 'react';

interface OrderHistoryContextType {
  isOrderHistoryOpen: boolean;
  setIsOrderHistoryOpen: (open: boolean) => void;
  openOrderHistory: () => void;
  closeOrderHistory: () => void;
  ordersCount: number;
  setOrdersCount: (count: number) => void;
}

const OrderHistoryContext = createContext<OrderHistoryContextType | undefined>(undefined);

export const OrderHistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [ordersCount, setOrdersCount] = useState(0);

  const openOrderHistory = () => setIsOrderHistoryOpen(true);
  const closeOrderHistory = () => setIsOrderHistoryOpen(false);

  return (
    <OrderHistoryContext.Provider
      value={{
        isOrderHistoryOpen,
        setIsOrderHistoryOpen,
        openOrderHistory,
        closeOrderHistory,
        ordersCount,
        setOrdersCount,
      }}
    >
      {children}
    </OrderHistoryContext.Provider>
  );
};

export const useOrderHistory = () => {
  const context = useContext(OrderHistoryContext);
  if (!context) {
    throw new Error('useOrderHistory must be used within an OrderHistoryProvider');
  }
  return context;
};

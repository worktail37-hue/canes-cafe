import React from 'react';
import { OrderHistoryDashboard } from './OrderHistoryDashboard';
import { useOrderHistory } from '../context/OrderHistoryContext';

interface OrderHistoryModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ isOpen, onClose }) => {
  const { isOrderHistoryOpen, closeOrderHistory } = useOrderHistory();

  // If controlled via props, respect props, otherwise use context
  const active = isOpen !== undefined ? isOpen : isOrderHistoryOpen;
  const handleClose = onClose || closeOrderHistory;

  if (!active) return null;

  return <OrderHistoryDashboard />;
};

export { OrderHistoryDashboard };

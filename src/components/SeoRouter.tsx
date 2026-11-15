import React from 'react';
import { HeadManager, useHeadManager } from './HeadManager';

export { useHeadManager };

export const SeoRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <HeadManager>{children}</HeadManager>;
};

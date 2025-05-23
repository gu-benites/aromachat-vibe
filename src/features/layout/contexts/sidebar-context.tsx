'use client';

import * as React from 'react';
import { SidebarProvider as BaseSidebarProvider, useSidebar as useBaseSidebar } from '@/components/ui/sidebar';

// Re-export the sidebar provider and hook for backward compatibility
export function SidebarProvider({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <BaseSidebarProvider defaultOpen={true}>
      {children}
    </BaseSidebarProvider>
  );
}

// Adapter hook to maintain the same API for existing components
export function useSidebar(): {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
} {
  const { isCollapsed, toggleSidebar, open, setOpen } = useBaseSidebar();
  
  return {
    isCollapsed,
    toggleSidebar,
    open,
    setOpen
  };
}

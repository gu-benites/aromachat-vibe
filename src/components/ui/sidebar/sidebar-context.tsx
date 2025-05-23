'use client';

import * as React from 'react';

export interface SidebarContextType {
  isCollapsed: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
}

const SidebarContext = React.createContext<SidebarContextType | undefined>(undefined);

export interface SidebarProviderProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function SidebarProvider({
  children,
  defaultOpen = true,
}: SidebarProviderProps): React.ReactElement {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(defaultOpen);

  const toggleSidebar = React.useCallback((): void => {
    setIsCollapsed(prev => !prev);
    setOpen(true); // Always ensure the sidebar is visible when toggling
  }, []);

  const value = React.useMemo(() => ({
    isCollapsed,
    open,
    setOpen,
    toggleSidebar,
  }), [isCollapsed, open, setOpen, toggleSidebar]);

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar(): SidebarContextType {
  const context = React.useContext(SidebarContext);
  
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  
  return context;
}

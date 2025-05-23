'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { useTheme } from '@/features/theme';
import { SidebarProvider } from '../contexts/sidebar-context';
import { Sidebar } from './sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({
  children,
  className,
}: MainLayoutProps) {
  const { isDark } = useTheme();

  return (
    <SidebarProvider>
      <div className={cn('flex min-h-screen flex-col', className)}>
        <div className="flex flex-1">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Mobile Sidebar */}
          <div className="md:hidden">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

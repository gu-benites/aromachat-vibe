'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { SidebarNav } from './sidebar-nav';
import { useTheme } from '@/features/theme';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({
  children,
  className,
}: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isDark } = useTheme();

  return (
    <div className={cn('flex min-h-screen flex-col', className)}>
      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarNav 
          isCollapsed={isCollapsed}
          onCollapse={setIsCollapsed}
          className="hidden md:block"
        />

        {/* Mobile sidebar */}
        <div className={cn(
          'fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity',
          isCollapsed ? 'pointer-events-none opacity-0' : 'md:hidden',
        )}>
          <div className="fixed inset-y-0 left-0 z-50 w-64">
            <SidebarNav 
              isCollapsed={false}
              onCollapse={setIsCollapsed}
              className="h-full"
            />
          </div>
        </div>

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            'fixed bottom-4 left-4 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-lg',
            'transition-transform duration-200 md:hidden',
            isCollapsed ? 'translate-x-0' : 'translate-x-72',
          )}
          aria-label={isCollapsed ? 'Open menu' : 'Close menu'}
        >
          {isCollapsed ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M3 12h18" />
              <path d="M3 6h18" />
              <path d="M3 18h18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          )}
        </button>

        {/* Main content */}
        <main className={cn(
          'flex-1 overflow-auto bg-background',
          isDark ? 'dark' : '',
        )}
        >
          <div className="h-full p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
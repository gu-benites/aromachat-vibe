'use client';

import { useState, useEffect } from 'react';
import { LayoutProps } from '../types/layout.types';
import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { LeftSideNavigation } from './left-side-navigation'; // Updated import
import { useTheme } from '@/features/theme';

/**
 * MainLayout component that provides the overall application structure
 */
export function MainLayout({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { isDark } = useTheme();

  return (
    <div className={cn('flex min-h-screen flex-col', className)}>
      <div className="flex flex-1">
        {/* Sidebar */}
        <LeftSideNavigation // Replaced SidebarNav
          isCollapsed={isCollapsed}
          onCollapse={setIsCollapsed}
          className="hidden md:block" // Desktop sidebar is fixed, main content will have margin
        />

        {/* Mobile sidebar - uses LeftSideNavigation as well */}
        {/* This section handles the overlay and visibility for mobile */}
        {!isCollapsed && ( // Show overlay and mobile sidebar only when not collapsed (menu is open)
          <div className={cn(
            'fixed inset-0 z-40 bg-background/80 backdrop-blur-sm transition-opacity md:hidden',
             // Apply opacity based on isCollapsed for smooth transition
          )} onClick={() => setIsCollapsed(true)} /> // Close on overlay click
        )}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out md:hidden",
          isCollapsed ? "-translate-x-full" : "translate-x-0 w-64" // Slide in/out
        )}>
            <LeftSideNavigation // Replaced SidebarNav
              isCollapsed={false} // Mobile sidebar is always "expanded" when shown
              onCollapse={() => setIsCollapsed(true)} // Collapse action should hide it
              className="h-full border-r" // Added border-r for consistency if needed
            />
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
          'flex-1 overflow-auto bg-background transition-all duration-300 ease-in-out', // Added transition
          isDark ? 'dark' : '',
          isCollapsed ? 'md:ml-[4.5rem]' : 'md:ml-64' // Dynamic margin for desktop
        )}
        >
          <div className="h-full p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

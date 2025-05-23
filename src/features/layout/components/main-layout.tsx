'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { useSidebar } from '../contexts/sidebar-context';
import { Sidebar } from './sidebar';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/features/theme';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({
  children,
  className,
}: MainLayoutProps) {
  const { open, toggleSidebar, setOpen } = useSidebar();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className={cn(
        'fixed inset-y-0 z-50 w-64 border-r transition-all duration-300 ease-in-out',
        'bg-sidebar text-sidebar-foreground',
        open ? 'translate-x-0' : '-translate-x-full',
        'md:relative md:translate-x-0'
      )}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <h1 className="text-xl font-semibold">AromaChat</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle showTooltip />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

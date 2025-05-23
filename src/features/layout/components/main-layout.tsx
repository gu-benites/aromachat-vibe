'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
// Removed useSidebar as we're managing state locally now
import { Sidebar } from './sidebar';
import { Button } from '@/components/ui/button';
import { Menu, MoreHorizontal } from 'lucide-react';
import { ThemeToggle } from '@/features/theme';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export function MainLayout({
  children,
  className,
}: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isDark, setIsDark] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Listen for theme changes
  React.useEffect(() => {
    const handleThemeChange = (e: Event) => {
      const { isDark: newIsDark } = (e as CustomEvent).detail || {};
      if (newIsDark !== undefined) {
        setIsDark(newIsDark);
      }
    };

    // Initial theme check
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    // Listen for theme changes
    window.addEventListener('theme-applied', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('theme-applied', handleThemeChange as EventListener);
    };
  }, []);

  // Close sidebar when clicking outside on mobile
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const sidebar = document.querySelector('.sidebar-container');
      const toggleButton = document.querySelector('.sidebar-toggle');
      
      if (sidebarOpen && 
          !sidebar?.contains(target) && 
          !toggleButton?.contains(target) &&
          window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div 
      className={cn(
        'flex h-screen w-full overflow-hidden bg-background',
        isDark ? 'dark' : ''
      )}
      data-theme={isDark ? 'dark' : 'light'}
    >
      {/* Sidebar */}
      <div 
        className={cn(
          'sidebar-container fixed inset-y-0 z-50 flex flex-col border-r bg-background transition-all duration-300 ease-in-out',
          'md:relative',
          sidebarOpen ? 'w-64 translate-x-0' : '-translate-x-full',
          isCollapsed && 'w-16',
          'md:translate-x-0',
          'shadow-sm'
        )}
        data-collapsed={isCollapsed}
      >
        <Sidebar collapsed={isCollapsed} onToggleCollapse={toggleCollapse} />
      </div>

      {/* Main Content */}
      <div className={cn(
        'flex flex-1 flex-col overflow-hidden transition-all duration-300',
        'bg-background',
        sidebarOpen ? 'md:ml-64' : 'md:ml-0',
        isCollapsed && 'md:ml-16',
        'relative'
      )}>
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b bg-background/95 backdrop-blur-sm px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className={cn(
                'sidebar-toggle -ml-1 h-9 w-9 rounded-full',
                'md:hidden'
              )}
              aria-label="Toggle sidebar"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">AromaChat</h1>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle 
              variant="ghost"
              size="sm"
              className="h-9 w-9"
              tooltipPosition="bottom"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 rounded-full"
              aria-label="More options"
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main
          className={cn(
            'flex-1 overflow-y-auto p-4 md:p-6',
            'text-foreground',
            'bg-muted/20',
            className
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

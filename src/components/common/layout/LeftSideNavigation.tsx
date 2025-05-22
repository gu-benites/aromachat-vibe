'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Home,
  MessageSquare,
  Users,
  Settings,
  Bell,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
  User,
  LogOut,
  HelpCircle,
  FileText,
  Calendar,
  BarChart2,
  Folder,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  isActive?: boolean;
}

export function LeftSideNavigation() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure the component is mounted before accessing the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return null;
  }
  
  const isDark = theme === 'dark';

  const navItems: NavItem[] = [
    { 
      title: 'Home', 
      href: '/', 
      icon: <Home className="h-5 w-5" />,
      isActive: pathname === '/',
    },
    { 
      title: 'Messages', 
      href: '/messages', 
      icon: <MessageSquare className="h-5 w-5" />,
      badge: 3,
      isActive: pathname?.startsWith('/messages'),
    },
    { 
      title: 'Team', 
      href: '/team', 
      icon: <Users className="h-5 w-5" />,
      isActive: pathname?.startsWith('/team'),
    },
    { 
      title: 'Projects', 
      href: '/projects', 
      icon: <Folder className="h-5 w-5" />,
      isActive: pathname?.startsWith('/projects'),
    },
    { 
      title: 'Calendar', 
      href: '/calendar', 
      icon: <Calendar className="h-5 w-5" />,
      isActive: pathname?.startsWith('/calendar'),
    },
    { 
      title: 'Analytics', 
      href: '/analytics', 
      icon: <BarChart2 className="h-5 w-5" />,
      isActive: pathname?.startsWith('/analytics'),
    },
  ];

  const bottomNavItems: NavItem[] = [
    { 
      title: 'Settings', 
      href: '/settings', 
      icon: <Settings className="h-5 w-5" />,
      isActive: pathname?.startsWith('/settings'),
    },
    { 
      title: 'Help & Support', 
      href: '/help', 
      icon: <HelpCircle className="h-5 w-5" />,
      isActive: pathname?.startsWith('/help'),
    },
  ];

  return (
    <div 
      className={cn(
        "fixed left-0 top-0 h-full bg-background border-r border-border z-40 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo and Toggle */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          {!isCollapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">AromaChat</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </div>

        {/* Navigation Items */}
        <ScrollArea className="flex-1 px-2 py-4">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <TooltipProvider key={item.href} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        item.isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                      )}
                    >
                      <div className="relative">
                        {item.icon}
                        {item.badge && (
                          <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {!isCollapsed && (
                        <span className="ml-3">{item.title}</span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}
          </nav>
        </ScrollArea>

        {/* Bottom Navigation */}
        <div className="border-t border-border p-2">
          <div className="space-y-1">
            {bottomNavItems.map((item) => (
              <TooltipProvider key={item.href} delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        item.isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                      )}
                    >
                      {item.icon}
                      {!isCollapsed && (
                        <span className="ml-3">{item.title}</span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      <p>{item.title}</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            ))}

            {/* Theme Toggle */}
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={toggleTheme}
                    className={cn(
                      "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
                    )}
                  >
                    {isDark ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                    {!isCollapsed && (
                      <span className="ml-3">
                        {isDark ? 'Light Mode' : 'Dark Mode'}
                      </span>
                    )}
                  </button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>{isDark ? 'Light Mode' : 'Dark Mode'}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* User Profile */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center px-3 py-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatars/01.png" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ThemeToggle } from '@/features/theme';
import { 
  Home, 
  Search,
  BarChart3,
  CheckCircle2,
  Target,
  Users,
  Settings,
  Bell,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
  Mail,
  FileText,
  Zap,
  HelpCircle
} from 'lucide-react';
import type { NavItem } from '../types/layout.types';

interface SidebarNavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean;
  onCollapse?: (isCollapsed: boolean) => void;
}

export function SidebarNav({ 
  className, 
  isCollapsed = false, 
  onCollapse 
}: SidebarNavProps) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});

  const navItems: NavItem[] = [
    {
      title: 'Dashboard',
      href: '/',
      icon: <Home className="h-5 w-5" />,
      isActive: pathname === '/',
    },
    {
      title: 'Search',
      href: '/search',
      icon: <Search className="h-5 w-5" />,
      isActive: pathname.startsWith('/search'),
    },
    {
      title: 'Messages',
      href: '/messages',
      icon: <MessageSquare className="h-5 w-5" />,
      badge: 3,
      isActive: pathname.startsWith('/messages'),
    },
    {
      title: 'Team',
      href: '/team',
      icon: <Users className="h-5 w-5" />,
      isActive: pathname.startsWith('/team'),
    },
    {
      title: 'Tasks',
      href: '/tasks',
      icon: <FileText className="h-5 w-5" />,
      isActive: pathname.startsWith('/tasks'),
      badge: 3,
    },
  ];

  const bottomNavItems: NavItem[] = [
    {
      title: 'Settings',
      href: '/settings',
      icon: <Settings className="h-5 w-5" />,
      isActive: pathname.startsWith('/settings'),
    },
    {
      title: 'Help',
      href: '/help',
      icon: <HelpCircle className="h-5 w-5" />,
      isActive: pathname.startsWith('/help'),
    },
  ];

  const toggleItem = (title: string) => {
    setOpenItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const toggleSidebar = () => {
    onCollapse?.(!isCollapsed);
  };

  const renderNavItem = (item: NavItem) => {
    if (item.children) {
      const isOpen = isCollapsed ? false : openItems[item.title];
      
      return (
        <div key={item.href} className="space-y-1">
          <Collapsible
            open={isOpen}
            onOpenChange={() => toggleItem(item.title)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'w-full justify-between h-9',
                  isCollapsed ? 'px-2' : 'px-3',
                  item.isActive 
                    ? 'bg-accent text-accent-foreground' 
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground',
                  'transition-colors duration-200 font-normal',
                  'group'
                )}
              >
                <div className="flex items-center">
                  <span className={cn(
                    "flex-shrink-0 text-muted-foreground group-hover:text-accent-foreground transition-colors", 
                    isCollapsed ? 'mr-0' : 'mr-3',
                    item.isActive ? 'text-accent-foreground' : ''
                  )}>
                    {item.icon}
                  </span>
                  {!isCollapsed && (
                    <span className="text-sm">{item.title}</span>
                  )}
                </div>
                {!isCollapsed && (
                  <ChevronDown className={cn(
                    'h-4 w-4 transition-transform text-muted-foreground group-hover:text-accent-foreground',
                    isOpen ? 'rotate-180' : '',
                    item.isActive ? 'text-accent-foreground' : ''
                  )} />
                )}
              </Button>
            </CollapsibleTrigger>
            {!isCollapsed && (
              <CollapsibleContent className="space-y-1">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      'flex items-center h-9 px-8 text-sm rounded-md transition-colors',
                      child.isActive 
                        ? 'bg-accent text-accent-foreground' 
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
                    )}
                  >
                    {child.title}
                  </Link>
                ))}
              </CollapsibleContent>
            )}
          </Collapsible>
        </div>
      );
    }

    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          'flex items-center h-9 px-3 rounded-md text-sm font-normal',
          'transition-colors duration-200 group',
          isCollapsed ? 'justify-center' : 'justify-start',
          item.isActive 
            ? 'bg-accent text-accent-foreground' 
            : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground',
        )}
      >
        <span className={cn(
          "flex-shrink-0 text-muted-foreground group-hover:text-accent-foreground transition-colors", 
          isCollapsed ? 'mr-0' : 'mr-3',
          item.isActive ? 'text-accent-foreground' : ''
        )}>
          {item.icon}
        </span>
        {!isCollapsed && (
          <>
            <span className="flex-1">{item.title}</span>
            {item.badge !== undefined && (
              <span className="ml-2 bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </>
        )}
      </Link>
    );
  };

  return (
    <div 
      className={cn(
        'flex h-screen flex-col border-r bg-card',
        'transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-14' : 'w-56',
        'dark:border-r-border/50',
        className
      )}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-3 border-b">
        {!isCollapsed && (
          <div className="flex items-center">
            <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center text-primary-foreground">
              <Zap className="h-4 w-4" />
            </div>
            <span className="ml-2.5 text-lg font-semibold text-foreground">AromaChat</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/50"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-3">
        <nav className="space-y-1">
          {navItems.map(renderNavItem)}
        </nav>
      </ScrollArea>

      {/* Footer with bottom nav items and user profile */}
      <div className="border-t p-2">
        <nav className="space-y-1">
          {bottomNavItems.map(renderNavItem)}
        </nav>

        <div className="mt-3 pt-3 border-t">
          <div className="flex items-center px-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user-1.jpg" alt="@username" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">Username</p>
                <p className="text-xs text-muted-foreground">user@example.com</p>
              </div>
            )}
          </div>
          <div className="mt-3 flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}

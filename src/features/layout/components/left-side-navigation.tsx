'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '@/features/theme';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import {
  Home,
  MessageSquare,
  Users,
  Settings as SettingsIcon,
  FileText,
  Bell,
  Hash,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Lock,
  Menu,
  User,
  LogOut,
} from 'lucide-react';

interface LeftSideNavigationProps {
  /**
   * Whether the sidebar is collapsed
   * @default false
   */
  isCollapsed?: boolean;
  /**
   * Callback when the collapse state changes
   */
  onCollapse?: (isCollapsed: boolean) => void;
  /**
   * Additional class name
   */
  className?: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  isActive?: boolean;
}

/**
 * LeftSideNavigation component that provides a collapsible sidebar navigation
 */
export function LeftSideNavigation({ 
  isCollapsed = false, 
  onCollapse,
  className 
}: LeftSideNavigationProps) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = React.useState(isCollapsed);
  
  // Sync with prop changes
  React.useEffect(() => {
    setInternalCollapsed(isCollapsed);
  }, [isCollapsed]);
  const { isDark } = useTheme();

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
      isActive: pathname.startsWith('/messages'),
    },
    {
      title: 'Channels',
      href: '/channels',
      icon: <Hash className="h-5 w-5" />,
      isActive: pathname.startsWith('/channels'),
    },
    {
      title: 'Team',
      href: '/team',
      icon: <Users className="h-5 w-5" />,
      isActive: pathname.startsWith('/team'),
    },
    {
      title: 'Documents',
      href: '/documents',
      icon: <FileText className="h-5 w-5" />,
      isActive: pathname.startsWith('/documents'),
    },
    {
      title: 'Notifications',
      href: '/notifications',
      icon: <Bell className="h-5 w-5" />,
      badge: 12,
      isActive: pathname.startsWith('/notifications'),
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon className="h-5 w-5" />,
      isActive: pathname.startsWith('/settings'),
    },
  ];

  const toggleCollapse = () => {
    const newState = !internalCollapsed;
    setInternalCollapsed(newState);
    onCollapse?.(newState);
  };

  return (
    <div
      className={cn(
        'relative flex h-screen flex-col border-r bg-background transition-all duration-300 ease-in-out',
        internalCollapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className={cn('flex items-center', internalCollapsed ? 'hidden' : 'flex')}>
          <Lock className="mr-2 h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">AromaChat</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleCollapse}
          className="h-8 w-8"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {navItems.map((item) => (
            <TooltipProvider key={item.href} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    asChild
                    variant={item.isActive ? 'secondary' : 'ghost'}
                    className={cn(
                      'w-full justify-start',
                      isCollapsed ? 'px-2' : 'px-3',
                      item.isActive ? 'font-semibold' : '',
                    )}
                  >
                    <Link href={item.href} className="relative">
                      <span className="flex items-center">
                        {item.icon}
                        {!isCollapsed && (
                          <div>
                            <div className="my-2 h-px bg-border" />
                            {item.title}
                          </div>
                        )}
                      </span>
                      {item.badge && (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </Button>
                </TooltipTrigger>
                {isCollapsed && (
                  <TooltipContent side="right">
                    <p>{item.title}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="mt-4 border-t p-4">
          <h3
            className={cn(
              'mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground',
              isCollapsed ? 'hidden' : 'block',
            )}
          >
            Direct Messages
          </h3>
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <Button
                key={i}
                variant="ghost"
                className={cn(
                  'w-full justify-start',
                  isCollapsed ? 'px-2' : 'px-3',
                )}
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={`/avatars/user-${i}.jpg`} />
                  <AvatarFallback>U{i}</AvatarFallback>
                </Avatar>
                {!isCollapsed && <span className="ml-2">User {i}</span>}
              </Button>
            ))}
          </div>
        </div>
      </ScrollArea>

      <div className="border-t p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user-1.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">@johndoe</p>
              </div>
            )}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}

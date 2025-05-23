'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard as DashboardIcon,
  Search as SearchIcon,
  BarChart as AnalyticsIcon,
  Users as UsersIcon,
  Settings as SettingsIcon,
  Bell as BellIcon,
  Mail as MailIcon,
  FileText as FileTextIcon,
  HelpCircle as HelpIcon,
  LogOut as LogOutIcon,
  ChevronDown,
  ChevronUp,
  Menu,
  User,
  MessageSquare,
  Calendar,
  FileCheck,
  Zap,
  PlusCircle,
  Headphones,
  Target,
  LayoutGrid,
  KanbanSquare,
  CheckCircle as CheckCircleIcon
} from 'lucide-react';
import { useSidebar } from '../contexts/sidebar-context';
// Theme context is used by ThemeToggle component
import { useTheme } from '@/features/theme/components/theme-provider';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  submenu?: boolean;
  items?: NavItem[];
};

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/',
    icon: <DashboardIcon className="h-5 w-5" />,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: <AnalyticsIcon className="h-5 w-5" />,
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: <MessageSquare className="h-5 w-5" />,
    badge: 3,
  },
  {
    title: 'Calendar',
    href: '/calendar',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    title: 'Tasks',
    href: '/tasks',
    icon: <FileCheck className="h-5 w-5" />,
    submenu: true,
    items: [
      { title: 'All Tasks', href: '/tasks', icon: <FileCheck className="h-4 w-4" /> },
      { title: 'Completed', href: '/tasks/completed', icon: <FileCheck className="h-4 w-4" /> },
      { title: 'In Progress', href: '/tasks/in-progress', icon: <FileCheck className="h-4 w-4" /> },
    ],
  },
  {
    title: 'Team',
    href: '/team',
    icon: <UsersIcon className="h-5 w-5" />,
  },
  {
    title: 'Kanban',
    href: '/kanban',
    icon: <KanbanSquare className="h-5 w-5" />,
  },
  {
    title: 'Objectives',
    href: '/objectives',
    icon: <Target className="h-5 w-5" />,
  },
];

const userMenuItems: NavItem[] = [
  {
    title: 'Documentation',
    href: '/docs',
    icon: <FileTextIcon className="h-5 w-5" />,
  },
  {
    title: 'Support',
    href: '/support',
    icon: <Headphones className="h-5 w-5" />,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <SettingsIcon className="h-5 w-5" />,
  },
];

function UserMenu({ collapsed }: { collapsed: boolean }) {
  const [expanded, setExpanded] = React.useState(false);
  const pathname = usePathname();
  useTheme(); // Initialize theme context

  return (
    <div className="mt-auto border-t p-4">
      <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-5 w-5" />
          </div>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background"></span>
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 overflow-hidden">
              <div className="font-medium">User Name</div>
              <div className="truncate text-xs text-muted-foreground">
                user@example.com
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </>
        )}
      </div>

      {!collapsed && expanded && (
        <div className="mt-4 space-y-1">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between rounded-md px-3 py-2">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggle 
              className="h-8 w-8"
              tooltipPosition="left"
            />
          </div>
          
          <Separator className="my-2" />
          
          {userMenuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          ))}
          
          <Separator className="my-2" />
          
          <Link
            href="/logout"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOutIcon className="h-5 w-5" />
            <span>Log out</span>
          </Link>
        </div>
      )}
    </div>
  );
}

function NavItemComponent({ item, collapsed, isActive, onToggle }: {
  item: NavItem;
  collapsed: boolean;
  isActive: (path: string) => boolean;
  onToggle?: (title: string) => void;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const hasItems = item.items && item.items.length > 0;
  const active = isActive(item.href);

  const handleClick = (e: React.MouseEvent) => {
    if (hasItems) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
      onToggle?.(item.title);
    }
  };

  return (
    <li>
      <Link
        href={item.href}
        onClick={handleClick}
        className={cn(
          'group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors',
          active ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground',
          collapsed ? 'justify-center px-0' : 'w-full'
        )}
      >
        <div className="flex items-center gap-3">
          <span className={cn(active ? 'text-primary' : 'text-muted-foreground')}>
            {item.icon}
          </span>
          {!collapsed && <span>{item.title}</span>}
        </div>
        
        {!collapsed && (
          <div className="flex items-center">
            {item.badge && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {item.badge}
              </span>
            )}
            {hasItems && (
              <span className="ml-2">
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </span>
            )}
          </div>
        )}
      </Link>
      
      {hasItems && !collapsed && isExpanded && (
        <ul className="ml-8 mt-1 space-y-1">
          {item.items?.map((subItem) => (
            <li key={subItem.href}>
              <Link
                href={subItem.href}
                className={cn(
                  'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors',
                  isActive(subItem.href)
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <span className="h-4 w-4">{subItem.icon}</span>
                <span>{subItem.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Sidebar(): React.ReactElement {
  const { isCollapsed: collapsed, toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({});

  const isActive = (path: string): boolean => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const toggleItem = (title: string): void => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div className={cn(
      'flex h-full flex-col border-r bg-background transition-all duration-300',
      collapsed ? 'w-16' : 'w-64'
    )}>
      {/* Logo and Toggle */}
      <div className='flex h-16 items-center justify-between border-b px-4'>
        <Link 
          href='/' 
          className={cn(
            'flex items-center gap-2 font-semibold',
            collapsed && 'justify-center w-full'
          )}
        >
          <div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary'>
            <Zap className='h-4 w-4' />
          </div>
          {!collapsed && <span>AromaChat</span>}
        </Link>
        {!collapsed && (
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8'
            onClick={toggleSidebar}
          >
            <Menu className='h-4 w-4' />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className='flex-1 overflow-y-auto overflow-x-hidden py-4'>
        <ul className='space-y-1 px-2'>
          {navItems.map((item) => (
            <NavItemComponent
              key={item.title}
              item={item}
              collapsed={collapsed}
              isActive={isActive}
              onToggle={toggleItem}
            />
          ))}
        </ul>
      </nav>

      {/* User Menu */}
      <UserMenu collapsed={collapsed} />
    </div>
  );
}

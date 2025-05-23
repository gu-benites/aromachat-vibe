'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import {
  LayoutDashboard,
  BarChart,
  Users,
  Settings,
  Bell,
  Mail,
  FileText,
  HelpCircle,
  LogOut,
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
  CheckCircle
} from 'lucide-react';
// Theme context is used by ThemeToggle component
import { useTheme } from '@/features/theme/components/theme-provider';

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
    icon: <LayoutDashboard className="h-4 w-4" />,
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    title: 'Chat',
    href: '/chat',
    icon: <MessageSquare className="h-4 w-4" />,
    badge: 3,
  },
  {
    title: 'Calendar',
    href: '/calendar',
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: 'Tasks',
    href: '/tasks',
    icon: <FileCheck className="h-4 w-4" />,
    submenu: true,
    items: [
      { title: 'All Tasks', href: '/tasks', icon: <FileCheck className="h-3.5 w-3.5" /> },
      { title: 'Completed', href: '/tasks/completed', icon: <CheckCircle className="h-3.5 w-3.5" /> },
      { title: 'In Progress', href: '/tasks/in-progress', icon: <Zap className="h-3.5 w-3.5" /> },
    ],
  },
  {
    title: 'Team',
    href: '/team',
    icon: <Users className="h-4 w-4" />,
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: <LayoutGrid className="h-4 w-4" />,
  },
  {
    title: 'Kanban',
    href: '/kanban',
    icon: <KanbanSquare className="h-4 w-4" />,
  },
  {
    title: 'Objectives',
    href: '/objectives',
    icon: <Target className="h-4 w-4" />,
  },
];

const userMenuItems: NavItem[] = [
  {
    title: 'Documentation',
    href: '/docs',
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: 'Support',
    href: '/support',
    icon: <Headphones className="h-4 w-4" />,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: <Settings className="h-4 w-4" />,
  },
];

function UserMenu({ collapsed }: { collapsed: boolean }) {
  const [expanded, setExpanded] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="mt-auto border-t p-4">
      <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
        <div className="relative">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="h-4 w-4" />
          </div>
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background"></span>
        </div>
        {!collapsed && (
          <>
            <div className="flex-1 overflow-hidden">
              <div className="truncate font-medium">John Doe</div>
              <div className="truncate text-xs text-muted-foreground">
                john.doe@example.com
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
              variant="ghost"
              size="sm"
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
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {React.cloneElement(item.icon as React.ReactElement, { className: 'h-4 w-4' })}
              <span>{item.title}</span>
            </Link>
          ))}
          
          <Separator className="my-2" />
          
          <Link
            href="/logout"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut className="h-4 w-4" />
            <span>Log out</span>
          </Link>
        </div>
      )}
    </div>
  );
}

interface NavItemComponentProps {
  item: NavItem;
  collapsed: boolean;
  isActive: (path: string) => boolean;
  isExpanded?: boolean;
  onToggle?: (title: string) => void;
}

function NavItemComponent({ 
  item, 
  collapsed, 
  isActive, 
  isExpanded = false, 
  onToggle 
}: NavItemComponentProps) {
  const [localIsExpanded, setLocalIsExpanded] = React.useState(false);
  const hasItems = item.items && item.items.length > 0;
  const active = isActive(item.href);
  const { theme } = useTheme();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const isDark = theme === 'dark' || (theme === 'system' && 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-color-scheme: dark)').matches);

  // Sync local expanded state with parent
  React.useEffect(() => {
    if (hasItems && onToggle) {
      setLocalIsExpanded(isExpanded);
    }
  }, [hasItems, isExpanded, onToggle]);

  const handleToggle = (e: React.MouseEvent) => {
    if (hasItems) {
      e.preventDefault();
      const newState = !localIsExpanded;
      setLocalIsExpanded(newState);
      onToggle?.(item.title);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (hasItems) {
        const newState = !localIsExpanded;
        setLocalIsExpanded(newState);
        onToggle?.(item.title);
      }
    }
  };

  const baseLinkClasses = cn(
    'group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'duration-200 ease-in-out',
    active 
      ? 'bg-accent/10 text-accent-foreground' 
      : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground',
    collapsed ? 'justify-center px-0' : 'w-full'
  );

  const iconClasses = cn(
    'flex h-5 w-5 items-center justify-center transition-colors',
    active ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
  );

  // Use a consistent badge class that doesn't depend on theme during SSR
  const badgeClasses = cn(
    'ml-auto flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1 text-xs font-medium',
    'transition-colors duration-200',
    active 
      ? 'bg-primary/20 text-primary' 
      : 'bg-primary/10 text-primary',
    'group-hover:bg-primary/20'
  );
  
  // For the collapsed badge, use the same class as the regular badge
  const collapsedBadgeClasses = cn(
    'absolute right-1 top-1 flex h-4 min-w-[1rem] items-center justify-center rounded-full px-1 text-[10px]',
    'text-primary-foreground bg-primary/10'
  );

  const subItemClasses = (isActive: boolean) => cn(
    'group flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'duration-200 ease-in-out',
    isActive 
      ? 'bg-accent/10 text-accent-foreground' 
      : 'text-foreground/80 hover:bg-accent hover:text-accent-foreground'
  );

  return (
    <li className="relative">
      <Link
        href={item.href}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className={baseLinkClasses}
        role={hasItems ? 'button' : undefined}
        aria-expanded={hasItems ? localIsExpanded : undefined}
        aria-haspopup={hasItems ? 'true' : undefined}
        aria-controls={hasItems ? `submenu-${item.title.toLowerCase().replace(/\s+/g, '-')}` : undefined}
      >
        <div className="relative flex items-center gap-3">
          <span className={iconClasses}>
            {React.cloneElement(item.icon as React.ReactElement, { 
              className: 'h-4 w-4',
              'aria-hidden': 'true' 
            })}
          </span>
          {!collapsed && (
            <span className="truncate">{item.title}</span>
          )}
        </div>
        
        {!collapsed && (
          <div className="flex items-center">
            {item.badge && (
              <span className={badgeClasses}>
                {item.badge}
              </span>
            )}
            {hasItems && (
              <span className="ml-2 text-muted-foreground">
                {localIsExpanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </span>
            )}
          </div>
        )}
        
        {collapsed && item.badge && (
          <div className={collapsedBadgeClasses}>
            {item.badge}
          </div>
        )}
      </Link>
      
      {hasItems && !collapsed && localIsExpanded && item.items && (
        <motion.ul 
          id={`submenu-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
          className="ml-2 mt-1 space-y-1 border-l-2 border-border pl-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          role="menu"
          aria-label={`${item.title} submenu`}
        >
          {item.items.map((subItem) => {
            const isSubItemActive = isActive(subItem.href);
            return (
              <motion.li 
                key={subItem.href}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={subItem.href}
                  className={subItemClasses(isSubItemActive)}
                  role="menuitem"
                  tabIndex={localIsExpanded ? 0 : -1}
                >
                  {subItem.icon && (
                    <span className="flex h-4 w-4 items-center justify-center">
                      {React.cloneElement(subItem.icon as React.ReactElement, { 
                        className: 'h-3.5 w-3.5',
                        'aria-hidden': 'true' 
                      })}
                    </span>
                  )}
                  <span className="truncate">{subItem.title}</span>
                  {subItem.badge && (
                    <span className={badgeClasses}>
                      {subItem.badge}
                    </span>
                  )}
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </li>
  );
}

// ... (rest of the code remains the same)
interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  className?: string;
}

export function Sidebar({ collapsed, onToggleCollapse, className }: SidebarProps): React.ReactElement {
  const pathname = usePathname();
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-color-scheme: dark)').matches);

  const isActive = (path: string): boolean => {
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div
      className={cn(
        'group/sidebar flex h-full flex-col border-r bg-background/95 backdrop-blur-sm',
        'transition-all duration-300 ease-in-out',
        'overflow-hidden',
        'shadow-sm',
        collapsed ? 'w-16' : 'w-64',
        'border-border/50',
        className
      )}
      data-collapsed={collapsed}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <h1 className="text-lg font-semibold tracking-tight">AromaChat</h1>
        )}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className={cn(
                'h-8 w-8',
                'transition-transform duration-200',
                'hover:bg-accent hover:text-accent-foreground',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                'rounded-full'
              )}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!collapsed}
              aria-controls="primary-navigation"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10}>
            {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Navigation */}
      <nav 
        id="primary-navigation"
        className={cn(
          'flex-1 overflow-y-auto overflow-x-hidden py-4',
          'scrollbar-thin scrollbar-thumb-border/50 scrollbar-thumb-rounded-full',
          'hover:scrollbar-thumb-border/70',
          'transition-colors duration-200',
          'px-2'
        )}
        aria-label="Main menu"
      >
        <ul className="space-y-1">
          {navItems.map((item) => (
            <NavItemComponent
              key={item.title}
              item={item}
              collapsed={collapsed}
              isActive={isActive}
              onToggle={item.submenu ? toggleItem : undefined}
              isExpanded={openItems[item.title]}
            />
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t p-4">
        <UserMenu collapsed={collapsed} />
      </div>
    </div>
  );
}

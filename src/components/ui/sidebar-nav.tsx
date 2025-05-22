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
  ChevronDown, 
  ChevronRight,
  ChevronLeft,
  Menu,
  MessageSquare,
  Mail,
  FileText,
  Zap,
  Bell,
  HelpCircle
} from 'lucide-react';

type NavItem = {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  isActive?: boolean;
  children?: NavItem[];
};

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
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({
    'Reporting': true,
    'Mail': true
  });

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
      title: 'Reporting',
      href: '/reporting',
      icon: <BarChart3 className="h-5 w-5" />,
      isActive: pathname.startsWith('/reporting'),
      children: [
        { 
          title: 'Objectives', 
          href: '/reporting/objectives',
          isActive: pathname === '/reporting/objectives',
        },
        { 
          title: 'Career Hub', 
          href: '/reporting/career-hub',
          isActive: pathname === '/reporting/career-hub',
        },
      ]
    },
    {
      title: 'Check-ins',
      href: '/check-ins',
      icon: <CheckCircle2 className="h-5 w-5" />,
      isActive: pathname.startsWith('/check-ins'),
    },
    {
      title: 'Objectives',
      href: '/objectives',
      icon: <Target className="h-5 w-5" />,
      isActive: pathname.startsWith('/objectives'),
    },
    {
      title: 'Team',
      href: '/team',
      icon: <Users className="h-5 w-5" />,
      isActive: pathname.startsWith('/team'),
    },
    {
      title: 'Messages',
      href: '/messages',
      icon: <MessageSquare className="h-5 w-5" />,
      isActive: pathname.startsWith('/messages'),
    },
    {
      title: 'Mail',
      href: '/mail',
      icon: <Mail className="h-5 w-5" />,
      isActive: pathname.startsWith('/mail'),
      children: [
        { 
          title: 'Inbox', 
          href: '/mail/inbox',
          isActive: pathname === '/mail/inbox',
        },
        { 
          title: 'Drafts', 
          href: '/mail/drafts',
          isActive: pathname === '/mail/drafts',
        },
      ]
    },
    {
      title: 'Tasks',
      href: '/tasks',
      icon: <FileText className="h-5 w-5" />,
      isActive: pathname.startsWith('/tasks'),
      badge: 3,
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

  const renderNavItem = (item: NavItem, index: number) => {
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
                  <span className={cn("flex-shrink-0 text-muted-foreground group-hover:text-accent-foreground transition-colors", 
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
            {!isCollapsed && isOpen && (
              <CollapsibleContent className="mt-1 space-y-1 pl-11">
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      'flex items-center h-8 px-3 text-sm rounded-md transition-colors',
                      'hover:bg-accent/50',
                      child.isActive 
                        ? 'text-accent-foreground font-medium' 
                        : 'text-muted-foreground hover:text-accent-foreground'
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
        <span className={cn("flex-shrink-0 text-muted-foreground group-hover:text-accent-foreground transition-colors", 
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
            <span className="ml-2.5 text-lg font-semibold text-foreground">Beyond UI</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/50"
          aria-label={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-3">
        <nav className="space-y-1">
          {navItems.map(renderNavItem)}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/avatars/user-1.jpg" alt="User" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="ml-2.5 overflow-hidden">
                <p className="text-sm font-medium text-foreground truncate">Anna Taylor</p>
                <p className="text-xs text-muted-foreground truncate">anna.t@email.com</p>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/50">
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
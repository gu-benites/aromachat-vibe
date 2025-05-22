'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/features/theme';
import { Home, Search, BarChart3, CheckCircle2, Target, Blocks, Bell, Mail, Kanban, ListTodo, Book, HelpCircle, Settings, ChevronDown, Inbox, Zap } from 'lucide-react';

// Sidebar context for collapsed/expanded state
type SidebarContextValue = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
};
const SidebarContext = React.createContext<SidebarContextValue | null>(null);
function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within SidebarProvider');
  return context;
}

type SidebarProviderProps = {
  children: React.ReactNode;
  defaultOpen?: boolean;
};
function SidebarProvider({ children, defaultOpen = true }: SidebarProviderProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const state: 'expanded' | 'collapsed' = open ? 'expanded' : 'collapsed';
  const toggleSidebar = () => setOpen((v) => !v);
  return (
    <SidebarContext.Provider value={{ state, open, setOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

type MenuItem = {
  icon: React.ElementType;
  title: string;
  path: string;
  badge?: number;
  submenu?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { icon: Home, title: 'Dashboard', path: '/' },
  { icon: Search, title: 'Search', path: '/search' },
  {
    icon: BarChart3, title: 'Reporting', path: '/reporting',
    submenu: [
      { title: 'Check-ins', path: '/reporting/check-ins', icon: CheckCircle2 },
      { title: 'Objectives', path: '/reporting/objectives', icon: Target },
      { title: 'Career Hub', path: '/reporting/career-hub', icon: Blocks },
    ]
  },
  { icon: Bell, title: 'Notifications', path: '/notifications', badge: 2 },
  {
    icon: Mail, title: 'Mail', path: '/mail',
    submenu: [
      { title: 'Inbox', path: '/mail/inbox', icon: Inbox },
    ]
  },
  { icon: Kanban, title: 'Kanban', path: '/kanban' },
  { icon: ListTodo, title: 'Tasks', path: '/tasks', badge: 3 },
];
const userMenuItems: MenuItem[] = [
  { icon: Book, title: 'Documentation', path: '/docs' },
  { icon: HelpCircle, title: 'Support', path: '/support' },
  { icon: Settings, title: 'Settings', path: '/settings' },
];

export interface LeftSideNavigationProps {
  isCollapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  className?: string;
}

export function LeftSideNavigation({ isCollapsed = false, onCollapse, className }: LeftSideNavigationProps) {
  const pathname = usePathname();
  const { state, open, setOpen, toggleSidebar } = useSidebar();
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({});
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen && setOpen(!isCollapsed);
  }, [isCollapsed, setOpen]);

  // Auto-expand submenu for active items
  React.useEffect(() => {
    const newOpenSubmenus: Record<string, boolean> = { ...openSubmenus };
    menuItems.forEach(item => {
      if (item.submenu) {
        const pathMatchesSubmenu = item.submenu.some((subItem: { path: string }) => pathname === subItem.path);
        if (pathMatchesSubmenu) {
          newOpenSubmenus[item.title] = true;
        }
      }
    });
    setOpenSubmenus(newOpenSubmenus);
    // eslint-disable-next-line
  }, [pathname]);

  const toggleUserMenu = () => {
    const newUserMenuState = !userMenuOpen;
    setUserMenuOpen(newUserMenuState);
    if (newUserMenuState && state === 'collapsed') setOpen && setOpen(true);
  };
  const toggleSubmenu = (title: string) => {
    if (state === 'collapsed') {
      setOpen && setOpen(true);
      setOpenSubmenus(prev => ({ ...prev, [title]: true }));
    } else {
      setOpenSubmenus(prev => ({ ...prev, [title]: !prev[title] }));
    }
  };
  const isActive = (path: string) => pathname === path;
  const isSubmenuActive = (submenu: { path: string }[]) => submenu?.some((item: { path: string }) => pathname === item.path);

  // Sidebar UI
  return (
    <aside
      className={cn(
        'min-h-screen flex flex-col border-r bg-secondary dark:bg-dark-secondary text-foreground dark:text-dark-foreground border-border dark:border-dark-border rounded-xl m-2 shadow-lg',
        state === 'collapsed' ? 'w-[4.5rem]' : 'w-64',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center h-16 px-3 border-b">
        <div className={cn('flex items-center space-x-2', state === 'collapsed' && 'hidden')}>
          <Zap className="h-6 w-6 text-brand-accent" />
          <span className="text-lg font-semibold">Beyond UI</span>
        </div>
        <button
          className={cn('h-7 w-7 ml-auto', state === 'collapsed' && 'mx-auto')}
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <span className="sr-only">Toggle Sidebar</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            {state === 'collapsed' ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>
      {/* Menu */}
      <nav className="flex-grow sidebar-content overflow-y-auto py-3 space-y-1 px-2">
        {menuItems.map((item) => (
          item.submenu ? (
            <div key={item.title}>
              <button
                onClick={() => toggleSubmenu(item.title)}
                className={cn(
                  'flex w-full items-center px-3 py-2 text-sm rounded-md transition-colors',
                  isSubmenuActive(item.submenu) ? 'bg-accent text-accent-foreground font-medium' : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground',
                  state === 'collapsed' && 'justify-center px-0'
                )}
                aria-expanded={!!openSubmenus[item.title]}
                aria-controls={`submenu-${item.title}`}
                title={item.title}
              >
                <item.icon className="h-5 w-5 mr-3 shrink-0" />
                {state !== 'collapsed' && <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</span>}
                {item.badge && state !== 'collapsed' && (
                  <span className="ml-auto mr-2 bg-blue-500 text-white h-5 min-w-[20px] text-xs flex items-center justify-center rounded-full px-1.5">
                    {item.badge}
                  </span>
                )}
                {state !== 'collapsed' && (
                  <ChevronDown className={cn('h-4 w-4 transition-transform shrink-0', openSubmenus[item.title] ? 'rotate-180' : '')} />
                )}
              </button>
              {openSubmenus[item.title] && state !== 'collapsed' && (
                <div id={`submenu-${item.title}`} className="pl-10 space-y-1 py-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.path}
                      href={subItem.path}
                      className={cn(
                        'flex items-center text-sm py-2 px-3 rounded-md',
                        isActive(subItem.path)
                          ? 'bg-accent text-accent-foreground font-medium'
                          : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
                      )}
                    >
                      <subItem.icon className="h-5 w-5 mr-3 shrink-0" />
                      <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{subItem.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex items-center px-3 py-2 text-sm rounded-md transition-colors relative',
                isActive(item.path)
                  ? 'bg-accent text-accent-foreground font-medium'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground',
                state === 'collapsed' && 'justify-center px-0'
              )}
              title={item.title}
            >
              <item.icon className="h-5 w-5 mr-3 shrink-0" />
              {state !== 'collapsed' && <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</span>}
              {item.badge && state !== 'collapsed' && (
                <span className="ml-auto mr-2 bg-blue-500 text-white h-5 min-w-[20px] text-xs flex items-center justify-center rounded-full px-1.5">
                  {item.badge}
                </span>
              )}
            </Link>
          )
        ))}
      </nav>
      {/* Bottom user menu */}
      <div className="mt-auto border-t border-border dark:border-dark-border p-2">
        {state !== 'collapsed' && (
          <div className="mb-2 space-y-1">
            {userMenuItems.map((item) => (
              <Link key={item.path} href={item.path} className="flex items-center px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground">
                <item.icon className="h-5 w-5 mr-3 shrink-0" />
                <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</span>
              </Link>
            ))}
          </div>
        )}
        <button
          onClick={toggleUserMenu}
          className={cn('w-full flex items-center p-2 hover:bg-accent dark:hover:bg-dark-accent rounded-md text-left', state === 'collapsed' && 'justify-center')}
        >
          <div className="user-avatar-container">
            <Avatar className="user-avatar-img w-8 h-8 rounded-full">
              <AvatarImage src="/avatars/user-1.jpg" alt="Anna Taylor" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
          </div>
          {state !== 'collapsed' && (
            <div className="user-info-main ml-2.5 flex-1">
              <p className="text-sm font-medium text-card-foreground dark:text-dark-card-foreground">Anna Taylor</p>
              <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">anna.t@email.com</p>
            </div>
          )}
          {state !== 'collapsed' && <ChevronDown className={cn('h-4 w-4 text-muted-foreground dark:text-dark-muted-foreground transition-transform', userMenuOpen && 'rotate-180')} />}
        </button>
        {userMenuOpen && state !== 'collapsed' && (
          <div className="collapsible-content mt-1 space-y-1">
            <Link href="/docs" className="flex items-center px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground">
              <Book className="h-5 w-5 mr-3 shrink-0" />
              <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">Documentation</span>
            </Link>
            <Link href="/support" className="flex items-center px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground">
              <HelpCircle className="h-5 w-5 mr-3 shrink-0" />
              <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">Support</span>
            </Link>
            <Link href="/settings" className="flex items-center px-3 py-2 text-sm rounded-md text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground">
              <Settings className="h-5 w-5 mr-3 shrink-0" />
              <span className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap">Settings</span>
            </Link>
          </div>
        )}
        <div className={cn('flex pt-2', state === 'collapsed' ? 'justify-center' : 'justify-end')}>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}

export { SidebarProvider };

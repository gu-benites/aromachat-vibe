'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Badge } from '@/components/ui/badge';
import {
  Sidebar as BaseSidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { 
  LayoutDashboard, 
  Search, 
  BarChart, 
  CheckCircle, 
  Target, 
  Blocks, 
  Bell, 
  Mail, 
  Kanban, 
  ListTodo, 
  Book, 
  HelpCircle, 
  Settings, 
  Zap, 
  ChevronDown, 
  PanelLeft 
} from 'lucide-react';
import { useSidebar } from '../contexts/sidebar-context';

type MenuItem = {
  icon: React.ElementType;
  title: string;
  path: string;
  badge?: number;
  submenu?: {
    title: string;
    path: string;
    icon?: React.ElementType;
  }[];
};

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, title: 'Dashboard', path: '/' },
  { icon: Search, title: 'Search', path: '/search' },
  {
    icon: BarChart,
    title: 'Analytics',
    path: '/analytics',
    submenu: [
      { title: 'Overview', path: '/analytics/overview' },
      { title: 'Reports', path: '/analytics/reports' },
      { title: 'Export', path: '/analytics/export' },
    ],
  },
  { icon: CheckCircle, title: 'Check-ins', path: '/check-ins' },
  { icon: Target, title: 'Objectives', path: '/objectives' },
  { icon: Bell, title: 'Notifications', path: '/notifications', badge: 2 },
  { 
    icon: Mail, 
    title: 'Mail', 
    path: '/mail',
    submenu: [
      { title: 'Inbox', path: '/mail/inbox' }
    ]
  },
  { icon: Kanban, title: 'Kanban', path: '/kanban' },
  { icon: ListTodo, title: 'Tasks', path: '/tasks', badge: 3 },
];

const userMenuItems = [
  { icon: Book, title: 'Documentation', path: '/documentation' },
  { icon: HelpCircle, title: 'Support', path: '/support' },
  { icon: Settings, title: 'Settings', path: '/settings' }
];

export function Sidebar(): React.ReactElement {
  const { isCollapsed, toggleSidebar, open } = useSidebar();
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({});
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  // Auto-expand submenu for active items
  React.useEffect(() => {
    const newOpenSubmenus = { ...openSubmenus };
    
    menuItems.forEach(item => {
      if (item.submenu) {
        const pathMatchesSubmenu = item.submenu.some(subItem => pathname === subItem.path);
        if (pathMatchesSubmenu) {
          newOpenSubmenus[item.title] = true;
        }
      }
    });
    
    setOpenSubmenus(newOpenSubmenus);
  }, [pathname]);

  const toggleSubmenu = (title: string): void => {
    setOpenSubmenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const toggleUserMenu = (): void => {
    setUserMenuOpen(!userMenuOpen);
  };

  const isActive = (path: string): boolean => pathname === path;
  const isSubmenuActive = (submenu?: MenuItem["submenu"]): boolean => 
    submenu?.some(item => pathname === item.path) ?? false;

  return (
    <BaseSidebar>
      <SidebarHeader>
        <div className={cn("flex items-center", isCollapsed && "justify-center w-full")}>
          <Zap className="h-6 w-6 text-brand-accent" />
          {!isCollapsed && <span className="text-lg font-semibold ml-2.5">AromaChat</span>}
        </div>
        {!isCollapsed && (
          <SidebarTrigger className="ml-auto">
            <PanelLeft className="h-5 w-5" />
          </SidebarTrigger>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const isItemActive = isActive(item.path) || isSubmenuActive(item.submenu);
            const isSubmenuOpen = openSubmenus[item.title] ?? false;
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.path}>
                {item.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(item.title)}
                      className={cn(
                        'w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-muted-foreground dark:text-muted-foreground',
                        'hover:bg-accent dark:hover:bg-accent hover:text-accent-foreground dark:hover:text-accent-foreground',
                        isItemActive && 'bg-accent dark:bg-accent text-accent-foreground dark:text-accent-foreground',
                        isCollapsed ? 'justify-center' : 'justify-between'
                      )}
                    >
                      <div className="flex items-center">
                        <Icon className="h-5 w-5 shrink-0" />
                        {!isCollapsed && <span className="ml-3">{item.title}</span>}
                      </div>
                      {!isCollapsed && (
                        <ChevronDown
                          className={cn(
                            'ml-auto h-4 w-4 transition-transform shrink-0',
                            isSubmenuOpen && 'rotate-180'
                          )}
                        />
                      )}
                    </button>
                    {isSubmenuOpen && !isCollapsed && (
                      <div className="pl-10 space-y-1 py-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.path}
                            href={subItem.path}
                            className={cn(
                              'flex items-center px-3 py-2 text-sm rounded-md',
                              isActive(subItem.path)
                                ? 'bg-accent dark:bg-accent text-accent-foreground dark:text-accent-foreground font-medium'
                                : 'text-muted-foreground dark:text-muted-foreground hover:bg-accent/50 dark:hover:bg-accent/50'
                            )}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-md relative',
                      'hover:bg-accent dark:hover:bg-accent hover:text-accent-foreground dark:hover:text-accent-foreground',
                      isActive(item.path) 
                        ? 'bg-accent dark:bg-accent text-accent-foreground dark:text-accent-foreground' 
                        : 'text-muted-foreground dark:text-muted-foreground',
                      isCollapsed && 'justify-center'
                    )}
                  >
                    <div className="relative">
                      <Icon className="h-5 w-5 shrink-0" />
                      {item.badge && isCollapsed && (
                        <span className="absolute -top-1 -right-1 flex h-2 w-2 items-center justify-center rounded-full bg-red-500 ring-2 ring-secondary dark:ring-secondary"></span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <>
                        <span className="ml-3 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{item.title}</span>
                        {item.badge && (
                          <Badge 
                            className="ml-auto bg-blue-500 text-white h-5 min-w-[20px] text-xs flex items-center justify-center rounded-full px-1.5"
                            variant="default"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </Link>
                )}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <button 
          onClick={toggleUserMenu}
          className="w-full flex items-center p-3 hover:bg-accent dark:hover:bg-accent rounded-md text-left"
        >
          <div className="flex items-center w-full">
            <div className="h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white shrink-0">
              <span className="text-sm font-medium">AT</span>
            </div>
            {!isCollapsed && (
              <div className="ml-3 text-left overflow-hidden">
                <p className="text-sm font-medium truncate">Anna Taylor</p>
                <p className="text-xs text-muted-foreground truncate max-w-[120px]">anna.t@email.com</p>
              </div>
            )}
            {!isCollapsed && (
              <ChevronDown 
                className={cn(
                  'ml-auto h-4 w-4 transition-transform shrink-0',
                  userMenuOpen && 'rotate-180'
                )}
              />
            )}
          </div>
        </button>
        {userMenuOpen && !isCollapsed && (
          <div className="px-3 py-2 space-y-1">
            {userMenuItems.map(item => (
              <Link 
                key={item.title}
                href={item.path}
                className="flex items-center py-2 px-3 text-sm text-muted-foreground hover:bg-accent/50 dark:hover:bg-accent/50 rounded-md"
              >
                <item.icon className="h-4 w-4 mr-3 shrink-0" />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        )}
      </SidebarFooter>
    </BaseSidebar>
  );
}

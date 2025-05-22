'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
import { Home, BarChart3, Bell, FileText, ChevronDown, Book, HelpCircle, Settings, Users, MessageSquare, Search, Zap } from 'lucide-react';
// import { ScrollArea } from '@/components/ui/scroll-area'; // Keep if needed, MVP uses CSS

interface LeftSideNavigationProps {
  isCollapsed?: boolean;
  onCollapse?: (isCollapsed: boolean) => void;
  className?: string;
}

export function LeftSideNavigation({
  isCollapsed: propIsCollapsed = false,
  onCollapse,
  className,
}: LeftSideNavigationProps) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = React.useState(propIsCollapsed);
  const [reportingOpen, setReportingOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setInternalCollapsed(propIsCollapsed);
  }, [propIsCollapsed]);

  const toggleMainCollapse = () => {
    const newState = !internalCollapsed;
    setInternalCollapsed(newState);
    onCollapse?.(newState);
    // MVP logic: if sidebar collapses, close all submenus
    if (newState) {
      setReportingOpen(false);
      setUserMenuOpen(false);
    }
  };

  const toggleReporting = () => {
    if (internalCollapsed) return; // Don't open submenus if sidebar is collapsed
    setReportingOpen(!reportingOpen);
  };

  const toggleUserMenu = () => {
    if (internalCollapsed) return;
    setUserMenuOpen(!userMenuOpen);
  };
  
  const commonLinkClasses = "nav-item flex items-center px-3 py-2 text-sm font-medium hover:bg-accent dark:hover:bg-dark-accent hover:text-accent-foreground dark:hover:text-dark-accent-foreground rounded-md text-muted-foreground dark:text-dark-muted-foreground";
  const activeLinkClasses = "bg-accent dark:bg-dark-accent text-primary dark:text-dark-primary";

  return (
    <aside
      id="sidebar"
      className={cn(
        'min-h-screen flex flex-col transition-all duration-300 ease-in-out border-r',
        'bg-secondary dark:bg-dark-secondary text-foreground dark:text-dark-foreground border-border dark:border-dark-border', // Base colors from MVP
        internalCollapsed ? 'w-[4.5rem] sidebar-collapsed' : 'w-64',
        className
      )}
    >
      <div className="logo-area p-4 flex items-center border-b border-border dark:border-dark-border h-16">
        <svg className="h-7 w-7 text-brand-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
        <span className="app-name text-lg font-semibold ml-2.5 text-card-foreground dark:text-dark-card-foreground">
          Beyond UI
        </span>
        <button
          id="sidebarToggle"
          title="Toggle sidebar"
          onClick={toggleMainCollapse}
          className="ml-auto p-1 rounded-md text-muted-foreground dark:text-dark-muted-foreground hover:bg-accent dark:hover:bg-dark-accent hover:text-accent-foreground dark:hover:text-dark-accent-foreground"
        >
          {internalCollapsed ? (
            <svg id="sidebarToggleIconClose" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg id="sidebarToggleIconOpen" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
            </svg>
          )}
        </button>
      </div>

      {/* MVP uses custom scrollbar CSS through .sidebar-content */}
      <nav className="flex-grow sidebar-content overflow-y-auto py-3 space-y-1 px-2">
        <Link href="/" className={cn(commonLinkClasses, pathname === '/' && activeLinkClasses)}>
          <Home className="nav-icon h-5 w-5 mr-3" />
          <span className="nav-text">Dashboard</span>
        </Link>

        {/* Collapsible Reporting Section */}
        <div>
          <button 
            onClick={toggleReporting}
            className={cn("collapsible-trigger nav-item w-full flex items-center px-3 py-2 text-sm font-medium hover:bg-accent dark:hover:bg-dark-accent hover:text-accent-foreground dark:hover:text-dark-accent-foreground rounded-md text-muted-foreground dark:text-dark-muted-foreground", reportingOpen && !internalCollapsed && activeLinkClasses)}
          >
            <BarChart3 className="nav-icon h-5 w-5 mr-3" />
            <span className="nav-text flex-1 text-left">Reporting</span>
            {!internalCollapsed && <ChevronDown className={cn("chevron-icon h-4 w-4 text-muted-foreground dark:text-dark-muted-foreground transition-transform", reportingOpen && "rotate-180")} />}
          </button>
          {reportingOpen && !internalCollapsed && (
            <div className="collapsible-content pl-6 space-y-1 py-1">
              <Link href="/reporting/objectives" className={cn(commonLinkClasses, pathname === '/reporting/objectives' && activeLinkClasses)}>
                <span className="nav-text">Objectives</span>
              </Link>
              <Link href="/reporting/career-hub" className={cn(commonLinkClasses, pathname === '/reporting/career-hub' ? activeLinkClasses : "text-muted-foreground dark:text-dark-muted-foreground" )}>
                <span className="nav-text">Career Hub</span>
              </Link>
            </div>
          )}
        </div>
        
        <Link href="/notifications" className={cn(commonLinkClasses, "nav-item-with-badge relative", pathname === '/notifications' && activeLinkClasses)}>
          <Bell className="nav-icon h-5 w-5 mr-3" />
          <span className="nav-text">Notifications</span>
        </Link>

        <Link href="/tasks" className={cn(commonLinkClasses, pathname === '/tasks' && activeLinkClasses)}>
          <FileText className="nav-icon h-5 w-5 mr-3" />
          <span className="nav-text">Tasks</span>
          <span className="badge-count ml-auto bg-blue-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded-full">3</span>
        </Link>
      </nav>

      <div className="bottom-user-menu mt-auto border-t border-border dark:border-dark-border p-2">
        <button
          id="userMenuTrigger"
          title="User menu"
          onClick={toggleUserMenu}
          className="user-profile-trigger w-full flex items-center p-2 hover:bg-accent dark:hover:bg-dark-accent rounded-md text-left"
        >
          <div className="user-avatar-container">
            <Avatar className="user-avatar-img w-8 h-8 rounded-full">
              <AvatarImage src="/avatars/user-1.jpg" alt="Anna Taylor" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
          </div>
          <div className="user-info-main ml-2.5 flex-1">
            <p className="text-sm font-medium text-card-foreground dark:text-dark-card-foreground">Anna Taylor</p>
            <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">anna.t@email.com</p>
          </div>
          {!internalCollapsed && <ChevronDown className={cn("chevron-icon h-4 w-4 text-muted-foreground dark:text-dark-muted-foreground transition-transform", userMenuOpen && "rotate-180")} />}
        </button>
        {userMenuOpen && !internalCollapsed && (
          <div id="userMenuContent" className="collapsible-content mt-1 space-y-1">
            <Link href="/docs" className={cn(commonLinkClasses)}>
              <Book className="nav-icon h-5 w-5 mr-3" />
              <span className="bottom-menu-text">Documentation</span>
            </Link>
            <Link href="/support" className={cn(commonLinkClasses)}>
              <HelpCircle className="nav-icon h-5 w-5 mr-3" />
              <span className="bottom-menu-text">Support</span>
            </Link>
            <Link href="/settings" className={cn(commonLinkClasses)}>
              <Settings className="nav-icon h-5 w-5 mr-3" />
              <span className="bottom-menu-text">Settings</span>
            </Link>
            <div className="px-3 py-2">
               <ThemeToggle />
            </div>
          </div>
        )}
         {/* Fallback for theme toggle if user menu is closed or sidebar collapsed, ensure it's always accessible */}
        {(internalCollapsed || !userMenuOpen) && (
            <div className={cn("flex pt-2", internalCollapsed ? "justify-center" : "justify-end")}>
                <ThemeToggle />
            </div>
        )}
      </div>
    </aside>
  );
}

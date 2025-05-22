'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/features/theme/components/theme-toggle';
// import { ScrollArea } from '@/components/ui/scroll-area'; // Keep if needed, MVP uses CSS

interface LeftSideNavigationProps {
  isCollapsed?: boolean;
  onCollapse?: (isCollapsed: boolean) => void;
  className?: string;
}

// MVP SVGs will be used directly in JSX for clarity for this refactor
// Example: Dashboard Icon SVG
const DashboardIcon = () => (
  <svg className="nav-icon h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

// Reporting Icon SVG
const ReportingIcon = () => (
  <svg className="nav-icon h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h15.75c.621 0 1.125.504 1.125 1.125v6.75c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 19.875v-6.75zM3 8.625c0-.621.504-1.125 1.125-1.125h15.75A1.125 1.125 0 0121 8.625v2.25c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 10.875V8.625zM3 4.125C3 3.504 3.504 3 4.125 3h15.75A1.125 1.125 0 0121 4.125v2.25c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 013 6.375V4.125z" />
  </svg>
);

// Notifications Icon SVG
const NotificationsIcon = () => (
 <div className="nav-icon h-5 w-5 mr-3 relative">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
    <span className="notification-dot absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-secondary dark:ring-dark-secondary"></span>
  </div>
);

// Tasks Icon SVG
const TasksIcon = () => (
  <svg className="nav-icon h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
  </svg>
);

// Chevron Down Icon for Collapsibles
const ChevronDownIcon = ({isRotated}: {isRotated?: boolean}) => (
  <svg 
    className={cn("chevron-icon h-4 w-4 text-muted-foreground dark:text-dark-muted-foreground transition-transform", isRotated && "rotate-180")}
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

// User Menu Icons
const DocumentationIcon = () => <svg className="nav-icon h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>;
const SupportIcon = () => <svg className="nav-icon h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" /></svg>;
const SettingsIconSvg = () => <svg className="nav-icon h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.646.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 1.255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.333.183-.582.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-1.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;


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
          <DashboardIcon />
          <span className="nav-text">Dashboard</span>
        </Link>

        {/* Collapsible Reporting Section */}
        <div>
          <button 
            onClick={toggleReporting}
            className={cn("collapsible-trigger nav-item w-full flex items-center px-3 py-2 text-sm font-medium hover:bg-accent dark:hover:bg-dark-accent hover:text-accent-foreground dark:hover:text-dark-accent-foreground rounded-md text-muted-foreground dark:text-dark-muted-foreground", reportingOpen && !internalCollapsed && activeLinkClasses)}
          >
            <ReportingIcon />
            <span className="nav-text flex-1 text-left">Reporting</span>
            {!internalCollapsed && <ChevronDownIcon isRotated={reportingOpen} />}
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
          <NotificationsIcon/>
          <span className="nav-text">Notifications</span>
        </Link>

        <Link href="/tasks" className={cn(commonLinkClasses, pathname === '/tasks' && activeLinkClasses)}>
          <TasksIcon />
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
          {!internalCollapsed && <ChevronDownIcon isRotated={userMenuOpen} />}
        </button>
        {userMenuOpen && !internalCollapsed && (
          <div id="userMenuContent" className="collapsible-content mt-1 space-y-1">
            <Link href="/docs" className={cn(commonLinkClasses)}>
              <DocumentationIcon />
              <span className="bottom-menu-text nav-text">Documentation</span>
            </Link>
            <Link href="/support" className={cn(commonLinkClasses)}>
              <SupportIcon />
              <span className="bottom-menu-text nav-text">Support</span>
            </Link>
            <Link href="/settings" className={cn(commonLinkClasses)}>
              <SettingsIconSvg />
              <span className="bottom-menu-text nav-text">Settings</span>
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

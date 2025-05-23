'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';
import { useSidebar } from './sidebar-context';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'floating';
  side?: 'left' | 'right';
  collapsible?: boolean;
}

export function Sidebar({
  children,
  className,
  variant = 'default',
  side = 'left',
  collapsible = true,
  ...props
}: SidebarProps): React.ReactElement {
  const { isCollapsed, open } = useSidebar();

  return (
    <aside
      data-collapsed={isCollapsed ? 'true' : 'false'}
      data-side={side}
      data-variant={variant}
      className={cn(
        'flex flex-col h-screen bg-secondary dark:bg-secondary border-r border-border dark:border-border transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-[4.5rem]' : 'w-64',
        !open && 'hidden md:flex',
        variant === 'floating' && 'rounded-lg shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}

export interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({
  className,
  children,
  ...props
}: SidebarHeaderProps): React.ReactElement {
  return (
    <div
      className={cn(
        'h-16 border-b border-border dark:border-border flex items-center px-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({
  className,
  children,
  ...props
}: SidebarContentProps): React.ReactElement {
  return (
    <nav
      className={cn(
        'flex-1 overflow-y-auto py-3 px-2 sidebar-content',
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
}

export interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarFooter({
  className,
  children,
  ...props
}: SidebarFooterProps): React.ReactElement {
  return (
    <div
      className={cn(
        'mt-auto border-t border-border dark:border-border p-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}

export function SidebarMenu({
  className,
  children,
  ...props
}: SidebarMenuProps): React.ReactElement {
  return (
    <ul
      className={cn(
        'space-y-1',
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

export interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export function SidebarMenuItem({
  className,
  children,
  ...props
}: SidebarMenuItemProps): React.ReactElement {
  return (
    <li
      className={cn(
        className
      )}
      {...props}
    >
      {children}
    </li>
  );
}

export interface SidebarTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function SidebarTrigger({
  className,
  children,
  ...props
}: SidebarTriggerProps): React.ReactElement {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      onClick={toggleSidebar}
      className={cn(
        'ml-auto h-8 w-8 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-md flex items-center justify-center',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

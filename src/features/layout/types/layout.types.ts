import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
  /**
   * Whether to show the sidebar
   * @default true
   */
  showSidebar?: boolean;
  /**
   * Whether the sidebar is collapsed
   * @default false
   */
  isSidebarCollapsed?: boolean;
  /**
   * Callback when the sidebar collapse state changes
   */
  onSidebarCollapse?: (isCollapsed: boolean) => void;
}

export interface NavItem {
  /**
   * The title of the navigation item
   */
  title: string;
  /**
   * The URL the item links to
   */
  href: string;
  /**
   * The icon to display
   */
  icon: ReactNode;
  /**
   * Optional badge count
   */
  badge?: number;
  /**
   * Whether the item is currently active
   * @default false
   */
  isActive?: boolean;
  /**
   * Optional child items for dropdown menus
   */
  children?: NavItem[];
}

export interface UserProfile {
  /**
   * User's display name
   */
  name: string;
  /**
   * User's username/handle
   */
  username: string;
  /**
   * URL to the user's avatar image
   */
  avatarUrl?: string;
  /**
   * User's email address
   */
  email?: string;
}

export type Theme = 'light' | 'dark' | 'system';

export interface UseThemeProps {
  theme?: Theme;
  setTheme: (theme: Theme) => void;
  systemTheme?: 'light' | 'dark' | null;
  resolvedTheme?: 'light' | 'dark' | null;
  themes: Theme[];
}

export interface UseThemeReturn {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
  isLoading: boolean;
  systemTheme: 'light' | 'dark' | null;
  resolvedTheme: 'light' | 'dark' | null;
  themes: Theme[];
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  /**
   * Default theme
   * @default 'system'
   */
  defaultTheme?: Theme;
  /**
   * HTML attribute modified based on the active theme
   * @default 'class'
   */
  attribute?: string | 'class';
  /**
   * Whether to enable system theme detection
   * @default true
   */
  enableSystem?: boolean;
  /**
   * Key used to store theme setting in localStorage
   * @default 'theme'
   */
  storageKey?: string;
  /**
   * Disable all CSS transitions when switching themes
   * @default false
   */
  disableTransitionOnChange?: boolean;
}

export interface UseThemeReturn {
  /**
   * Current theme
   */
  theme: Theme;
  /**
   * List of available themes
   */
  themes: Theme[];
  /**
   * Set theme
   */
  setTheme: (theme: Theme) => void;
  /**
   * Toggle between light and dark theme
   */
  toggleTheme: () => void;
  /**
   * Whether the theme is currently loading
   */
  isLoading: boolean;
  /**
   * Whether the current theme is dark
   */
  isDark: boolean;
}

declare module 'next-themes' {
  import React from 'react';

  export type Theme = 'light' | 'dark' | 'system';

  export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    attribute?: string | 'class';
    enableSystem?: boolean;
    storageKey?: string;
    disableTransitionOnChange?: boolean;
  }

  export interface UseThemeProps {
    theme: Theme;
    themes: Theme[];
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
  }

  export const ThemeProvider: React.FC<ThemeProviderProps>;
  export const useTheme: () => UseThemeProps;
}

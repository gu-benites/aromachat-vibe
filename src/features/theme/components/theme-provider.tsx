'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  attribute?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  enableColorScheme?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  attribute = 'class',
  enableSystem = true,
  disableTransitionOnChange = true,
}: ThemeProviderProps) {
  // Set initial theme on the HTML element
  React.useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply the theme class to the HTML element
    const applyTheme = (theme: Theme) => {
      const isDark = theme === 'dark' || 
                   (theme === 'system' && 
                    enableSystem && 
                    window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      // Update the HTML element
      if (isDark) {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
      
      // Update the data-theme attribute for next-themes
      root.setAttribute('data-theme', theme);
      
      // Save to localStorage
      try {
        localStorage.setItem('theme', theme);
      } catch (e) {
        console.error('Failed to save theme preference', e);
      }
    };

    // Apply the default theme
    applyTheme(defaultTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (defaultTheme === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [defaultTheme, enableSystem]);

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
    >
      {children}
    </NextThemesProvider>
  );
}

interface ThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useTheme = (): ThemeContext => {
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  if (!mounted) {
    return {
      theme: 'light' as Theme,
      setTheme: () => {},
      toggleTheme: () => {},
    };
  }

  return {
    theme: (theme as Theme) || 'system',
    setTheme,
    toggleTheme,
  };
};

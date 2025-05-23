'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTheme as useNextTheme } from 'next-themes';
import { Theme, UseThemeReturn } from '../types/theme.types';

/**
 * Custom hook to handle theme switching and state management
 * @returns Theme context with theme state and helper functions
 */
export function useTheme(): UseThemeReturn {
  const {
    theme: currentTheme = 'system',
    setTheme: setNextTheme,
    systemTheme = null,
    resolvedTheme = null,
    themes = ['light', 'dark', 'system'],
  } = useNextTheme() as {
    theme?: Theme;
    setTheme: (theme: Theme) => void;
    systemTheme?: 'light' | 'dark' | null;
    resolvedTheme?: 'light' | 'dark' | null;
    themes?: Theme[];
  };

  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Set mounted to true after component mounts
  useEffect(() => {
    setMounted(true);
    setIsLoading(false);
  }, []);

  // Determine if the current theme is dark
  const isDark = useMemo(() => {
    if (!mounted) return false;
    if (currentTheme === 'system') {
      return systemTheme === 'dark';
    }
    return currentTheme === 'dark';
  }, [currentTheme, systemTheme, mounted]);

  // Set theme with loading state
  const setTheme = (theme: Theme) => {
    setIsLoading(true);
    setNextTheme(theme);
    // Small delay to allow the theme to be applied before removing loading state
    setTimeout(() => setIsLoading(false), 100);
  };

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return {
    theme: currentTheme,
    themes,
    setTheme,
    toggleTheme,
    isLoading,
    isDark,
    systemTheme,
    resolvedTheme,
  };
}

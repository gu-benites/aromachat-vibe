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
    systemTheme,
    resolvedTheme,
  } = useNextTheme();

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

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setNextTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  // Set a specific theme
  const setTheme = (theme: Theme) => {
    setNextTheme(theme);
  };

  return {
    theme: currentTheme as Theme,
    themes: ['light', 'dark', 'system'],
    setTheme,
    toggleTheme,
    isLoading,
    isDark,
  };
}

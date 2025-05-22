'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/**
 * ThemeToggle component that allows users to switch between light and dark themes
 */
export function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-9 w-9"
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">
            {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          </span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{isDark ? 'Light Mode' : 'Dark Mode'}</p>
      </TooltipContent>
    </Tooltip>
  );
}

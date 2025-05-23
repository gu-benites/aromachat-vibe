'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { Theme } from './theme-provider';

interface ThemeToggleProps {
  /** Additional class name for the button */
  className?: string;
  /** Size of the button */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /** Variant of the button */
  variant?: 'default' | 'outline' | 'ghost' | 'link';
  /** Show a tooltip with the current theme */
  showTooltip?: boolean;
}

/**
 * ThemeToggle component that allows users to switch between light and dark themes
 */
export function ThemeToggle({
  className,
  size = 'icon',
  variant = 'ghost',
  showTooltip = false,
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn('rounded-full', className)}
        aria-label="Toggle theme"
      />
    );
  }

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const button = (
    <Button
      variant={variant}
      size={size}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn('rounded-full', className)}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </Button>
  );

  if (!showTooltip) {
    return button;
  }

  return (
    <div className="relative group">
      {button}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute right-0 top-full mt-2 px-2 py-1 text-xs bg-foreground text-background rounded whitespace-nowrap">
        {isDark ? 'Light mode' : 'Dark mode'}
      </div>
    </div>
  );
}

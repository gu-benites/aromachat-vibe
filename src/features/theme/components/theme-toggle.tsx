'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useTheme } from '../hooks/use-theme';

interface ThemeToggleProps {
  variant?: 'ghost' | 'outline' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  showTooltip?: boolean;
  tooltipPosition?: 'top' | 'right' | 'bottom' | 'left';
}

export function ThemeToggle({
  variant = 'ghost',
  size = 'icon',
  className,
  showTooltip = true,
  tooltipPosition = 'bottom',
}: ThemeToggleProps) {
  const [mounted, setMounted] = React.useState(false);
  const { theme, isDark, toggleTheme, isLoading } = useTheme();
  
  // Handle theme toggle
  const handleThemeToggle = React.useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  // Only render the button after mounting to avoid hydration mismatches
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything during server-side rendering
  if (!mounted) {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn('h-9 w-9 rounded-full', className)}
        aria-label="Loading theme"
        disabled
      >
        <span className="sr-only">Loading theme</span>
      </Button>
    );
  }


  const buttonContent = (
    <>
      <Sun 
        className={cn(
          'h-4 w-4 transition-transform duration-200',
          'scale-100 rotate-0 dark:-rotate-90 dark:scale-0',
          'transform-gpu'
        )} 
        aria-hidden="true"
      />
      <Moon 
        className={cn(
          'absolute h-4 w-4 transition-transform duration-200',
          'scale-0 -rotate-90 dark:rotate-0 dark:scale-100',
          'transform-gpu'
        )} 
        aria-hidden="true"
      />
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </>
  );

  const button = (
    <Button
      variant={variant}
      size={size}
      onClick={handleThemeToggle}
      disabled={isLoading}
      className={cn(
        'relative h-9 w-9 rounded-full',
        'transition-all duration-200',
        'hover:bg-accent hover:text-accent-foreground',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:pointer-events-none',
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-live="polite"
    >
      {buttonContent}
    </Button>
  );

  if (showTooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {button}
        </TooltipTrigger>
        <TooltipContent side={tooltipPosition}>
          {isDark ? 'Light mode' : 'Dark mode'}
        </TooltipContent>
      </Tooltip>
    );
  }

  return button;
}

/**
 * Theme utilities for consistent theming across the application
 */

type ThemeColor = 'primary' | 'secondary' | 'accent' | 'destructive' | 'muted';

export const theme = {
  // Border styles
  border: {
    base: 'border border-border',
    hover: 'hover:border-primary/50',
    focus: 'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    input: 'border border-input bg-background/50 hover:bg-background/70 focus:bg-background transition-colors',
  },
  
  // Card styles
  card: {
    base: 'bg-card border border-border rounded-lg overflow-hidden shadow-sm',
    hover: 'hover:border-primary/50 hover:shadow-md transition-all duration-200',
    content: 'p-5',
    header: 'p-5 pb-0',
    footer: 'p-5 pt-0',
  },
  
  // Button styles
  button: {
    base: 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
    variants: {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border',
      outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    sizes: {
      sm: 'h-9 px-3 text-sm',
      default: 'h-10 px-4 py-2',
      lg: 'h-11 px-8',
      icon: 'h-10 w-10',
    },
  },
  
  // Text styles
  text: {
    muted: 'text-muted-foreground',
    heading: 'font-medium tracking-tight',
    lead: 'text-xl text-muted-foreground',
    large: 'text-lg font-medium',
    small: 'text-sm',
  },
  
  // Utility functions
  getColor: (color: ThemeColor, opacity: number = 1) => {
    const opacityValue = Math.min(100, Math.max(0, opacity * 100));
    return `hsl(var(--${color}) / ${opacityValue}%)`;
  },
  
  // Spacing scale (matches Tailwind's default scale)
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '0.75rem',   // 12px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  
  // Breakpoints (matches Tailwind's default breakpoints)
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

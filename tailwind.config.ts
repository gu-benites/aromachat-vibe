import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(265, 89%, 78%)',
          foreground: 'hsl(0, 0%, 100%)',
          dark: 'hsl(265, 60%, 60%)',
          light: 'hsl(265, 95%, 88%)',
          muted: 'hsl(265, 30%, 95%)',
        },
        secondary: {
          DEFAULT: 'hsl(240, 5%, 96%)',
          foreground: 'hsl(240, 6%, 10%)',
          dark: 'hsl(222, 47%, 11%)',
        },
        muted: {
          DEFAULT: 'hsl(240, 5%, 96%)',
          foreground: 'hsl(240, 4%, 46%)',
          dark: 'hsl(223, 47%, 11%)',
          'dark-foreground': 'hsl(215, 20%, 65%)',
        },
        accent: {
          DEFAULT: 'hsl(265, 89%, 78%)',
          foreground: 'hsl(0, 0%, 100%)',
        },
        destructive: {
          DEFAULT: 'hsl(0, 84%, 60%)',
          foreground: 'hsl(0, 0%, 98%)',
          dark: 'hsl(0, 63%, 31%)',
        },
        border: 'hsl(240, 6%, 90%)',
        input: 'hsl(240, 6%, 90%)',
        ring: 'hsl(265, 89%, 78%)',
        chart: {
          '1': 'hsl(265, 89%, 78%)',
          '2': 'hsl(220, 70%, 50%)',
          '3': 'hsl(280, 65%, 60%)',
          '4': 'hsl(340, 75%, 55%)',
          '5': 'hsl(30, 80%, 55%)',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};

export default config;

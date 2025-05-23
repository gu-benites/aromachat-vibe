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
          DEFAULT: 'hsl(var(--primary))', // Merged: Use HSL variable
          foreground: 'hsl(var(--primary-foreground))', // Merged: Use HSL variable
          dark: 'hsl(265, 60%, 60%)', // Existing preserved
          light: 'hsl(265, 95%, 88%)', // Existing preserved
          muted: 'hsl(265, 30%, 95%)', // Existing preserved
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))', // Merged: Use HSL variable
          foreground: 'hsl(var(--secondary-foreground))', // Merged: Use HSL variable
          dark: 'hsl(222, 47%, 11%)', // Existing preserved
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))', // Merged: Use HSL variable
          foreground: 'hsl(var(--muted-foreground))', // Merged: Use HSL variable
          dark: 'hsl(223, 47%, 11%)', // Existing preserved
          'dark-foreground': 'hsl(215, 20%, 65%)', // Existing preserved
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))', // Merged: Use HSL variable
          foreground: 'hsl(var(--accent-foreground))', // Merged: Use HSL variable
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))', // Merged: Use HSL variable
          foreground: 'hsl(var(--destructive-foreground))', // Merged: Use HSL variable
          dark: 'hsl(0, 63%, 31%)', // Existing preserved
        },
        border: 'hsl(var(--border))', // Merged: Use HSL variable
        input: 'hsl(var(--input))', // Merged: Use HSL variable
        ring: 'hsl(var(--ring))', // Merged: Use HSL variable
        chart: { // Merged: Ensured all chart variables are present
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      keyframes: { // Merged from template
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: { // Merged from template
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [ // Ensured all three plugins are present
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};

export default config;

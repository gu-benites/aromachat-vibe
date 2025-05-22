# Theme Feature

This feature provides theme management functionality including light/dark mode support and system preference detection.

## Directory Structure

```
theme/
├── components/         # Theme-related UI components
│   ├── theme-provider.tsx  # Theme provider component
│   └── theme-toggle.tsx    # Theme toggle button component
├── hooks/              # Custom hooks for theme management
│   └── use-theme.ts    # Hook to access theme context
├── types/              # TypeScript type definitions
│   └── theme.types.ts  # Type definitions for theme
└── README.md           # This file
```

## Features

- Light and dark theme support
- System preference detection
- Smooth transitions between themes
- Persistence of theme preference
- Type-safe theme management

## Usage

### Theme Provider

Wrap your application with the `ThemeProvider` component:

```tsx
import { ThemeProvider } from '@/features/theme';

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Using the Theme Hook

Use the `useTheme` hook to access and modify the current theme:

```tsx
import { useTheme } from '@/features/theme';

function MyComponent() {
  const { 
    theme, 
    isDark, 
    setTheme, 
    toggleTheme, 
    themes 
  } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>
        Toggle to {isDark ? 'light' : 'dark'} mode
      </button>
      <div>
        {themes.map((t) => (
          <button key={t} onClick={() => setTheme(t)}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
```

### Theme Toggle Component

Use the pre-built `ThemeToggle` component for a simple theme switcher:

```tsx
import { ThemeToggle } from '@/features/theme';

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <ThemeToggle />
    </header>
  );
}
```

## Theming with CSS

Use CSS variables for theming your components. The theme provider adds a `data-theme` attribute to the `html` element that you can use for theming:

```css
/* Global styles */
:root {
  --background: #ffffff;
  --foreground: #000000;
  /* ... other light theme variables */
}

[data-theme='dark'] {
  --background: #000000;
  --foreground: #ffffff;
  /* ... other dark theme variables */
}

/* Component styles */
.myComponent {
  background-color: var(--background);
  color: var(--foreground);
}
```

## Type Safety

All theme-related types are exported from the feature and can be used throughout your application:

```typescript
import { Theme } from '@/features/theme';

function setAppTheme(theme: Theme) {
  // Type-safe theme setting
}
```

## Dependencies

- `next-themes` - For theme management
- `react` - Core React library
- `lucide-react` - For theme toggle icons

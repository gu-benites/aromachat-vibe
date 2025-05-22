# Layout Feature

This feature provides the main application layout structure, including the sidebar navigation and responsive design.

## Directory Structure

```
layout/
├── components/               # Layout-related components
│   ├── main-layout.tsx       # Main layout component
│   └── left-side-navigation.tsx # Sidebar navigation component
├── types/                   # TypeScript type definitions
│   └── layout.types.ts      # Type definitions for layout
└── README.md                # This file
```

## Features

- Responsive layout with collapsible sidebar
- Navigation menu with icons and badges
- User profile section
- Theme toggle integration
- Type-safe props and components

## Components

### MainLayout

The main layout component that structures the application.

#### Props

```typescript
interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;      // Whether to show the sidebar (default: true)
  isSidebarCollapsed?: boolean; // Whether the sidebar is collapsed (controlled)
  onSidebarCollapse?: (isCollapsed: boolean) => void; // Callback when sidebar collapse state changes
}
```

#### Usage

```tsx
import { MainLayout } from '@/features/layout';

function App() {
  return (
    <MainLayout>
      <YourPageContent />
    </MainLayout>
  );
}
```

### LeftSideNavigation

A collapsible sidebar navigation component.

#### Props

```typescript
interface LeftSideNavigationProps {
  isCollapsed?: boolean;      // Whether the sidebar is collapsed
  onCollapse?: (isCollapsed: boolean) => void; // Callback when collapse state changes
}
```

#### Usage

```tsx
import { LeftSideNavigation } from '@/features/layout';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  return (
    <LeftSideNavigation 
      isCollapsed={isCollapsed}
      onCollapse={setIsCollapsed}
    />
  );
}
```

## Theming

The layout components use CSS variables for theming. Make sure to wrap your application with the `ThemeProvider` from the `theme` feature for proper theming support.

## Responsive Design

The layout is responsive and will automatically adjust based on screen size:
- On mobile: Sidebar is hidden by default and can be toggled with a menu button
- On desktop: Sidebar is visible by default and can be collapsed/expanded

## Accessibility

- All interactive elements have proper ARIA attributes
- Keyboard navigation is supported
- Focus management is handled for modal dialogs and menus
- Color contrast meets WCAG 2.1 AA standards

## Dependencies

- `next-themes` - For theme management
- `lucide-react` - For icons
- `@radix-ui/react-tooltip` - For tooltips
- `@radix-ui/react-avatar` - For avatar components
- `@radix-ui/react-scroll-area` - For scrollable areas

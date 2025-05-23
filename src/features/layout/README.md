# Layout Feature

This feature provides the main application layout structure, including the sidebar navigation and responsive design.

## Directory Structure

```
layout/
├── components/               # Layout-related components
│   ├── main-layout.tsx       # Main layout component
│   └── sidebar.tsx           # Sidebar navigation component
├── contexts/                 # React contexts
│   └── sidebar-context.tsx   # Sidebar context for state management
├── types/                    # TypeScript type definitions
│   └── layout.types.ts       # Type definitions for layout
└── README.md                 # This file
```

## Features

- Responsive layout with collapsible sidebar
- Navigation menu with icons, badges, and submenus
- Mobile-friendly design with slide-out menu
- Theme toggle integration
- Type-safe props and components

## Components

### MainLayout

The main layout component that structures the application.

#### Props

```typescript
interface MainLayoutProps {
  children: ReactNode;
  className?: string;         // Additional CSS classes
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

### Sidebar

A responsive and collapsible sidebar navigation component with support for submenus.

#### Features
- Collapsible/expandable
- Responsive design (hides on mobile, shows on desktop)
- Supports nested submenus
- Keyboard accessible

#### Usage

The sidebar is automatically included in the `MainLayout` component. To customize the menu items, modify the `menuItems` array in the `sidebar.tsx` file.

## Theming

The layout components use CSS variables for theming. Make sure to wrap your application with the `ThemeProvider` from the `theme` feature for proper theming support.

## Responsive Design

The layout is fully responsive:
- On mobile: Sidebar is hidden by default and can be toggled with a menu button in the header
- On desktop: Sidebar is visible by default and can be collapsed/expanded
- Smooth transitions between states

## Accessibility

- All interactive elements have proper ARIA attributes
- Keyboard navigation is fully supported
- Focus management is handled for all interactive elements
- Color contrast meets WCAG 2.1 AA standards
- Screen reader friendly

## Dependencies

- `next-themes` - For theme management
- `lucide-react` - For icons
- `@radix-ui/react-tooltip` - For tooltips
- `@radix-ui/react-avatar` - For avatar components
- `@radix-ui/react-scroll-area` - For scrollable areas

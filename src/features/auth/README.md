# Authentication Feature

This feature handles all authentication-related functionality including user login, registration, session management, and password recovery.

## Directory Structure

```
auth/
├── components/         # Reusable UI components specific to authentication
├── hooks/              # Custom React hooks for authentication
├── queries/           # React Query hooks for data fetching
├── schemas/           # Zod validation schemas
├── services/          # Business logic and API calls
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── actions.ts         # Server actions for authentication
├── actions.test.ts    # Tests for server actions
└── README.md         # This file
```

## Features

- User registration with email and password
- User login with email and password
- Session management
- Password reset functionality
- Protected routes
- Role-based access control (RBAC)

## Usage

### Server Actions

#### Login

```typescript
import { login } from '@/features/auth/actions';

const result = await login({
  email: 'user@example.com',
  password: 'securePassword123!',
});

if (result.success) {
  // Handle successful login
} else {
  // Handle error
  console.error(result.error);
}
```

#### Registration

```typescript
import { register } from '@/features/auth/actions';

const result = await register({
  email: 'newuser@example.com',
  password: 'securePassword123!',
  confirmPassword: 'securePassword123!',
  fullName: 'New User',
});

if (result.success) {
  // Handle successful registration
} else {
  // Handle error
  console.error(result.error);
}
```

#### Logout

```typescript
import { logout } from '@/features/auth/actions';

const result = await logout();

if (result.success) {
  // Handle successful logout
  // Redirect to login page
  redirect('/login');
} else {
  // Handle error
  console.error(result.error);
}
```

### Validation Schemas

This feature provides Zod schemas for form validation:

```typescript
import { loginSchema, registerSchema } from '@/features/auth/schemas/auth.schemas';

// Validate login form data
const loginData = loginSchema.parse({
  email: 'user@example.com',
  password: 'password123',
});

// Validate registration form data
const registrationData = registerSchema.parse({
  email: 'new@example.com',
  password: 'SecurePass123!',
  confirmPassword: 'SecurePass123!',
  fullName: 'John Doe',
});
```

## Error Handling

All server actions return a consistent response format:

```typescript
{
  success: boolean;
  data?: T;
  error?: string;
}
```

## Testing

Run tests with the following command:

```bash
npm test features/auth/actions.test.ts
```

## Dependencies

- `@supabase/supabase-js` - Supabase client library
- `zod` - Schema validation
- `react-hook-form` - Form handling
- `@tanstack/react-query` - Data fetching and caching

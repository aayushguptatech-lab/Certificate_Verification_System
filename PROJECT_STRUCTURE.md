# Project Architecture & Structure

This document outlines the new, scalable folder structure for the Certificate Verification System frontend.

## 📁 Directory Structure

```
src/
│
├── assets/                  # Static files and resources
│   ├── icons/              # Icon files
│   └── images/             # Image files
│
├── components/             # React components (Smart & Dumb components)
│   ├── common/            # Shared components used across the app
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── index.ts
│   ├── ui/                # Reusable UI components (Button, Input, Card, etc.)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── index.ts
│   └── index.ts
│
├── pages/                  # Page components (routes)
│   ├── Home.tsx
│   ├── VerifyCertificate.tsx
│   ├── Dashboard.tsx
│   ├── NotFound.tsx
│   └── auth/
│       ├── Login.tsx
│       ├── Register.tsx
│       └── index.ts
│
├── layouts/               # Layout components
│   ├── MainLayout.tsx    # Main layout with Navbar & Footer
│   ├── AuthLayout.tsx    # Auth pages layout
│   └── index.ts
│
├── context/              # React Context for state management
│   ├── AuthContext.tsx   # Authentication context
│   └── index.ts
│
├── hooks/                # Custom React hooks
│   ├── useAuth.ts       # Auth hook
│   ├── useApi.ts        # API calls hook
│   ├── useForm.ts       # Form handling hook
│   ├── useStorage.ts    # Local storage & media query hooks
│   └── index.ts
│
├── services/            # API services & business logic
│   ├── apiClient.ts     # Axios instance with interceptors
│   ├── authService.ts   # Authentication service
│   ├── certificateService.ts  # Certificate operations
│   ├── userService.ts   # User operations
│   └── index.ts
│
├── types/               # TypeScript type definitions
│   └── index.ts        # All type exports
│
├── constants/          # Application constants
│   ├── api.ts         # API endpoints & config
│   ├── ui.ts          # UI constants (routes, colors, etc.)
│   └── index.ts
│
├── config/            # Application configuration
│   └── app.ts        # App config, contact info, social links
│
├── utils/             # Utility functions
│   ├── validation.ts  # Validation functions
│   ├── string.ts      # String helper functions
│   └── index.ts
│
├── App.tsx           # Main app component with routing
├── index.css         # Global styles (Tailwind imports)
├── main.tsx          # React entry point
└── vite-env.d.ts     # Vite environment types
```

## 🏗️ Architecture Principles

### 1. **Component Organization**

- **Pages**: Full-page components that represent routes
- **Layouts**: Wrapper components for grouping pages (MainLayout, AuthLayout)
- **Common**: Reusable components used across multiple pages (Navbar, Footer)
- **UI**: Atomic UI components (Button, Input, Card)

### 2. **State Management**

- **Context API**: For global state (Auth, Theme, etc.)
- **Local State**: For component-specific state using `useState`
- **Custom Hooks**: For reusable stateful logic

### 3. **API Communication**

- **Services**: Encapsulate API calls and business logic
- **ApiClient**: Configured Axios instance with interceptors
- **Custom Hooks**: `useApi` hook for handling async API calls
- **Types**: Fully typed API responses and requests

### 4. **Code Organization**

```
Folder       | Purpose                           | Example
-------------|-----------------------------------|------------------
components   | UI Components                     | Button, Input
pages        | Full-page components              | Home, Dashboard
layouts      | Page layout wrappers              | MainLayout
context      | Global state (React Context)      | AuthContext
hooks        | Custom React hooks                | useAuth, useForm
services     | API & business logic              | authService
types        | TypeScript interfaces             | User, Certificate
constants    | App-wide constants                | API_ENDPOINTS, ROUTES
utils        | Helper functions                  | validateEmail, formatDate
config       | App configuration                 | APP_CONFIG
```

## 🔄 Data Flow Architecture

```
                    ┌─────────────────────┐
                    │   React Component   │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Custom Hook       │ (useAuth, useForm, useApi)
                    │  (Handle state)     │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │   Context / Store   │ (AuthContext, etc.)
                    │  (Global state)     │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │    Service Layer    │ (authService, apiClient)
                    │  (Business logic)   │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │  Backend API        │
                    │ (http://localhost:5000/api)
                    └─────────────────────┘
```

## 📦 Key Folders & Files Explanation

### `/src/types/index.ts`
- Contains all TypeScript interfaces and types
- Centralizes type definitions for better maintainability
- Types for User, Certificate, API responses, etc.

### `/src/services/`
- **Purpose**: Encapsulate API calls and business logic
- **apiClient.ts**: Configured Axios instance with interceptors
- **authService.ts**: Authentication operations (login, logout, register)
- **certificateService.ts**: Certificate CRUD operations
- **userService.ts**: User profile operations

### `/src/hooks/`
- **useAuth.ts**: Access auth context anywhere
- **useApi.ts**: Handle async API calls with loading/error states
- **useForm.ts**: Manage form state, validation, and submission
- **useStorage.ts**: Local storage operations and media queries

### `/src/context/`
- **AuthContext.tsx**: Global authentication state
- Provides user, login, logout, register functions to entire app

### `/src/constants/`
- **api.ts**: API endpoints, storage keys, error messages
- **ui.ts**: Routes, colors, breakpoints, animations
- **ROUTES**: Navigation routes
- **API_ENDPOINTS**: Backend API endpoints mapping

### `/src/utils/`
- **validation.ts**: Email, password, URL validation
- **string.ts**: String formatting (capitalize, truncate, formatDate, etc.)

## 🔗 Component Relationships

```
MainLayout (Common)
├── Navbar (Common)
├── Pages
│   ├── Home
│   ├── VerifyCertificate
│   ├── Dashboard
│   └── NotFound
└── Footer (Common)

AuthLayout (Layout)
├── Login Page
└── Register Page

Shared UI Components
├── Button (UI)
├── Input (UI)
└── Card (UI)
```

## 💾 State Management Flow

### Authentication Flow
```
User Input (Login) 
  → useForm Hook 
  → authService.login() 
  → API Call (apiClient) 
  → AuthContext Updated 
  → User State Changes 
  → Component Re-renders
```

### API Call Flow
```
Component 
  → useApi Hook 
  → Service Method (e.g., certificateService.getCertificates()) 
  → apiClient.get() 
  → Axios Request + Interceptors 
  → Backend API 
  → Response Handling 
  → Hook Returns {data, isLoading, error}
```

## 🎯 Best Practices Used

1. **Separation of Concerns**
   - Components only handle UI
   - Services handle API communication
   - Context handles global state

2. **DRY (Don't Repeat Yourself)**
   - Reusable UI components
   - Custom hooks for common logic
   - Services for API operations

3. **Type Safety**
   - Full TypeScript support
   - Centralized type definitions
   - Strongly typed API responses

4. **Scalability**
   - Easy to add new pages
   - Easy to add new services
   - Easy to extend hooks
   - Modular structure

5. **Maintainability**
   - Clear folder structure
   - Consistent naming conventions
   - Well-documented code
   - Index files for easy imports

## 📥 Import Patterns

### Good Imports (from index files)
```typescript
// ✅ Good - Import from index files
import { Button, Input } from '@/components/ui'
import { Navbar, Footer } from '@/components/common'
import { useAuth, useForm } from '@/hooks'
import { authService } from '@/services'
import { ROUTES } from '@/constants'
import { validateEmail } from '@/utils'
```

### Avoid Direct Imports
```typescript
// ❌ Avoid - Direct file imports
import Button from '@/components/ui/Button'
import Navbar from '@/components/common/Navbar'
```

## 🚀 Adding New Features

### Adding a New Page
1. Create page component in `/src/pages/YourPage.tsx`
2. Add route in `/src/constants/ui.ts` (ROUTES)
3. Add route in `App.tsx`
4. Create corresponding API endpoints if needed

### Adding a New Service
1. Create service file in `/src/services/yourService.ts`
2. Add API endpoints in `/src/constants/api.ts`
3. Export service in `/src/services/index.ts`
4. Use in components via custom hooks or directly

### Adding a New Context
1. Create context file in `/src/context/YourContext.tsx`
2. Create provider component
3. Export in `/src/context/index.ts`
4. Wrap app with provider in `App.tsx`

### Adding a New Custom Hook
1. Create hook file in `/src/hooks/useYourHook.ts`
2. Export in `/src/hooks/index.ts`
3. Use in components with `useYourHook()`

## 🔐 Security Considerations

- **API Authentication**: Token stored in localStorage, passed in headers
- **Protected Routes**: Check `isAuthenticated` before rendering
- **Input Validation**: Validate all user inputs before sending to API
- **Error Handling**: Catch and display user-friendly error messages

## 📚 File Naming Conventions

| Type | Pattern | Example |
|------|---------|---------|
| Components | PascalCase | `Button.tsx`, `Navbar.tsx` |
| Pages | PascalCase | `Home.tsx`, `Dashboard.tsx` |
| Hooks | camelCase with `use` prefix | `useAuth.ts`, `useForm.ts` |
| Services | camelCase with `Service` suffix | `authService.ts` |
| Types | PascalCase | `User`, `Certificate` |
| Constants | UPPER_SNAKE_CASE | `API_ENDPOINTS`, `STORAGE_KEYS` |
| Utils | camelCase | `validation.ts`, `string.ts` |

## 🎨 CSS Organization

- **Tailwind CSS**: Primary styling approach
- **Global Styles**: `/src/index.css` for base styles
- **Component Styles**: Inline Tailwind classes
- **Custom Classes**: Defined in `/src/index.css` for reusable patterns

## 🔄 Future Improvements

- Add state management (Redux/Zustand) for complex state
- Add unit testing setup (Jest, React Testing Library)
- Add E2E testing (Cypress)
- Add environment-specific configurations
- Add API versioning
- Add pagination utilities
- Add form builder for complex forms

---

This architecture supports scalability, maintainability, and easy onboarding for new developers.

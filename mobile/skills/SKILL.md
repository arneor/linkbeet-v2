# 📱 Linkbeet Mobile — Architecture Skill Document

> **React Native Industry Standard — Feature-First Architecture**
>
> This document is the single source of truth for all mobile development. Every feature, every file,
> every line of code MUST follow this document.

---

## 📋 Table of Contents

1. [Architecture Philosophy](#1-architecture-philosophy)
2. [Folder Structure](#2-folder-structure)
3. [Feature Module Rules](#3-feature-module-rules)
4. [API Layer Rules](#4-api-layer-rules)
5. [Server State — React Query](#5-server-state--react-query)
6. [Client State — Zustand](#6-client-state--zustand)
7. [Component Rules](#7-component-rules)
8. [Screen Rules](#8-screen-rules)
9. [Navigation Rules](#9-navigation-rules)
10. [TypeScript Rules](#10-typescript-rules)
11. [Error Handling Rules](#11-error-handling-rules)
12. [Environment & Config Rules](#12-environment--config-rules)
13. [Performance Rules](#13-performance-rules)
14. [Naming Conventions](#14-naming-conventions)
15. [New Feature Checklist](#15-new-feature-checklist)

---

## 1. Architecture Philosophy

### Core Idea — Feature-First

Every piece of code belongs to either:

1. **A feature** — vertical slice of the product (auth, biolink, profile, links)
2. **The core** — shared infrastructure used by all features (api, storage, theme)
3. **Shared UI** — reusable components used in 2+ features

```
┌──────────────────────────────────────────────────┐
│                    SCREENS                        │
│         (thin, just compose components)           │
├──────────────────────────────────────────────────┤
│               COMPONENTS                         │
│       (dumb UI, receive props, render)            │
├───────────────────┬──────────────────────────────┤
│   SERVER STATE    │      CLIENT STATE             │
│  (React Query)    │      (Zustand)                │
│  what's in the DB │   what's on the screen        │
├───────────────────┴──────────────────────────────┤
│                  API LAYER                        │
│    (functions that call backend, Zod validates)   │
├──────────────────────────────────────────────────┤
│                    CORE                           │
│   api client, storage, theme, utils, errors       │
└──────────────────────────────────────────────────┘
```

### Two Types of State — Most Important Concept

```
SERVER STATE                        CLIENT STATE
────────────────────────────────────────────────────
Data that lives on the server       Data that lives only in the app
Needs fetching, caching, syncing    No server involved

Examples:                           Examples:
- user profile                      - is modal open
- list of links                     - selected tab
- analytics data                    - form values
- search results                    - dark/light theme
                                    - auth token (persisted)

Tool: React Query                   Tool: Zustand
```

### Golden Rules

```
✅ Features are independent — auth never imports from biolink
✅ API functions are plain async functions — not classes
✅ React Query owns ALL server data — never store API data in Zustand
✅ Zustand owns ALL UI/client state — never fetch in Zustand
✅ Screens are thin — just layout + compose components
✅ Components are dumb — props in, UI out
✅ Types live close to where they are used
✅ Every API response is validated with Zod
❌ Never fetch data directly inside a component
❌ Never put server data in Zustand
❌ Never put UI state in React Query
❌ Never use any type
❌ Never use inline styles
```

---

## 2. Folder Structure

```
  mobile/
  ├── app/                    ← Expo Router — navigation only
  │   ├── (auth)/
  │   ├── (tabs)/
  │   ├── [username].tsx
  │   ├── _layout.tsx
  │   └── index.tsx
  │
  ├── src/
  │   ├── features/           ← ALL product features
  │   │   └── [feature]/
  │   │       ├── components/
  │   │       ├── screens/
  │   │       ├── services/   ← API calls (was api/)
  │   │       ├── hooks/      ← React Query hooks
  │   │       ├── store/      ← Zustand store
  │   │       ├── types/      ← Feature TypeScript types
  │   │       ├── constants/  ← Feature constants
  │   │       ├── utils/      ← Feature utilities
  │   │       └── index.ts    ← Public API exports
  │   │
  │   ├── shared/             ← Cross-cutting concerns
  │   │   ├── components/     ← Reusable UI components
  │   │   ├── hooks/          ← Generic hooks
  │   │   ├── services/
  │   │   │   ├── api/        ← API client + interceptors
  │   │   │   ├── analytics/
  │   │   │   └── storage/    ← Secure storage wrapper
  │   │   ├── utils/
  │   │   │   ├── formatters/ ← Date, currency, string
  │   │   │   ├── validators/ ← Email, phone, password
  │   │   │   └── platform/   ← iOS/Android helpers
  │   │   ├── types/          ← Shared type definitions
  │   │   └── constants/      ← Theme, colors, spacing
  │   │
  │   ├── config/             ← Environment & feature config
  │   │   ├── env.ts
  │   │   ├── settings.ts
  │   │   └── feature-flags.ts
  │   │
  │   ├── core/               ← Core error handling only
  │   │   └── errors/
  │   │
  │   ├── store/              ← Global app state (Zustand)
  │   └── providers/          ← React providers
  │
  ├── __tests__/              ← Tests mirror src/ structure
  │   ├── features/
  │   ├── shared/
  │   ├── e2e/
  │   └── setup/
  │
  └── assets/
```

---

## 3. Feature Module Rules

### Every feature has this exact structure

```
src/features/auth/
├── api/
│   ├── auth.api.ts         ← all API call functions
│   └── auth.schema.ts      ← Zod schemas for API responses
├── hooks/
│   ├── use-login.ts        ← React Query mutation
│   ├── use-register.ts     ← React Query mutation
│   └── use-current-user.ts ← React Query query
├── store/
│   └── auth.store.ts       ← Zustand (UI state only)
├── screens/
│   ├── LoginScreen.tsx
│   └── RegisterScreen.tsx
├── components/
│   ├── LoginForm.tsx
│   └── SocialLoginButton.tsx
├── types.ts                ← all TypeScript types for this feature
└── index.ts                ← public API — what other features can import
```

### Feature public API — index.ts

```typescript
// src/features/auth/index.ts
// ONLY export what other features actually need

export type { User, AuthTokens } from './types'
export { useAuthStore } from './store/auth.store'
export { useCurrentUser } from './hooks/use-current-user'
export { LoginScreen } from './screens/LoginScreen'
export { RegisterScreen } from './screens/RegisterScreen'
```

### Features never reach into each other's internals

```typescript
// ✅ CORRECT — import from feature public index
import { useAuthStore, type User } from '@/features/auth'

// ❌ WRONG — reaching into internals
import { useAuthStore } from '@/features/auth/store/auth.store'
import type { User } from '@/features/auth/types'
```

---

## 4. API Layer Rules

### API functions are plain async functions — not classes

```typescript
// src/features/auth/api/auth.api.ts

import { apiClient } from '@/core/api/client'
import { LoginResponseSchema, RegisterResponseSchema, UserSchema } from './auth.schema'
import type { LoginPayload, RegisterPayload, User, AuthTokens } from '../types'

export async function loginApi(payload: LoginPayload): Promise<{
  user: User
  tokens: AuthTokens
}> {
  const response = await apiClient.post('/auth/login', payload)
  // Zod validates at runtime — catches bad API responses immediately
  return LoginResponseSchema.parse(response.data)
}

export async function registerApi(payload: RegisterPayload): Promise<{
  user: User
  tokens: AuthTokens
}> {
  const response = await apiClient.post('/auth/register', payload)
  return RegisterResponseSchema.parse(response.data)
}

export async function getCurrentUserApi(): Promise<User> {
  const response = await apiClient.get('/auth/me')
  return UserSchema.parse(response.data)
}

export async function logoutApi(): Promise<void> {
  await apiClient.post('/auth/logout')
}

export async function refreshTokenApi(refreshToken: string): Promise<AuthTokens> {
  const response = await apiClient.post('/auth/refresh', { refreshToken })
  return response.data
}
```

### Zod schemas — always validate API responses

```typescript
// src/features/auth/api/auth.schema.ts

import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
  name: z.string().nullable(),
  avatar: z.string().url().nullable(),
  bio: z.string().nullable(),
  plan: z.enum(['FREE', 'PRO', 'BUSINESS']),
  role: z.enum(['USER', 'ADMIN', 'SUPER_ADMIN']),
  createdAt: z.string(),
})

export const AuthTokensSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
})

export const LoginResponseSchema = z.object({
  user: UserSchema,
  tokens: AuthTokensSchema,
})

export const RegisterResponseSchema = z.object({
  user: UserSchema,
  tokens: AuthTokensSchema,
})
```

### Feature types — derived from Zod schemas

```typescript
// src/features/auth/types.ts

import { z } from 'zod'
import { UserSchema, AuthTokensSchema } from './api/auth.schema'

// Infer from Zod — single source of truth
export type User = z.infer<typeof UserSchema>
export type AuthTokens = z.infer<typeof AuthTokensSchema>

// Input types (defined manually — not from API)
export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  email: string
  password: string
  username: string
}
```

### Core API Client

```typescript
// src/core/api/client.ts

import axios from 'axios'
import { ENV } from '@/core/config/env'
import { secureStorage } from '@/core/storage/secure-storage'
import { AppError } from '@/core/errors/app-error'

export const apiClient = axios.create({
  baseURL: ENV.API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'X-Platform': 'mobile',
    'X-App-Version': ENV.APP_VERSION,
  },
})

// Attach access token to every request
apiClient.interceptors.request.use(async (config) => {
  const token = await secureStorage.get('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Handle 401 — auto refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      try {
        const refreshToken = await secureStorage.get('refreshToken')
        const res = await axios.post(`${ENV.API_URL}/auth/refresh`, { refreshToken })
        const { accessToken } = res.data
        await secureStorage.set('accessToken', accessToken)
        original.headers.Authorization = `Bearer ${accessToken}`
        return apiClient(original)
      } catch {
        await secureStorage.delete('accessToken')
        await secureStorage.delete('refreshToken')
      }
    }
    return Promise.reject(AppError.fromAxiosError(error))
  },
)
```

### API Endpoints — all in one place

```typescript
// src/core/api/endpoints.ts

export const ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
    refresh: '/auth/refresh',
  },
  profile: {
    get: (username: string) => `/profile/${username}`,
    update: '/profile',
  },
  links: {
    list: '/links',
    create: '/links',
    update: (id: string) => `/links/${id}`,
    delete: (id: string) => `/links/${id}`,
    reorder: '/links/reorder',
  },
  analytics: {
    overview: '/analytics/overview',
    clicks: '/analytics/clicks',
  },
} as const
```

### Rules

```
✅ API functions are plain async functions (not classes)
✅ Every response parsed with Zod schema
✅ All calls go through apiClient (never raw fetch/axios)
✅ Token refresh handled in interceptor automatically
✅ All endpoints defined in ENDPOINTS constant
✅ Types inferred from Zod schemas
✅ Sensitive tokens stored in expo-secure-store only
❌ Never use raw fetch() in features
❌ Never skip Zod validation on API response
❌ Never store tokens in AsyncStorage
```

---

## 5. Server State — React Query

### One hook file per data concern

```typescript
// src/features/links/hooks/use-links.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getLinksApi, createLinkApi, deleteLinkApi } from '../api/links.api'
import type { CreateLinkPayload } from '../types'

// Structured query keys — used for targeted invalidation
export const LINKS_KEYS = {
  all: ['links'] as const,
  list: () => [...LINKS_KEYS.all, 'list'] as const,
  detail: (id: string) => [...LINKS_KEYS.all, 'detail', id] as const,
}

// Fetch list
export function useLinks() {
  return useQuery({
    queryKey: LINKS_KEYS.list(),
    queryFn: getLinksApi,
    staleTime: 1000 * 60 * 2, // 2 min — don't refetch if fresh
  })
}

// Create link
export function useCreateLink() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateLinkPayload) => createLinkApi(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LINKS_KEYS.list() })
    },
  })
}

// Delete link — with optimistic update (feels instant)
export function useDeleteLink() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteLinkApi(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: LINKS_KEYS.list() })
      const previous = queryClient.getQueryData(LINKS_KEYS.list())
      queryClient.setQueryData(LINKS_KEYS.list(), (old: any) =>
        old?.filter((link: any) => link.id !== id),
      )
      return { previous }
    },
    onError: (_err, _id, context) => {
      queryClient.setQueryData(LINKS_KEYS.list(), context?.previous)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: LINKS_KEYS.list() })
    },
  })
}
```

### Rules

```
✅ Every query has structured key object (LINKS_KEYS, AUTH_KEYS)
✅ Set staleTime — never leave at 0
✅ invalidateQueries after every mutation
✅ Use optimistic updates for delete and reorder
✅ One hook file per data concern
✅ Export query key objects for use in invalidation elsewhere
❌ Never store React Query data in Zustand
❌ Never manually manage loading/error for server data
   (React Query handles this)
```

---

## 6. Client State — Zustand

### Only UI state — never server data

```typescript
// src/features/auth/store/auth.store.ts

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { secureStorage } from '@/core/storage/secure-storage'

interface AuthStore {
  isAuthenticated: boolean
  userId: string | null
  setAuthenticated: (
    userId: string,
    tokens: {
      accessToken: string
      refreshToken: string
    },
  ) => Promise<void>
  clearAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userId: null,

      setAuthenticated: async (userId, tokens) => {
        // Tokens go to secure storage — NEVER in Zustand state
        await secureStorage.set('accessToken', tokens.accessToken)
        await secureStorage.set('refreshToken', tokens.refreshToken)
        set({ isAuthenticated: true, userId })
      },

      clearAuth: async () => {
        await secureStorage.delete('accessToken')
        await secureStorage.delete('refreshToken')
        set({ isAuthenticated: false, userId: null })
      },
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist non-sensitive fields
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userId: state.userId,
      }),
    },
  ),
)
```

### Rules

```
✅ Zustand = UI state only (auth status, theme, modal open, etc.)
✅ Tokens → expo-secure-store (never Zustand, never AsyncStorage)
✅ Persist only what must survive app restart
✅ One store per feature + one global app.store.ts
✅ Actions defined inside create() (not outside)
❌ Never fetch API data inside Zustand actions
❌ Never put server response data in Zustand
```

---

## 7. Component Rules

### Folder structure

```
src/components/Button/
├── Button.tsx          ← component
├── Button.types.ts     ← props interface
└── index.ts            ← re-export
```

### Component template

```typescript
// src/components/Button/Button.tsx

import React, { memo } from 'react'
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native'
import { colors } from '@/core/theme/colors'
import { typography } from '@/core/theme/typography'
import type { ButtonProps } from './Button.types'

export const Button = memo(function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  testID,
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], styles[size], isDisabled && styles.disabled]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} size="small" />
      ) : (
        <Text style={[styles.text, styles[`${variant}Text`]]}>{title}</Text>
      )}
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  base: { borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.secondary },
  ghost: { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.primary },
  sm: { height: 36, paddingHorizontal: 16 },
  md: { height: 48, paddingHorizontal: 24 },
  lg: { height: 56, paddingHorizontal: 32 },
  disabled: { opacity: 0.5 },
  text: { ...typography.button },
  primaryText: { color: colors.white },
  secondaryText: { color: colors.white },
  ghostText: { color: colors.primary },
})
```

### Rules

```
✅ Always StyleSheet.create (never inline styles)
✅ React.memo on all components (especially list items)
✅ accessibilityLabel + accessibilityRole on all interactive elements
✅ testID prop on every component
✅ Props interface in .types.ts file
✅ Named export (not default export)
✅ Accept optional style prop for layout overrides
❌ Never fetch data in a component
❌ Never inline styles
❌ Never business logic in component
```

---

## 8. Screen Rules

### Screens are thin — compose components, handle state

```typescript
// src/features/links/screens/LinksScreen.tsx

import React, { useCallback } from 'react'
import { View, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

import { useLinks, useDeleteLink } from '../hooks/use-links'
import { LinkList } from '../components/LinkList'
import { EmptyLinks } from '../components/EmptyLinks'
import { Loading } from '@/components/Loading'
import { ErrorView } from '@/components/ErrorView'
import { spacing } from '@/core/theme/spacing'

export function LinksScreen() {
  const router = useRouter()
  const { data: links, isLoading, isError, refetch } = useLinks()
  const { mutate: deleteLink } = useDeleteLink()

  const handleAdd = useCallback(() => {
    router.push('/links/create')
  }, [router])

  const handleDelete = useCallback((id: string) => {
    deleteLink(id)
  }, [deleteLink])

  if (isLoading) return <Loading />
  if (isError) return <ErrorView onRetry={refetch} />

  return (
    <View style={styles.container}>
      {links?.length === 0
        ? <EmptyLinks onAdd={handleAdd} />
        : <LinkList links={links ?? []} onDelete={handleDelete} onAdd={handleAdd} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
})
```

### Rules

```
✅ Screen only: call hooks + compose components + navigation
✅ Always handle loading state
✅ Always handle error state
✅ useCallback on all functions passed as props
✅ Named export
✅ File named [Name]Screen.tsx
❌ Never write business logic in screen
❌ Never call API directly in screen
❌ Never write StyleSheet with 20+ rules in screen
   (extract to components)
```

---

## 9. Navigation Rules

### Route files — one line each

```typescript
// app/(auth)/login.tsx
import { LoginScreen } from '@/features/auth'
export default function LoginRoute() {
  return <LoginScreen />
}
```

### Root layout — providers only

```typescript
// app/_layout.tsx
import { AppProviders } from '@/providers/AppProviders'
import { Slot } from 'expo-router'
export default function RootLayout() {
  return <AppProviders><Slot /></AppProviders>
}
```

```typescript
// src/providers/AppProviders.tsx
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { PropsWithChildren } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, staleTime: 1000 * 60 * 5 },
  },
})

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

### Rules

```
✅ app/ folder = navigation only (one line per route)
✅ All providers in AppProviders.tsx
✅ Use expo-router hooks for navigation (useRouter, useLocalSearchParams)
✅ Use router.replace() when user should not go back
   (e.g., after login → replace to tabs)
❌ Never put business logic in app/ route files
❌ Never put providers scattered across files
```

---

## 10. TypeScript Rules

```typescript
// ✅ Infer types from Zod — single source of truth
export type User = z.infer<typeof UserSchema>

// ✅ interface for props and contracts
interface LinkListProps { links: Link[]; onDelete: (id: string) => void }

// ✅ type for unions
type Theme = 'light' | 'dark' | 'system'

// ✅ Type all function signatures
async function createLink(payload: CreateLinkPayload): Promise<Link> {}

// ✅ unknown for error handling (not any)
function handleError(error: unknown) {
  if (error instanceof AppError) { ... }
}

// ✅ const assertions for static data
const TABS = ['home', 'explore', 'profile'] as const
type Tab = typeof TABS[number]

// ❌ BANNED
const data: any = {}
```

---

## 11. Error Handling Rules

### Single AppError class

```typescript
// src/core/errors/app-error.ts

export type ErrorCode =
  | 'NETWORK_ERROR'
  | 'UNAUTHORIZED'
  | 'NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'SERVER_ERROR'
  | 'UNKNOWN_ERROR'

export class AppError extends Error {
  readonly code: ErrorCode
  readonly statusCode?: number

  constructor(code: ErrorCode, message: string, statusCode?: number) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.statusCode = statusCode
  }

  static fromAxiosError(error: unknown): AppError {
    if (error instanceof AppError) return error
    const e = error as any
    if (e?.response) {
      const status: number = e.response.status
      const message: string = e.response.data?.message ?? 'Something went wrong'
      if (status === 401) return new AppError('UNAUTHORIZED', message, 401)
      if (status === 404) return new AppError('NOT_FOUND', message, 404)
      if (status >= 500) return new AppError('SERVER_ERROR', message, status)
      return new AppError('UNKNOWN_ERROR', message, status)
    }
    if (e?.request) return new AppError('NETWORK_ERROR', 'No internet connection')
    return new AppError('UNKNOWN_ERROR', 'An unexpected error occurred')
  }

  get isNetwork() {
    return this.code === 'NETWORK_ERROR'
  }
  get isUnauthorized() {
    return this.code === 'UNAUTHORIZED'
  }
}
```

### Rules

```
✅ All API errors converted via AppError.fromAxiosError()
   (handled automatically in api client interceptor)
✅ React Query surfaces errors — use isError + error in screens
✅ Show user-friendly messages (error.message only)
✅ Network errors show offline state
✅ 401 errors auto-redirect to login (via interceptor)
❌ Never swallow errors silently
❌ Never catch errors in screens (React Query does it)
❌ Never show raw API error to user
```

---

## 12. Environment & Config Rules

### Typed config — single access point

```typescript
// src/core/config/env.ts

import Constants from 'expo-constants'

const extra = Constants.expoConfig?.extra ?? {}

function requireEnv(key: string): string {
  const value = extra[key]
  if (!value) throw new Error(`Missing required env: ${key}`)
  return value as string
}

export const ENV = {
  APP_ENV: (extra.APP_ENV ?? 'development') as 'development' | 'staging' | 'production',
  API_URL: requireEnv('API_URL'),
  APP_VERSION: Constants.expoConfig?.version ?? '1.0.0',
  IS_DEV: extra.APP_ENV === 'development',
  IS_STAGING: extra.APP_ENV === 'staging',
  IS_PROD: extra.APP_ENV === 'production',
} as const
```

### Rules

```
✅ All env values accessed only via ENV object
✅ Validate required vars at startup (requireEnv)
✅ Never use process.env directly in features
✅ Never commit .env.staging or .env.production
✅ Keep .env.example always updated
✅ Tokens in expo-secure-store (never in ENV or AsyncStorage)
```

---

## 13. Performance Rules

```typescript
// ✅ FlatList for all lists
<FlatList
  data={links}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <LinkCard link={item} />}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  initialNumToRender={10}
  getItemLayout={(_, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>

// ❌ Never ScrollView for lists
<ScrollView>{links.map(link => <LinkCard />)}</ScrollView>

// ✅ Memo on list items
export const LinkCard = memo(function LinkCard({ link }: LinkCardProps) { ... })

// ✅ useCallback on handlers passed as props
const handleDelete = useCallback((id: string) => deleteLink(id), [deleteLink])

// ✅ useMemo for expensive operations
const sorted = useMemo(() => [...links].sort(...), [links])
```

### Rules

```
✅ FlatList for all lists (never ScrollView)
✅ getItemLayout when item height is fixed
✅ Paginate all list APIs (page + limit, never fetch all)
✅ React.memo on all list item components
✅ useCallback for all event handlers passed as props
✅ useMemo for sort/filter/transform operations
✅ expo-image for all remote images (caching built-in)
✅ Set staleTime in React Query
❌ Never load all records from API in one call
❌ Never render lists with ScrollView
```

---

## 14. Naming Conventions

| What             | Convention              | Example              |
| ---------------- | ----------------------- | -------------------- |
| Feature folder   | kebab-case              | `features/bio-link/` |
| Screen file      | PascalCase + Screen     | `LoginScreen.tsx`    |
| Component file   | PascalCase              | `LinkCard.tsx`       |
| Hook file        | kebab-case, prefix use- | `use-login.ts`       |
| API file         | kebab-case + .api       | `auth.api.ts`        |
| Schema file      | kebab-case + .schema    | `auth.schema.ts`     |
| Store file       | kebab-case + .store     | `auth.store.ts`      |
| Types file       | `types.ts` per feature  | `types.ts`           |
| Zustand hooks    | prefix use + Store      | `useAuthStore`       |
| Query keys       | UPPER_SNAKE + \_KEYS    | `LINKS_KEYS`         |
| Constants        | UPPER_SNAKE_CASE        | `MAX_LINKS`          |
| TypeScript types | PascalCase              | `User`, `Link`       |
| Props interfaces | PascalCase + Props      | `ButtonProps`        |
| Env variables    | UPPER_SNAKE_CASE        | `API_URL`            |

---

## 15. New Feature Checklist

Follow this exact order for every new feature:

```
STEP 1 — TYPES
□ Create src/features/[feature]/types.ts
□ Define input payload types manually

STEP 2 — API SCHEMA
□ Create src/features/[feature]/api/[feature].schema.ts
□ Write Zod schemas for every API response shape
□ Infer TypeScript types from Zod schemas in types.ts

STEP 3 — API FUNCTIONS
□ Create src/features/[feature]/api/[feature].api.ts
□ One async function per API endpoint
□ Parse every response with Zod schema
□ Errors propagate as AppError (interceptor handles it)

STEP 4 — REACT QUERY HOOKS
□ Create src/features/[feature]/hooks/
□ One file per data concern
□ Define KEYS object at top of each hook file
□ useQuery for GET, useMutation for POST/PATCH/DELETE
□ invalidateQueries after mutations
□ Optimistic updates for delete/reorder

STEP 5 — ZUSTAND STORE (only if UI state needed)
□ Create src/features/[feature]/store/[feature].store.ts
□ UI state only — not server data
□ Persist only what survives app restart

STEP 6 — COMPONENTS
□ Create feature components in [feature]/components/
□ .tsx + .types.ts + index.ts per component
□ Dumb — props in, UI out
□ StyleSheet.create, React.memo, accessibilityLabel, testID

STEP 7 — SCREEN
□ Create screen in [feature]/screens/[Name]Screen.tsx
□ Thin — call hooks, compose components
□ Handle isLoading + isError states
□ useCallback on all handlers

STEP 8 — NAVIGATION ROUTE
□ Add route file in app/
□ One line: import screen + render

STEP 9 — PUBLIC API
□ Update src/features/[feature]/index.ts
□ Export only what other features need

QUALITY GATE
□ Zero TypeScript errors
□ Zero ESLint errors
□ No any types anywhere
□ No inline styles anywhere
□ No API calls in screens or components
□ No server data in Zustand
□ All API responses validated with Zod
□ All lists use FlatList
□ All handlers use useCallback
□ Pagination implemented for list endpoints
```

---

## 📌 Quick Reference

```
"Where does this code go?"
───────────────────────────────────────────────────────
Raw API call          → features/[f]/services/[f].service.ts
React Query hooks     → features/[f]/hooks/use-[x].ts
Feature types         → features/[f]/types/
Feature constants     → features/[f]/constants/
Zustand store         → features/[f]/store/[f].store.ts
Screen                → features/[f]/screens/[Name]Screen.tsx
Feature component     → features/[f]/components/[Name].tsx
Shared component 2+   → src/shared/components/[Name]/
API client setup      → src/shared/services/api/
Secure storage        → src/shared/services/storage/
Generic hooks         → src/shared/hooks/
Formatters/validators → src/shared/utils/
Theme/colors/spacing  → src/shared/constants/
Env config            → src/config/env.ts
Feature flags         → src/config/feature-flags.ts
App settings          → src/config/settings.ts
Error classes         → src/core/errors/
Global UI state       → src/store/app.store.ts
All providers         → src/providers/AppProviders.tsx
Route files           → app/
───────────────────────────────────────────────────────

"Which tool for which state?"
───────────────────────────────────────────────────────
Data from server          → React Query (useQuery, useMutation)
Auth status, theme, UI    → Zustand (useAuthStore, useAppStore)
Form state                → React Hook Form
Sensitive tokens          → expo-secure-store only
Persisted preferences     → Zustand + AsyncStorage
───────────────────────────────────────────────────────
```

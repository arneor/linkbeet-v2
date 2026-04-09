# CONVENTIONS.md — Code Style & Patterns

## Formatting (Prettier)

```js
{
  semi: false,              // No semicolons
  singleQuote: true,        // Single quotes
  trailingComma: 'all',     // Trailing commas everywhere
  printWidth: 100,          // 100 char max line width
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,
  arrowParens: 'always',
  endOfLine: 'lf',
}
```

## TypeScript (strict)

- `strict: true` + `noImplicitAny` + `noUnusedLocals` + `noUnusedParameters` enforced
- No `any` preferred — warnings in ESLint (`@typescript-eslint/no-explicit-any: warn`)
- Prefix unused vars/params with `_` to suppress warnings
- Non-null assertions (`!`) emit warnings
- Explicit return types optional (ESLint `off`)

## ESLint Rules (Key)

- `prettier/prettier: error` — formatting enforced via ESLint
- `unused-imports/no-unused-imports: error` — auto-removable on lint --fix
- `import/order: error` — 6-group import order: builtin → external → internal → parent → sibling →
  index; newlines between; alphabetized
- `no-console: warn` — only `console.warn` and `console.error` allowed
- `prefer-const: error`
- `no-var: error`

## Import Order Pattern (NestJS example)

```typescript
// 1. NestJS/external packages
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

// 2. Internal absolute (path aliases)
import { PrismaService } from '../../prisma/prisma.service'

// 3. Relative
import { CreateUserDto } from './dto/create-user.dto'
```

## NestJS Module Pattern

Every feature module follows this structure:

```typescript
// module.ts — declares imports, controllers, providers, exports
@Module({
  imports: [
    /* other modules */
  ],
  controllers: [FeatureController],
  providers: [FeatureService],
  exports: [FeatureService], // export only what other modules need
})
export class FeatureModule {}
```

## NestJS Service Pattern

```typescript
@Injectable()
export class FeatureService {
  constructor(private readonly prisma: PrismaService) {}
  // Implementation methods
}
```

## NestJS Controller Pattern

```typescript
@ApiTags('feature')
@Controller('feature') // maps to /api/v1/feature
export class FeatureController {
  constructor(private readonly featureService: FeatureService) {}
}
```

## Auth: @Public() Decorator

Routes that bypass `JwtAuthGuard` must use:

```typescript
import { Public } from '../common/decorators/public.decorator'

@Public()
@Get('health')
healthCheck() { ... }
```

## Config Access Pattern

```typescript
constructor(private readonly config: ConfigService) {}

this.config.get<string>('jwt.secret')          // typed access
this.config.get<number>('app.port', 3000)      // with default
```

## Error Responses (RFC 7807)

All errors returned as Problem Details:

```json
{
  "type": "https://linkbeet.in/errors/404",
  "title": "Not Found",
  "status": 404,
  "detail": "User not found",
  "instance": "/api/v1/users/123"
}
```

Validation errors include `errors[]` array.

## Next.js App Router Patterns

### Server Components (default)

```typescript
// app/(dashboard)/dashboard/page.tsx
import { auth } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await auth()
  // ...
}
```

### Client Components

```typescript
'use client'
import { useSession } from '@/lib/auth-client'
```

### Route Protection (middleware.ts)

```typescript
// Runs on every request, redirects based on session
export default async function middleware(request: NextRequest) {
  const session = await auth()
  // Redirect unauthenticated users from protected routes
}
```

## Mobile Feature Module Pattern

```typescript
// features/[name]/index.ts — public API only
export { ScreenName } from './screens/ScreenName'
export type { SomeType } from './types'
// Never export internal implementation
```

## Constants Pattern (`@linkbeet/constants`)

```typescript
// Object literal with `as const`
export const ORDER_STATUSES = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
} as const

export type OrderStatus = keyof typeof ORDER_STATUSES
```

## Git Commit Convention (Conventional Commits)

```
feat(scope): lowercase description
fix(scope): lowercase description
chore(scope): lowercase description
docs(scope): lowercase description
```

- **scope**: module/package name
- **subject**: always lowercase (enforced by commitlint `subject-case`)
- Pre-push hook runs full build to catch breaking changes

## Husky Hooks

| Hook         | Command                                                                       |
| ------------ | ----------------------------------------------------------------------------- |
| `pre-commit` | `npx pnpm exec lint-staged` — ESLint --fix + Prettier --write on staged files |
| `commit-msg` | `npx pnpm exec commitlint --edit` — validates commit message format           |
| `pre-push`   | `npx pnpm run build` — full Turborepo build before push                       |

## lint-staged Targets

```
web/**/*.{ts,tsx}    → eslint --fix, prettier --write
admin/**/*.{ts,tsx}  → eslint --fix, prettier --write
mobile/**/*.{ts,tsx} → eslint --fix, prettier --write
api/**/*.ts          → eslint --fix, prettier --write
shared/**/*.ts       → eslint --fix, prettier --write
**/*.{json,md}       → prettier --write
```

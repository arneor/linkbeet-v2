# CONCERNS.md — Technical Debt, Issues & Fragile Areas

## 🔴 Critical — Must Fix Soon

### 1. Prisma Schema is Empty

- **File**: `api/prisma/schema.prisma` (0 bytes)
- **Impact**: Database doesn't run, nothing can be persisted, no migrations exist
- **Risk**: Entire backend is non-functional until schema is defined
- **Action**: Define all models (User, Profile, Link, Connection, Product, Order, Booking, Payment,
  etc.)

### 2. Better Auth Not Fully Wired in Web

- **File**: `web/src/lib/auth.ts`
- **Issue**: `betterAuth()` called with a mock empty `db: {}` object — will fail in production
- **Impact**: Auth won't work — sessions can't be created or read
- **Action**: Wire proper database adapter (Prisma) once schema exists

### 3. CORS Wildcard (`*`) in Production

- **File**: `api/src/main.ts:32`
- **Code**: `origin: '*', // TODO: configure properly`
- **Impact**: Security risk — any origin can make credentialed requests in production
- **Action**: Set `FRONTEND_URL` env var and restrict CORS to known origins

### 4. Admin Auth is a Placeholder

- **File**: `admin/src/lib/auth.ts`
- **Content**: `export {}` — no actual implementation
- **Impact**: Admin panel has no authentication
- **Action**: Implement admin auth (Better Auth or separate JWT flow)

### 5. All Feature Module Services/Controllers are Stubs

- **Files**: All `api/src/modules/*/[name].service.ts` and `.controller.ts`
- **Content**: Empty classes — no actual logic
- **Impact**: Zero business logic implemented — API returns nothing useful
- **Action**: Implement each module systematically (Phase 2 roadmap)

---

## 🟡 Moderate — Track and Address

### 6. No Tests Anywhere

- **Scope**: API has Jest config but 0 `.spec.ts` files; web/admin/mobile have no test setup
- **Risk**: No regression protection as features are implemented
- **Action**: Add unit tests for services as they're implemented; add e2e for critical flows

### 7. CI/CD Incomplete

- **Issue**: CI workflows for `web`, `admin`, and `mobile` were deleted during microservices
  migration
- **Existing**: Only `api.yml` remains
- **Risk**: Web/admin/mobile code pushed without validation
- **Action**: Restore CI pipelines for all 4 surfaces

### 8. Observability Not Wired

- **Issue**: `nestjs-pino` installed but no explicit Pino module setup in `AppModule`;
  Sentry/OpenTelemetry (`instrument.ts`) from legacy microservices not yet ported to monolith
- **Risk**: Production incidents with no traces or logs
- **Action**: Add PinoModule to AppModule, wire OpenTelemetry/Sentry

### 9. Redis Service is a Stub

- **File**: `api/src/redis/redis.service.ts`
- **Issue**: Module exists but actual ioredis client initialization code unclear
- **Impact**: Caching, event streaming, rate limiting won't work
- **Action**: Implement RedisService with connection lifecycle and typed methods

### 10. Mobile Has Minimal Screens

- **Implemented**: Only `LoginScreen` and `ProfileScreen`
- **15 feature domains**: Just scaffold (empty index.ts + .gitkeep files)
- **Impact**: App non-functional beyond auth/profile
- **Action**: Build screens per roadmap

---

## 🟢 Minor — Low Priority / Informational

### 11. TODOs in Source (11 total)

```
api/src/main.ts                    — CORS config (see #3 above)
api/src/modules/referral/*         — Implementation
api/src/modules/crm/*              — Implementation
api/src/modules/admin/*            — Implementation
api/src/modules/ratings/*          — Implementation
api/src/modules/notifications/*    — Implementation
```

### 12. `next lint` Deprecation Warning

- `web` and `admin` use `next lint` scripts
- Next.js 16 will remove `next lint`; migrate to ESLint CLI
- **Action**: Migrate when upgrading to Next.js 16

### 13. Turbo Remote Cache Disabled

- `turbo.json`: remote caching not configured
- CI builds run full rebuild each time
- **Action**: Enable Vercel/self-hosted Turborepo remote cache for faster CI

### 14. Prisma Schema Not Version-Locked to Migrations

- `api/prisma/migrations/` directory is empty
- Once schema is defined, first migration must be committed before any seeding
- **Risk**: Schema drift if multiple developers work in parallel
- **Action**: Establish migration workflow early

### 15. Auth NextAuth Route Still Named `[...nextauth]`

- **File**: `web/src/app/api/auth/[...nextauth]/route.ts`
- **Issue**: Still uses `nextauth` directory name but serves Better Auth handlers
- **Impact**: Confusing naming, not a runtime bug
- **Action**: Rename directory to `[...all]` per Better Auth convention

### 16. Mobile `analytics` and `settings` Features Missing

- Referenced in `shared/constants` as `DEFAULT_SCREENS`
- `mobile/src/features/analytics` and `settings` directories don't appear to exist
- **Action**: Scaffold these feature directories

---

## Fragile Areas

| Area                   | Why Fragile                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `web/src/lib/auth.ts`  | Mock DB — breaks silently in production                                                |
| `api/src/main.ts` CORS | Wildcard breaks security in prod                                                       |
| Prisma schema          | Empty — any DB operation will fail                                                     |
| Husky hooks            | Use `npx pnpm` workaround — may not work if npx unavailable                            |
| Turbo build            | `admin` build was killed mid-run (exit 130) in previous session — may have stale cache |
| Mobile entry           | Hard redirects to `/(tabs)` which doesn't exist yet                                    |

# LinkBeet v2 — STATE.md

_Project memory — updated at each phase transition_

---

## Current Position

- **Milestone**: 1 (Phase 2 Core Build)
- **Current Phase**: 0 — Not started (just initialized)
- **Next Action**: `/gsd-discuss-phase 1` → `/gsd-plan-phase 1` → `/gsd-execute-phase 1`

---

## What Was Just Done

- **April 2026**: Completed microservices → monolith migration
  - Removed 7 legacy microservice dirs (`api/analytics`, `api/auth`, `api/booking`, `api/catalog`,
    `api/payment`, `api/profile`, `api/search`)
  - Removed `shared/db` and `shared/kafka` packages
  - Created new unified `api/` NestJS monolith with 20 feature module scaffolds
  - Fixed TypeScript build errors in `web/src/lib/auth.ts` and `web/src/lib/auth-client.ts`
  - Fixed Husky hooks to use `npx pnpm` (PATH compatibility)
  - Removed legacy web API routes (moved to NestJS monolith)
- **April 2026 (today)**: GSD context engineering initialized
  - Codebase mapped (7 documents in `.planning/codebase/`)
  - PROJECT.md, REQUIREMENTS.md, ROADMAP.md, STATE.md created

---

## Key Decisions Locked

| Decision                            | Date  | Rationale                                   |
| ----------------------------------- | ----- | ------------------------------------------- |
| NestJS Monolith (not microservices) | Prior | Faster dev, ops simplicity at current scale |
| Better Auth (not NextAuth)          | Prior | User data in our PostgreSQL                 |
| Fastify adapter (not Express)       | Prior | Performance on high-concurrency API         |
| Razorpay (not Stripe)               | Prior | India market, UPI, local payment methods    |
| Cloudflare R2 (not AWS S3)          | Prior | Cost — no egress fees                       |
| PostGIS (not external geo API)      | Prior | Integrated with PostgreSQL, powerful        |
| Redis Streams as event bus          | Prior | Simpler ops than Kafka                      |
| Turborepo + pnpm workspaces         | Prior | Monorepo tooling for multi-surface          |

---

## Active Blockers

1. **Prisma schema empty** — nothing persists to DB until schema defined (Phase 1)
2. **Better Auth uses mock DB** — auth broken at runtime until Prisma adapter wired (Phase 1)
3. **CORS wildcard** — security issue, must fix before production deployment

---

## Architecture Notes for Planners

- **Path aliases in API**: `@common/*`, `@config/*`, `@modules/*`, `@prisma-client`, `@redis` (see
  `jest.config.ts`)
- **Global modules**: `PrismaModule` and `RedisModule` are `@Global()` — inject without importing in
  each module
- **Auth bypass**: Use `@Public()` decorator on any controller method to skip `JwtAuthGuard`
- **Config access**: Always use `ConfigService.get<T>('config.key')` — never `process.env` directly
  in services
- **Error format**: Always throw `HttpException` subclasses — `HttpExceptionFilter` handles RFC 7807
  format
- **Event bus**: Use `EventEmitter2` (`@nestjs/event-emitter`) for internal events —
  `eventEmitter.emit('order.created', payload)`
- **Shared types**: Cross-surface types live in `@linkbeet/types` — prefer these over duplicating
  interfaces
- **Plan limits**: `FREE.maxLinks = 5`, `PRO.maxLinks = 50`, `BUSINESS.maxLinks = -1 (unlimited)` —
  see `@linkbeet/constants`
- **Discovery defaults**: `DEFAULT_RADIUS_KM = 5`, `MAX_RADIUS_KM = 50`, Meilisearch indices:
  `profiles`, `catalogue`
- **Mobile routing**: App entry at `mobile/app/index.tsx` redirects to `/(tabs)` — tab layout must
  be created
- **Commit format**: `type(scope): lowercase description` — subject-case enforced by commitlint

---

## Environment Variables Required

```
DATABASE_URL          — PostgreSQL connection string
REDIS_HOST            — Redis host
REDIS_PORT            — Redis port (6379)
REDIS_PASSWORD        — Redis auth password
BETTER_AUTH_SECRET    — Auth secret key
BETTER_AUTH_URL       — Auth base URL
JWT_SECRET            — JWT signing secret
JWT_ACCESS_EXPIRES_IN — e.g., 15m
JWT_REFRESH_EXPIRES_IN — e.g., 7d
MEILISEARCH_HOST      — Meilisearch URL
MEILISEARCH_API_KEY   — Master key
RAZORPAY_KEY_ID       — Razorpay API key
RAZORPAY_KEY_SECRET   — Razorpay API secret
RAZORPAY_WEBHOOK_SECRET — Webhook signature
R2_ACCOUNT_ID         — Cloudflare R2 account
R2_ACCESS_KEY_ID      — R2 credentials
R2_SECRET_ACCESS_KEY  — R2 credentials
R2_BUCKET_NAME        — Storage bucket
R2_PUBLIC_URL         — Public CDN URL
IMGPROXY_URL          — imgproxy instance URL
IMGPROXY_KEY          — imgproxy signing key
IMGPROXY_SALT         — imgproxy signing salt
FIREBASE_PROJECT_ID   — Firebase project
FIREBASE_CLIENT_EMAIL — Firebase service account
FIREBASE_PRIVATE_KEY  — Firebase private key
```

---

## Phase Transition Log

| Phase            | Status | Date       | Notes                                     |
| ---------------- | ------ | ---------- | ----------------------------------------- |
| Foundation setup | ✅     | Prior      | Legacy microservices → monolith           |
| GSD initialized  | ✅     | April 2026 | Codebase mapped, planning context created |
| 1 — DB Schema    | ⬜     | —          |                                           |
| 2 — Auth         | ⬜     | —          |                                           |
| 3 — Profile      | ⬜     | —          |                                           |
| 4 — Discovery    | ⬜     | —          |                                           |
| 5 — Mobile       | ⬜     | —          |                                           |
| 6 — Admin        | ⬜     | —          |                                           |
| 7 — Infra/CI     | ⬜     | —          |                                           |
| 8 — Commerce     | ⬜     | —          |                                           |
| 9 — Bookings     | ⬜     | —          |                                           |

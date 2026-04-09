# ARCHITECTURE.md — System Architecture

## Pattern

**Multi-surface Turborepo Monorepo** — 4 deployable apps built and orchestrated by Turborepo with
pnpm workspaces.

Backend is a **NestJS Modular Monolith** (deliberately chosen over microservices for Phase 2).
Microservices migration planned at 1M+ users (Phase 4).

---

## Application Surfaces

```
linkbeet-v2/
├── web/        → Next.js 15 App Router — public consumer web (linkbeet.com)
├── admin/      → Next.js 15 App Router — internal admin panel (admin.linkbeet.com)
├── mobile/     → Expo 54 / React Native — iOS + Android
├── api/        → NestJS 11 Fastify — unified backend API (api.linkbeet.com)
└── shared/     → @linkbeet/* packages consumed by all surfaces
```

---

## Backend Architecture (NestJS Monolith)

### Entry Point

`api/src/main.ts` — bootstraps `NestFastifyApplication`:

- Global prefix: `/api`
- URI versioning: `/api/v1/...`
- Global Pipes: `ValidationPipe` (whitelist, transform, forbidNonWhitelisted)
- Global Filters: `HttpExceptionFilter` (RFC 7807 Problem Details)
- Global Interceptors: `LoggingInterceptor` (method + URL + response time)
- Global Guards: `JwtAuthGuard` (passport-jwt; bypass with `@Public()`)
- Swagger at `/docs` (non-prod only)
- Fastify `trustProxy: true`

### Module Structure

```
api/src/
├── app.module.ts           — root module, imports all feature modules
├── main.ts                 — bootstrap entry
├── config/                 — typed config modules (10 configs)
├── common/
│   ├── guards/             — JwtAuthGuard
│   ├── filters/            — HttpExceptionFilter
│   ├── interceptors/       — LoggingInterceptor
│   └── decorators/         — @Public()
├── prisma/                 — PrismaModule (global), PrismaService
├── redis/                  — RedisModule (global), RedisService
└── modules/                — 20 feature modules (vertical slices)
```

### Feature Modules (20)

Each module follows the pattern: `module.ts`, `controller.ts`, `service.ts`, optional `dto/`

| Module          | Domain                                 |
| --------------- | -------------------------------------- |
| `auth`          | JWT, Better Auth, OTP, OAuth           |
| `account`       | User account management                |
| `profile`       | Bio page, links, themes, QR code       |
| `connections`   | Social graph, follow/connect           |
| `discovery`     | Geo search, hyperlocal feed            |
| `commerce`      | Products, catalogue, orders            |
| `booking`       | Service appointment booking            |
| `payments`      | Razorpay, splits, wallet top-up        |
| `wallet`        | Balance, transactions                  |
| `analytics`     | Click tracking, profile views          |
| `catalog`       | Catalogue items management             |
| `crm`           | Customer relationships (business mode) |
| `messaging`     | In-app messaging (Phase 3)             |
| `notifications` | Push (FCM), in-app                     |
| `ratings`       | Reviews and ratings                    |
| `referral`      | Referral program                       |
| `media`         | Upload, image processing (imgproxy)    |
| `support`       | Help desk / tickets                    |
| `gamification`  | Points, badges (Phase 3)               |
| `admin`         | Admin-only operations                  |

### Infrastructure Modules

- **PrismaModule** — `@Global()`, provides `PrismaService` (extends PrismaClient)
- **RedisModule** — `@Global()`, provides `RedisService` (ioredis wrapper)
- **ConfigModule** — `isGlobal: true`, loads env from `.env.{NODE_ENV}`
- **EventEmitterModule** — `global: true`, wildcard events, delimiter `.`

---

## Frontend Architecture (Next.js App Router)

### Web (`web/src/`)

```
app/
├── (auth)/         — Login, Register routes
├── (dashboard)/    — Protected dashboard routes
│   ├── dashboard/  — Main dashboard page
│   └── layout.tsx  — Auth-protected layout
├── [username]/     — Public profile page (dynamic)
├── api/            — Route handlers (removed in favor of API)
│   └── auth/[...nextauth]/  — Better Auth handler
├── layout.tsx      — Root layout
└── page.tsx        — Landing/home page
src/
├── components/     — Reusable React components
├── hooks/          — Custom React hooks
├── lib/
│   ├── auth.ts         — Better Auth server config (betterAuth instance)
│   └── auth-client.ts  — Better Auth client (createAuthClient)
├── store/          — Zustand stores
├── types/          — Local type definitions
└── middleware.ts   — Route protection (checks session, redirects)
```

### Admin (`admin/src/`)

```
app/
├── /                — Landing/dashboard entry
├── /dashboard       — Admin dashboard
├── /analytics       — Analytics view
├── /users           — User management
├── /settings        — Settings
└── /login           — Admin login
src/
├── components/      — Admin-specific UI
├── hooks/           — Admin hooks
└── lib/auth.ts      — Auth placeholder
```

---

## Mobile Architecture (Expo Router)

```
mobile/
├── app/
│   └── index.tsx    — Redirects to /(tabs)
└── src/
    └── features/    — Feature-domain modules (15 domains)
        ├── auth/
        │   └── screens/LoginScreen.tsx
        ├── profile/
        │   └── screens/ProfileScreen.tsx
        └── [domain]/   — Each has: components/, screens/, hooks/, services/, store/, types/, utils/
```

### Mobile State Pattern

- **TanStack Query** — server state (API data)
- **Zustand** — client/UI state
- **React Hook Form + Zod** — form state

---

## Data Flow

```
Mobile/Web/Admin → REST API (api.linkbeet.com/api/v1/...)
                   ↓
              NestJS Monolith
              ├── JwtAuthGuard validates Bearer token
              ├── Controller → Service → PrismaService (DB)
              │                       → RedisService (cache/events)
              │                       → Meilisearch (search)
              │                       → Firebase (notifications)
              │                       → Razorpay (payments)
              │                       → R2/imgproxy (media)
              └── HttpExceptionFilter (RFC 7807 errors)
```

## Auth Flow

```
User → Better Auth → PostgreSQL (sessions)
                   → JWT issued → stored client-side
JWT → JwtAuthGuard → @Public() bypass → Controller
```

---

## Build & Deployment

```
Turborepo
├── pnpm build → next build (web, admin), nest build (api), tsc (shared/*)
├── Cache: turbo remote cache (disabled currently)
└── Order: shared/* → apps (dependency graph)

GitHub Actions
├── api.yml → lint + build on api/** changes
└── (web/admin/mobile — CI workflows removed during migration, to be restored)

Deployment
├── api → Docker → AWS ECS ap-south-1
├── web/admin → Vercel
└── mobile → EAS Build (Expo)
```

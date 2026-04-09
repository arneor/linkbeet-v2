# STACK.md — Technology Stack

## Runtime & Package Manager

- **Node.js** >= 20 (enforced in `package.json#engines`)
- **pnpm** 10.33.0 (enforced via `packageManager` field)
- **TypeScript** 5.8.x — strict mode, `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters` across
  all packages

## Monorepo Tooling

- **Turborepo** 2.9.3 — task orchestration, caching, parallel builds (`turbo.json`)
- **pnpm workspaces** — `web`, `admin`, `mobile`, `api`, `shared/*`
- **Shared tsconfig** — `tsconfig.base.json` at root with strict settings

---

## Backend — `api/`

- **NestJS 11** on **Fastify** (`@nestjs/platform-fastify`) — monolith architecture
- **Prisma ORM 6.6** (`@prisma/client`) — PostgreSQL adapter, empty schema (to be defined)
- **Better Auth 1.2** — replaces NextAuth; handles sessions server-side
- **Passport.js + JWT** (`@nestjs/passport`, `passport-jwt`) — JWT guard for API routes
- **ioredis 5** — Redis client for caching / event streams
- **Meilisearch SDK** — full-text + geo search client
- **NestJS Swagger 11** — auto-generates API docs at `/docs` (non-prod)
- **NestJS Throttler 6** — rate limiting
- **NestJS Schedule 5** — cron jobs
- **NestJS EventEmitter 3** — internal event bus (Redis Streams planned Phase 4)
- **Razorpay SDK 2** — payments gateway
- **Firebase Admin 13** — FCM push notifications
- **AWS SDK v3** (`@aws-sdk/client-s3`) — S3-compatible for Cloudflare R2
- **QRCode 1.5** — QR code generation
- **UUID 11** — ID generation
- **pino-http / nestjs-pino** — structured logging

## Backend Config Modules (`api/src/config/`)

| Config               | Purpose                               |
| -------------------- | ------------------------------------- |
| `appConfig`          | Port, env, frontend URL               |
| `databaseConfig`     | PostgreSQL DATABASE_URL               |
| `redisConfig`        | Redis host/port/password              |
| `jwtConfig`          | Secret, access/refresh expiry         |
| `meilisearchConfig`  | Host + API key                        |
| `razorpayConfig`     | Key ID + secret + webhook             |
| `storageConfig`      | R2 account, bucket, public URL        |
| `firebaseConfig`     | Project ID, client email, private key |
| `better-auth.config` | BETTER_AUTH_SECRET, BETTER_AUTH_URL   |
| `imgproxy.config`    | URL, key, salt                        |

---

## Frontend Web — `web/`

- **Next.js 15.3** (App Router, RSC)
- **React 19**, **React DOM 19**
- **Tailwind CSS 4** + `@tailwindcss/postcss`
- **Better Auth 1.1** (`better-auth/react`, `better-auth/next-js`) — client-side auth
- **TanStack Query v5** — server state / data fetching
- **Zustand 5** — client state
- **React Hook Form 7** + `@hookform/resolvers` + **Zod 3** — forms + validation
- **Lucide React 1.7** — icon system
- **Upstash Redis/Ratelimit** — edge rate limiting
- **clsx + tailwind-merge + CVA** — conditional class utilities

## Frontend Admin — `admin/`

- **Next.js 15.5** (same React 19 / Tailwind 4 stack)
- Separate app at `admin.linkbeet.com`
- Auth stub: `admin/src/lib/auth.ts` (placeholder, to be implemented)
- Pages: `/`, `/dashboard`, `/analytics`, `/users`, `/settings`, `/login`

---

## Mobile — `mobile/`

- **Expo 54** + **Expo Router 6** (file-based routing)
- **React Native 0.81**, **React 19**
- **TanStack Query v5** — API state
- **Zustand 5** — local state
- **React Hook Form 7** + **Zod 3** — forms
- **expo-constants, expo-linking, expo-status-bar** — Expo ecosystem
- **react-native-safe-area-context, react-native-screens** — navigation basics

### Mobile Feature Modules (`mobile/src/features/`)

| Module                                          | Status                                      |
| ----------------------------------------------- | ------------------------------------------- |
| `auth`                                          | LoginScreen exported                        |
| `profile`                                       | ProfileScreen, PublicProfileScreen exported |
| `account`, `booking`, `commerce`, `connections` | Scaffold (index + .gitkeep)                 |
| `crm`, `discovery`, `notifications`, `payments` | Scaffold                                    |
| `profile-links`, `ratings`, `referral`          | Scaffold                                    |
| `analytics`, `settings`                         | Referenced in workspace                     |

---

## Shared Packages (`shared/`)

| Package                 | Content                                                  |
| ----------------------- | -------------------------------------------------------- |
| `@linkbeet/constants`   | App constants, plan limits, statuses, domain enums       |
| `@linkbeet/types`       | Shared TypeScript interfaces (User, Link, Profile, etc.) |
| `@linkbeet/utils`       | Array, string, URL, analytics, format, object utilities  |
| `@linkbeet/validations` | Zod schemas shared across apps                           |
| `@linkbeet/ui`          | Shared UI primitives (used by web + admin)               |

---

## Code Quality

- **ESLint 9** with `typescript-eslint`, `eslint-plugin-prettier`, `eslint-plugin-unused-imports`,
  `eslint-plugin-import-x`
- **Prettier** — no-semi, single-quote, 100 char width, trailing commas
- **Husky 9** + **lint-staged 16** — pre-commit (lint+format) + commit-msg (commitlint) + pre-push
  (build)
- **commitlint** with conventional commits standard

# LinkBeet v2 — STATE.md

_Project memory — updated at each phase transition | PRD: v2.3_

---

## Current Position

- **Milestone**: 1 (Phase 2 Core Build)
- **Current Phase**: 0 — Not started (just initialized)
- **PRD Version**: v2.3 (April 2026)
- **Target Launch**: July 2026 (Soft Launch)
- **Next Action**: `/gsd-discuss-phase 1` → `/gsd-plan-phase 1` → `/gsd-execute-phase 1`

---

## What Was Just Done

- **April 2026**: Completed microservices → monolith migration
  - Removed 7 legacy microservice dirs, `shared/db`, `shared/kafka`
  - Created unified `api/` NestJS monolith with 20 feature module scaffolds
  - Fixed auth build stubs + Husky hooks
  - Removed legacy web API routes
- **April 2026 (today)**: GSD context engineering initialized + aligned with PRD v2.3
  - Codebase mapped (7 documents), planning files created, PRD fully integrated

---

## Key Decisions Locked (from PRD v2.3)

### Product Decisions

| Decision                                           | Rationale                                                                      |
| -------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Normal/Business mode axis** (NOT industry-gated) | Industry is purely a discovery tag. Mode determines feature access.            |
| **Business mode = one-time permanent unlock**      | Cannot be reverted. Business data always accessible.                           |
| **Anonymous-first discovery**                      | Top-of-funnel priority — friction before login costs users in India            |
| **No bottom tab bar**                              | ChatGPT/Perplexity-style: hamburger sidebar + avatar dropdown + contextual FAB |
| **Verified reviews only**                          | Reviews tied to completed transactions — trust system                          |
| **Referral = double-sided reward**                 | Both referrer + referred get 1 month free Business mode                        |
| **Guest tokens for anonymous users**               | Issued on app open, converted to full session on login                         |
| **Gated actions return 401 with pending action**   | Client stores pending action, completes after login without restart            |
| **Onboarding slides = first install only**         | Never shown again (`onboarding_completed` in local storage)                    |
| **Phase 2 = fresh build from scratch**             | No Phase 1 data migration during build. Cutover at launch.                     |

### Technical Decisions

| Decision                                 | Rationale                                                                                      |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------- |
| NestJS Monolith on Fastify               | Faster dev, ops simplicity at <1M users                                                        |
| Better Auth (not NextAuth/Firebase Auth) | User data stays in our PostgreSQL (DPDP compliance)                                            |
| Razorpay Route (merchant of record)      | India-native, UPI, auto-splits. Platform = merchant, collects full payment, splits to seller.  |
| PostGIS + Meilisearch                    | Geo queries + typo-tolerant text search. Combined: PostGIS filter → Meilisearch rank → merged. |
| Cloudflare R2 + imgproxy                 | WebP, device-responsive resize, 3G optimized. Pre-signed URL uploads.                          |
| Redis Streams as event bus               | Simpler ops than Kafka — upgrade to MSK at Phase 4                                             |
| Firebase FCM + Dynamic Links             | Push (mobile + web) + WhatsApp deep linking (primary organic growth for India)                 |
| AWS Secrets Manager                      | All credentials — not env files in production                                                  |
| Grafana + Loki from day 1                | Observability is non-negotiable                                                                |

---

## Active Blockers

1. **Prisma schema empty** — nothing persists until schema defined (Phase 1)
2. **Better Auth uses mock DB** — auth broken at runtime until Prisma adapter wired (Phase 1)
3. **CORS wildcard** — security issue, must fix before production (Phase 1)

---

## Architecture Notes for Planners

### Account & Mode System

- `account` table has `mode: 'normal' | 'business'` — default `normal`
- One email/phone = one account = one identity (no multi-account)
- Business mode activation: set `mode = 'business'` — never reverted
- Backend gates: middleware checks `mode` on seller/provider endpoints → 403
  `business_mode_required` for Normal
- Smart default: Normal → Discovery screen, Business → Dashboard screen

### Anonymous Sessions

- Guest token issued on app open (before any login)
- Gated actions: bookmark, book, buy, review, connect → 401 `reason: "login_required"`
- Client stores pending action → post-login redirect → completes action
- Anonymous users can freely: search, browse discovery, view profiles, browse offers

### Industry Tag

- Optional field on `account` — NOT a feature gate
- Powers: Meilisearch indexing, category filters, profile badge
- Can be set/changed/removed anytime — Settings or onboarding

### Catalogue Items

- `type: 'product' | 'service'` — ALL users can create items
- Receiving orders/payments requires Business mode
- Any user can buy products/book services regardless of mode
- Product: cart → checkout → order tracking
- Service: slot selection → booking lifecycle → reminders

### Navigation Pattern

- Mobile: NO bottom tab bar — sidebar drawer (hamburger) + avatar dropdown + contextual FAB
- Web: persistent collapsible left sidebar (desktop), minimal top bar (mobile web)
- Sidebar items: Discover, Near Me, My Bio, Dashboard (Business only), Bookmarks, Connections,
  Settings

### Cross-Module Communication

- No inter-service HTTP calls — direct service injection or Redis Streams events
- Notification dispatch always via Redis Streams
- Meilisearch sync via Redis Streams on profile create/update
- EventEmitter2 for internal domain events

### Backend Patterns (for all modules)

- Path aliases: `@common/*`, `@config/*`, `@modules/*`, `@prisma-client`, `@redis`
- PrismaModule + RedisModule are `@Global()` — inject without importing
- `@Public()` decorator skips JwtAuthGuard
- Config via `ConfigService.get<T>('section.key')` — never `process.env` in services
- Error format: throw `HttpException` subclasses → `HttpExceptionFilter` → RFC 7807 response
- Commit format: `type(scope): lowercase description`

### Payments Architecture

- LinkBeet = merchant of record — collects full payment via Razorpay
- Razorpay Route auto-splits: seller gets (100% - platform commission 2-5%)
- Separate PaymentsModule shared by CommerceModule and BookingModule
- CommerceModule + BookingModule have different state machines but unified `GET /orders` endpoint
  for frontend

### Upload Flow

- Client → Razorpay pre-signed R2 URL → upload directly to R2
- NestJS records reference (R2 key, metadata)
- imgproxy serves resized/WebP from R2 URL

---

## Environment Variables Required

```
# Database
DATABASE_URL

# Redis
REDIS_HOST, REDIS_PORT, REDIS_PASSWORD

# Auth
BETTER_AUTH_SECRET, BETTER_AUTH_URL
JWT_SECRET, JWT_ACCESS_EXPIRES_IN (15m), JWT_REFRESH_EXPIRES_IN (7d)

# Search
MEILISEARCH_HOST, MEILISEARCH_API_KEY

# Payments
RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET

# Storage
R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL

# Media
IMGPROXY_URL, IMGPROXY_KEY, IMGPROXY_SALT

# Notifications
FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY

# App
APP_PORT (3000), APP_ENV, FRONTEND_URL
```

---

## PRD Key Metrics (from PRD v2.3)

- Phase 1 (linkbeet.in): 100-200 active customers
- Target: hyperlocal community commerce platform for India
- Primary growth driver: Firebase Dynamic Links → WhatsApp sharing → app installs
- Primary user surface: Mobile (Expo React Native)
- Monetization: Platform commission (2-5%), profile boost, affiliate, digital products

---

## Phase Transition Log

| Phase                                        | Status | Date       | Notes                                           |
| -------------------------------------------- | ------ | ---------- | ----------------------------------------------- |
| Legacy cleanup                               | ✅     | April 2026 | Microservices → monolith migration              |
| GSD initialized                              | ✅     | April 2026 | Codebase mapped, planning aligned with PRD v2.3 |
| 1 — Foundation & DB                          | ⬜     | —          |                                                 |
| 2 — Auth & Accounts                          | ⬜     | —          |                                                 |
| 3 — Profile & Connections                    | ⬜     | —          |                                                 |
| 4 — Discovery & Search                       | ⬜     | —          |                                                 |
| 5 — Mobile Foundation                        | ⬜     | —          |                                                 |
| 6 — Admin, Ratings, Referrals, Notifications | ⬜     | —          |                                                 |
| 7 — Infrastructure & CI/CD                   | ⬜     | —          |                                                 |
| 8 — Commerce, Booking, Payments              | ⬜     | —          |                                                 |
| 9 — CRM, Monetization, Polish                | ⬜     | —          |                                                 |

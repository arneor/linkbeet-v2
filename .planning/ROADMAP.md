# LinkBeet v2 — ROADMAP.md

_Milestone: 1.0 — Phase 2 Core Build | Started: April 2026_

---

## Milestone Goal

Turn the existing monolith scaffold into a fully functional platform — with working auth, profile,
discovery, and a functional mobile app.

---

## Phase 1 — Foundation & Database Schema

**Status**: ⬜ Not started **Goal**: Define all data models, get the database running, wire Redis
and Better Auth properly.

### Deliverables

- Prisma schema with all core models (User, Profile, Link, Connection, Product, Order, Booking,
  Payment, Wallet, Notification, Rating, Referral)
- Initial database migration
- Dev seed script with realistic data
- Redis service fully implemented (connection lifecycle, helpers for cache, pub/sub)
- Better Auth wired with Prisma adapter in `api/` + `web/`
- CORS fixed — env-driven allowed origins list
- `api/src/config/database.config.ts` — DATABASE_URL validation
- All config modules validated at startup (fail-fast on missing required vars)

**Requirements**: F-01, F-02, F-03, F-04, F-05, F-06

---

## Phase 2 — Auth Module

**Status**: ⬜ Not started **Depends on**: Phase 1 **Goal**: Full authentication system — register,
login, JWT, refresh, logout.

### Deliverables

- `AuthController` — POST /api/v1/auth/register, /login, /refresh, /logout
- `AuthService` — bcrypt password hashing, JWT issue/verify/revoke, refresh token rotation
- `AccountModule` — user CRUD, profile creation on register, mode selection (Normal/Business)
- Passport JWT strategy (`jwt.strategy.ts`)
- `@Public()` decorator working correctly
- Better Auth session check in web middleware (using real Prisma adapter)
- Mobile: auth token management (secure storage via expo SecureStore)

**Requirements**: A-01, A-02, A-03, A-04, A-08, A-09

---

## Phase 3 — Profile System

**Status**: ⬜ Not started **Depends on**: Phase 2 **Goal**: Users can create and manage their
public profile and link collection.

### Deliverables

- `ProfileController` — CRUD for profile (slug, display name, bio, social links)
- `ProfileService` — slug uniqueness validation, link ordering
- Link management — POST/PATCH/DELETE `/api/v1/links`, reorder endpoint
- Public profile read API — `GET /api/v1/p/:username` (public, no auth)
- Web: `[username]` page renders public profile from API
- Web: dashboard → profile editor UI (links, bio, socials)
- Analytics stub — increment view count on profile page visit
- Click tracking — increment click count when links are followed

**Requirements**: P-01 to P-08, P-10, AN-01, AN-02

---

## Phase 4 — Discovery & Search

**Status**: ⬜ Not started **Depends on**: Phase 3 **Goal**: Users can find people and businesses
nearby.

### Deliverables

- Location update endpoint — `PATCH /api/v1/account/location` (stores PostGIS point)
- `DiscoveryService` — PostGIS radius query (default 5km, max 50km)
- Meilisearch indexing — profile documents indexed on create/update
- `GET /api/v1/discovery/feed` — geo-paginated nearby profiles
- `GET /api/v1/discovery/search?q=&lat=&lng=` — full-text + geo search
- Mobile: Discovery screen with infinite scroll, search bar, map-style radius selector
- Mobile: Tap on profile card → public profile view

**Requirements**: D-01 to D-04, D-06, M-03, M-04

---

## Phase 5 — Mobile App Foundation

**Status**: ⬜ Not started **Depends on**: Phase 3 **Goal**: Mobile app is functional end-to-end for
core flows: auth, profile, discovery.

### Deliverables

- Expo Router tab layout at `/(tabs)`: discovery, profile, account
- Auth flow: splash → login/register → tab shell
- Token storage and refresh flow in React Native (expo-secure-store)
- API client setup (TanStack Query + Zustand auth store)
- Profile edit screen working against real API
- Discovery feed wired to real API
- Account/settings screen
- Push notification permissions prompt

**Requirements**: M-01, M-02, M-03, M-04, M-05, M-10

---

## Phase 6 — Admin Panel

**Status**: ⬜ Not started **Depends on**: Phase 2 **Goal**: Internal admin panel is usable for
basic user management.

### Deliverables

- Admin auth — separate admin login (JWT with ADMIN/SUPER_ADMIN role check)
- `admin/src/lib/auth.ts` — implemented with Better Auth or direct JWT
- User listing with search/filter
- User detail view (profile, links, account status)
- Basic moderation — activate/deactivate account
- Admin dashboard with user count metrics

**Requirements**: ADM-01, ADM-02, A -> INF-01

---

## Phase 7 — Infrastructure & CI/CD

**Status**: ⬜ Not started **Depends on**: Phase 1 **Goal**: All CI pipelines running, observability
wired, production-ready config.

### Deliverables

- GitHub Actions workflow for `web/` (lint + build on push)
- GitHub Actions workflow for `admin/` (lint + build on push)
- GitHub Actions workflow for `mobile/` (lint)
- Pino logger module added to NestJS `AppModule`
- Sentry/OpenTelemetry `instrument.ts` ported to monolith entry
- Structured log output with request ID correlation
- API Dockerfile validated — local `docker build` succeeds
- Swagger docs current with actual implemented endpoints

**Requirements**: INF-01, INF-02, INF-03, INF-04

---

## Phase 8 — Commerce & Payments (Business Mode)

**Status**: ⬜ Not started **Depends on**: Phase 2, Phase 3 **Goal**: Business users can list
products/services and accept payments.

### Deliverables

- Catalogue CRUD — product and service listings
- Order placement + management (status workflow)
- Razorpay order creation + payment verification webhook
- Razorpay Route split — platform 2-5% commission
- Wallet balance tracking (credit on payment received)
- Order push notifications to seller via FCM
- Mobile: commerce screens (catalogue, order management)
- Mobile: Razorpay payment UI integration

**Requirements**: C-01 to C-05, PAY-01, PAY-02, PAY-03, N-01, M-06, M-08

---

## Phase 9 — Bookings & Connections

**Status**: ⬜ Not started **Depends on**: Phase 8 **Goal**: Service businesses can accept
appointments; users can connect with each other.

### Deliverables

- Availability time slot management for business accounts
- Booking flow — customer creates booking, seller confirms
- Booking cancellation and no-show handling
- Booking reminder push notifications
- Connection request flow — send/accept/decline
- Connection list view
- Mobile: booking and connections screens

**Requirements**: B-01 to B-04, CN-01 to CN-03, M-07, N-02

---

## Backlog (Phase 3+ Ideas)

_See `.planning/todos/` and `.planning/seeds/` for ideas to promote_

---

## Completed Milestones

_(archived after `/gsd-complete-milestone`)_

---

## Phase Status Legend

- ⬜ Not started
- 🔵 In progress
- ✅ Complete
- ⏸️ Blocked
- 🚫 Removed

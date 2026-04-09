# LinkBeet v2 — PROJECT.md

_Version: 2.0 | Initialized: April 2026_

---

## What This Is

**LinkBeet** is a hyperlocal community commerce platform for India — a "digital identity and
commerce layer" for individuals and local businesses.

Every user gets a public profile page (`linkbeet.com/username`) that serves as a shareable digital
touchpoint: bio links, social media, catalogue, and booking. Business accounts get a full commerce
suite: catalogue management, bookings, payments, CRM, and analytics. Normal users get a social
discovery feed to connect with nearby people and businesses.

**Core insight**: India's small businesses (shops, salons, tutors, freelancers) lack digital
presence. LinkBeet gives them a mobile-first page to share, accept orders, manage customers, and get
discovered — all in one place.

---

## What This Is Not

- Not a generic link-in-bio tool (think Linktree) — it's community + commerce
- Not a horizontal marketplace (Amazon/Meesho) — hyperlocal, identity-first
- Not an enterprise product — designed for solo operators and small teams

---

## Core Value Proposition

> One sharable link. Full business in your pocket.

The public profile URL is the entry point. Everything else — commerce, booking, discovery, payments
— flows from that identity.

---

## Technical Context

**Architecture**: Turborepo monorepo with 4 deployable surfaces:

- `web/` — Next.js 15 App Router — public consumer web (linkbeet.com)
- `admin/` — Next.js 15 — internal admin panel (admin.linkbeet.com)
- `mobile/` — Expo 54 React Native — iOS + Android (primary user surface)
- `api/` — NestJS 11 Fastify Monolith (api.linkbeet.com)

**Language**: TypeScript across all surfaces (strict mode)

**Key Tech Decisions**:

- **Better Auth** over NextAuth — sessions in our PostgreSQL
- **PostgreSQL + PostGIS** — geo queries for hyperlocal discovery
- **Meilisearch** — typo-tolerant search, geo-aware
- **Redis Streams** — internal event bus (replaces Kafka)
- **Razorpay Route** — payments with seller auto-splits
- **Cloudflare R2** — media storage (not AWS S3)
- **imgproxy** — WebP, device-responsive image resizing
- **Firebase FCM** — push notifications

**Target Market**: India — optimised for 3G, Razorpay INR, `ap-south-1` AWS

---

## Phases of the Product

### Phase 1 (Legacy — completed): Microservices

- Multiple independent NestJS services (auth, profile, analytics, payment, booking, catalog, search)
- Shared Kafka event bus, shared PostgreSQL DB package

### Phase 2 (Current milestone): Monolith Migration + Core Features

- Consolidated all microservices into single NestJS modular monolith
- Monorepo structure cleaned up (removed 7 legacy service dirs, 2 shared packages)
- **NOW**: Implement actual feature logic — the scaffold exists, implementations are empty

### Phase 3 (Future): Advanced Features

- Gamification, in-app messaging, advanced analytics
- Potential microservices migration at 1M+ users

---

## Requirements

### Validated

- ✓ Turborepo monorepo with pnpm workspaces — existing
- ✓ 4-surface architecture (web/admin/mobile/api) — existing
- ✓ NestJS monolith with 20 feature module scaffolds — existing
- ✓ TypeScript strict configuration — existing
- ✓ ESLint + Prettier + Husky + commitlint — existing
- ✓ Docker dev environment (PostgreSQL+PostGIS, Redis, Meilisearch, imgproxy) — existing
- ✓ GitHub Actions CI for API — existing
- ✓ Shared packages (@linkbeet/constants, types, utils, validations, ui) — existing
- ✓ Next.js 15 App Router web app with auth stubs — existing
- ✓ Expo mobile with feature scaffold (15 domains) — existing

### Active (To Build)

- [ ] Prisma schema — User, Profile, Link, Connection, Product, Order, Booking, Payment, Wallet
      models
- [ ] Database migrations — initial schema + seed data
- [ ] Better Auth fully wired with Prisma adapter in web + api
- [ ] Auth module implementation — sign up, sign in, JWT, OTP, OAuth (Google/Apple)
- [ ] Account module — profile creation, settings, plan management
- [ ] Profile module — bio page, links CRUD, themes, QR code, slug management
- [ ] Discovery module — geo search (PostGIS + Meilisearch), hyperlocal feed
- [ ] Commerce module — catalogue management, product/service listings
- [ ] Booking module — appointment scheduling
- [ ] Payments module — Razorpay integration, order payments, seller splits
- [ ] Analytics module — link clicks, profile views, business dashboards
- [ ] Mobile screens — auth flow, profile, discovery, commerce, booking, payments
- [ ] Admin panel — user management, analytics, moderation
- [ ] CI/CD pipelines for web, admin, mobile
- [ ] Observability — Pino structured logging, Sentry/OpenTelemetry
- [ ] CORS properly configured with allowed origins
- [ ] Tests — unit tests for services, e2e for critical flows

### Out of Scope (Phase 2)

- Gamification (badges, points) — Phase 3
- In-app messaging — Phase 3
- Microservices migration — Phase 4 (1M+ users)
- Custom domain support — Phase 3 PRO/BUSINESS feature

---

## Key Decisions

| Decision                          | Rationale                                                      | Outcome                       |
| --------------------------------- | -------------------------------------------------------------- | ----------------------------- |
| NestJS Monolith for Phase 2       | Faster development, easier debugging, sufficient for <1M users | ✓ Committed                   |
| Redis Streams over Kafka          | Simpler operations, no separate Kafka cluster                  | ✓ Committed                   |
| Better Auth over NextAuth         | User data stays in our DB, more control                        | ✓ Committed                   |
| Fastify over Express              | Performance on high-traffic API                                | ✓ Committed                   |
| Cloudflare R2 over AWS S3         | Cost savings, egress pricing                                   | ✓ Committed                   |
| Razorpay over Stripe              | India-native, UPI support, better local payment methods        | ✓ Committed                   |
| PostGIS over external geo service | Free, integrated, powerful for hyperlocal queries              | ✓ Committed                   |
| CORS wildcard temporarily         | Expedient during development                                   | ⚠️ Must fix before production |

---

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-next`):

1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone**:

1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---

_Last updated: April 2026 after codebase mapping and project initialization_

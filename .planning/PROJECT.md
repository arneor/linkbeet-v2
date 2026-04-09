# LinkBeet v2 — PROJECT.md

_Version: 2.3 | Initialized: April 2026 | PRD Reference: v2.3 (April 2026)_ _Target Launch: July
2026 (Soft Launch)_

---

## What This Is

**LinkBeet** is a hyperlocal community commerce platform for India. Every user gets a public
bio-link profile (`linkbeet.com/username`) that serves as their single digital identity — shareable
via one URL across WhatsApp, Instagram bio, email, or QR code.

The platform operates on a **two-mode axis**:

- **Normal mode** (default) — bio link, discovery feed, nearby search, bookings as customer,
  purchases as customer, analytics, connections, offers browsing, reviews
- **Business mode** (one-time permanent unlock) — everything in Normal, PLUS: product catalogue,
  service catalogue, order management, CRM, offer publishing, payments + payouts, business
  analytics, affiliate tools, profile boost

**Core insight**: India's small businesses (shops, salons, tutors, freelancers, creators) lack a
single digital presence that converts to revenue. LinkBeet gives them a mobile-first page to share,
get discovered locally, accept orders and bookings, manage customers — all in one sharable link.

**Anonymous-first**: The entire discovery experience works without login. Users browse nearby
businesses, view profiles, search — no account required. Login is prompted contextually only when
attempting transactional actions (bookmark, book, buy, review, connect).

---

## What This Is Not

- Not a generic link-in-bio tool (Linktree) — it's community + commerce + hyperlocal discovery
- Not a horizontal marketplace (Amazon/Meesho) — hyperlocal, identity-first
- Not an enterprise product — designed for solo operators and small businesses
- Not a social media platform — connections are LinkedIn-style mutual, no messaging in Phase 2

---

## Core Value Proposition

> One sharable link. Full business in your pocket.

The public profile URL is the entry point. Everything else — commerce, booking, discovery, payments,
CRM — flows from that identity.

---

## Product Axes

### Normal vs Business Mode (Core Axis)

Every account starts in Normal mode. Business mode is a **one-time permanent unlock** — cannot be
reverted.

**Business mode activation triggers:**

1. **Contextual**: user attempts to add a product, create a service, or publish an offer →
   full-screen "Unlock Business Mode" moment with value prop → one confirm tap → permanently
   unlocked
2. **Manual**: Settings → "Switch to Business Mode"

**Business mode gates** (backend middleware): CommerceModule seller endpoints, BookingModule
provider endpoints, CRMModule, offer publishing, payouts — return `403` with
`reason: "business_mode_required"` if `mode = normal`.

Normal mode users can still browse, search, book (as customer), and buy (as customer) — no
restrictions on consuming.

### Industry Tag (Discovery Tag — NOT a Feature Gate)

Optional tag selected during onboarding or anytime in Settings. Powers category filters in search,
Meilisearch indexing, and profile badge display. Does NOT gate or restrict any features.

Available tags: Store, Restaurant / Food & Drink, Saloon / Beauty, Doctor / Health / Wellness,
Content Creator, Music / Creative, Events, Real Estate, Sport & Fitness, Education, Tech & Gaming,
Travel & Activities, Community, Business / Other

### Anonymous Access

Guest token issued on app open. Upgraded to full session on login. Anonymous users can:

- Search, browse discovery, view profiles, browse offers
- On gated action → contextual login prompt → after login, returns exactly where they were

---

## Navigation Pattern

**No traditional bottom tab bar.** LinkBeet uses a modern contextual navigation pattern inspired by
ChatGPT and Perplexity.

### Mobile

- Full-screen content with floating action bar at bottom (Discovery search input)
- **Hamburger sidebar drawer** (top left) — all navigation destinations
- **Avatar dropdown** (top right) — account info, mode, quick links, logout
- **Contextual FAB** (bottom right) — context-aware per screen ("Add listing" on Dashboard, "Edit"
  on Profile)

**Sidebar contents**: Discover, Near Me, My Bio / Profile, Dashboard (Business only), Bookmarks,
Connections, Settings, Login/Signup (if anonymous)

### Web

- **Persistent collapsible left sidebar** (desktop) — like ChatGPT
- **Minimal top bar** (mobile web) — logo left, search center, avatar right
- No horizontal tab bars

### Smart App Open Default

| User state    | Default screen                                  |
| ------------- | ----------------------------------------------- |
| Normal mode   | Discovery                                       |
| Business mode | Bio / Dashboard                                 |
| Any user      | Override in Settings (`default_landing_screen`) |

---

## User Flows

### App Open & Onboarding

```
App open → Splash (2-3 sec) → Onboarding slides (first install only, skippable)
→ Login/Signup (fully skippable) → [If logged in] Industry selection (optional)
→ Bio setup (skippable) → Discovery home screen
```

### Anonymous → Logged In

```
Anonymous user browses → attempts gated action (bookmark/book/buy/review/connect)
→ Contextual login prompt → login/signup → returns to exact screen + completes pending action
```

### Business Mode Activation

```
Normal user attempts business action (add product/service/offer)
→ Full-screen "Unlock Business Mode" moment → one confirm tap → permanently unlocked
→ Dashboard + commerce tools appear
```

---

## Technical Context

**Architecture**: Turborepo monorepo with 4 deployable surfaces:

- `web/` — Next.js 15 App Router — public consumer web (linkbeet.com)
- `admin/` — Next.js 15 — internal admin panel (admin.linkbeet.com)
- `mobile/` — Expo 54 React Native — iOS + Android (primary user surface)
- `api/` — NestJS 11 Fastify Monolith (api.linkbeet.com)

**Language**: TypeScript strict across all surfaces

**Backend modules** (14 per PRD v2.3): | Module | Responsibilities | |--------|-----------------| |
AuthModule | Better Auth, JWT, OTP, OAuth (Google/Apple), anonymous guest sessions | | AccountModule
| Mode management (normal/business), industry tag, default screen preference | | ProfileModule | Bio
page, themes, custom links, social media, video embeds (YouTube/Instagram/TikTok), QR code, slug,
profile share, preview | | ConnectionsModule | Connection requests, accept/decline, connection list,
CRM lead sync | | DiscoveryModule | Geo search (PostGIS), text search (Meilisearch), Discover feed,
Near Me, bookmarks | | CommerceModule | Product catalogue, cart, checkout, orders, order state
machine, payouts | | BookingModule | Service catalogue, slot management, availability calendar,
booking lifecycle, double-booking prevention, reminders | | PaymentsModule | Razorpay Route
integration, payment splits, payout triggers, refunds | | CRMModule | Customer records, lead
tracking (visits + connections + saves), messaging, export | | NotificationsModule | FCM push
(mobile + web), deep links (Firebase Dynamic Links), preferences, event dispatch | | RatingsModule |
Review eligibility (verified transaction only), review CRUD, trust score, business response,
moderation | | AnalyticsModule | Profile views, link clicks, shop metrics, discovery impressions | |
ReferralModule | Referral link generation, signup tracking, double-sided reward (1 month free
Business mode) | | AdminModule | User management, business verification, review moderation, platform
analytics, feature flags |

---

## Key Decisions

| Decision                                       | Rationale                                                           | Status      |
| ---------------------------------------------- | ------------------------------------------------------------------- | ----------- |
| NestJS Monolith for Phase 2                    | Faster development, ops simplicity at <1M users                     | ✓ Committed |
| Normal/Business mode axis — NOT industry-gated | Industry is discovery tag only; mode determines feature access      | ✓ Committed |
| Anonymous-first discovery                      | Top-of-funnel priority — friction before login costs users in India | ✓ Committed |
| No bottom tab bar — sidebar + FAB              | Modern ChatGPT/Perplexity pattern, cleaner UX                       | ✓ Committed |
| Better Auth over NextAuth                      | User data stays in our PostgreSQL (DPDP compliance)                 | ✓ Committed |
| Fastify over Express                           | Performance on high-concurrency API                                 | ✓ Committed |
| Razorpay Route (merchant of record)            | India-native, UPI, auto-splits to sellers                           | ✓ Committed |
| Cloudflare R2 over AWS S3                      | No egress fees, cost savings                                        | ✓ Committed |
| PostGIS over external geo service              | Integrated with PostgreSQL, powerful radius queries                 | ✓ Committed |
| Redis Streams over Kafka                       | Simpler ops, sufficient for Phase 2 volume                          | ✓ Committed |
| imgproxy + R2 for media                        | WebP, device-responsive resize, optimized for 3G India              | ✓ Committed |
| Firebase Dynamic Links                         | WhatsApp deep linking — primary organic growth driver for India     | ✓ Committed |
| Verified reviews only                          | Reviews tied to completed transactions — trust system               | ✓ Committed |
| Business mode permanent                        | Once enabled, never reverted — Business data always accessible      | ✓ Committed |
| Pre-signed R2 uploads                          | Client → R2 pre-signed URL → NestJS records reference               | ✓ Committed |
| AWS Secrets Manager                            | All credentials — not env files in production                       | ✓ Committed |
| Phase 2 = fresh build                          | No Phase 1 data migration during build — cutover at launch          | ✓ Committed |

---

## Key Schema (v2.3)

| Table            | Key Fields                                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| `account`        | mode (normal\|business), industry (optional tag), default_landing_screen, onboarding_completed       |
| `catalogue_item` | type (product\|service), account_id, name, photos, price, stock_quantity, duration_minutes, category |
| `booking`        | service catalogue_item_id, slot, status lifecycle, reminder_sent                                     |
| `order`          | product catalogue_item_id, cart, payment_id, fulfilment status                                       |
| `connection`     | requester_id, recipient_id, status (pending\|accepted\|declined)                                     |
| `review`         | linked to completed booking OR order (verified only), star_rating, text, business_response           |
| `referral`       | referrer_account_id, referred_account_id, status (pending\|converted), reward_dispatched             |
| `video_embed`    | account_id, platform (youtube\|instagram\|tiktok), url, display_order                                |

---

## Requirements

### Validated (Existing in Codebase)

- ✓ Turborepo monorepo with pnpm workspaces — existing
- ✓ 4-surface architecture (web/admin/mobile/api) — existing
- ✓ NestJS monolith with feature module scaffolds — existing
- ✓ TypeScript strict configuration — existing
- ✓ ESLint + Prettier + Husky + commitlint — existing
- ✓ Docker dev environment (PostgreSQL+PostGIS, Redis, Meilisearch, imgproxy) — existing
- ✓ GitHub Actions CI for API — existing
- ✓ Shared packages (@linkbeet/constants, types, utils, validations, ui) — existing

### Active (To Build — Phase 2 Milestone)

- [ ] Prisma schema with all core models (account, catalogue_item, booking, order, connection,
      review, referral, video_embed)
- [ ] Database migrations + dev seed data
- [ ] Anonymous sessions (guest tokens, contextual login, pending action redirect)
- [ ] Better Auth with Prisma adapter — OTP, Google OAuth, Apple Sign-In
- [ ] Account mode system (Normal/Business) with backend gates
- [ ] Industry tag system (optional, changeable, Meilisearch-indexed)
- [ ] Profile system — bio page, links, social, video embeds, QR code, slug, preview, themes
- [ ] Discovery — anonymous geo search (PostGIS + Meilisearch), Discover feed, Near Me, bookmarks
- [ ] Commerce — product catalogue, cart, checkout, orders, order state machine
- [ ] Booking — service catalogue, slot management, availability, double-booking prevention
- [ ] Payments — Razorpay Route, splits, payouts, refunds
- [ ] Connections — mutual requests, CRM lead sync
- [ ] CRM — customer records, lead tracking, export
- [ ] Ratings — verified reviews, trust score, business response, moderation
- [ ] Analytics — profile views, link clicks, shop metrics, discovery impressions
- [ ] Referral — referral links, double-sided rewards (1 month free Business mode)
- [ ] Notifications — FCM push (mobile + web), deep links, preferences
- [ ] Mobile app — onboarding, auth, profile, discovery, commerce, booking, sidebar nav, contextual
      FAB
- [ ] Admin panel — user management, verification, moderation, platform analytics, feature flags
- [ ] Observability — Pino logging, Sentry/OpenTelemetry
- [ ] CI/CD for all 4 surfaces

### Out of Scope (Phase 2)

- Pricing tier definition and enforcement — Phase 3
- ClickHouse analytics (OLAP, sales funnels) — Phase 3
- Product + Service combo catalogue type — Phase 3
- Private messaging between connections — Phase 3
- Native video upload on bio profiles (transcoding) — Phase 3
- Kafka MSK event bus — Phase 4
- AWS EKS / Kubernetes — Phase 4
- Regional language search (Hindi, Tamil) — Phase 4
- International payments via Stripe — Phase 3
- Background location tracking on mobile
- Live streaming
- Multi-vendor marketplace
- Subscription products (recurring billing)
- Staff management (multiple team per account)
- Phase 1 data migration (MongoDB → PostgreSQL) — post-launch cutover

---

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**

1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone:**

1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---

_Last updated: April 2026 — aligned with PRD v2.3_

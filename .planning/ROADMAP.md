# LinkBeet v2 — ROADMAP.md

_Milestone: 1.0 — Phase 2 Core Build | PRD: v2.3 | Target: July 2026 Soft Launch_

---

## Milestone Goal

Deliver the full LinkBeet v2 platform. **UI-first approach** — build all screens (web + mobile
together, screen by screen) before backend implementation.

## Build Philosophy

```
Screen-by-screen UI (web + mobile together)
  → Complete ALL screens end-to-end
    → Then backend: schemas, auth, APIs, business logic
```

Each screen is fully completed on **both web and mobile** before moving to the next screen. Screens
use mock data / static UI during the UI phase. Backend wiring happens after all UI is built.

---

## PART 1 — UI (Screens)

> **Approach**: Pick a screen → build it in web → build it in mobile → next screen. Screens are NOT
> yet defined in order — you will decide the sequence manually as you go. Each phase below is a
> screen or screen group completed on both surfaces.

---

### Phase 1 — Design System & Shared UI Foundation

**Status**: ⬜ Not started **Goal**: Establish design tokens, component library, navigation shells,
and shared patterns before building individual screens.

#### Deliverables

- **Design tokens**: colours, typography (Google Fonts), spacing, border-radius, shadows — in CSS
  variables / Tailwind config
- **Web**: root layout, sidebar navigation shell (ChatGPT/Perplexity-style persistent left sidebar —
  desktop), minimal top bar (mobile web — logo, search, avatar)
- **Mobile**: sidebar drawer shell (hamburger menu), avatar dropdown (top right), contextual FAB
  pattern, header component (hamburger / back + title + avatar)
- **Shared components**: buttons, inputs, cards, modals/bottom-sheets, loading states, empty states,
  avatar, badge
- **Navigation structure**:
  - Web sidebar items: Discover, Near Me, My Bio, Dashboard (Business only), Bookmarks, Connections,
    Settings
  - Mobile drawer items: same as web sidebar
- **Theme**: dark mode support if desired
- **No bottom tab bar** — confirmed per PRD

**Requirements**: Navigation pattern from PRD (ChatGPT/Perplexity-style)

---

### Phase 2 — Auth & Onboarding Screens

**Status**: ⬜ Not started **Depends on**: Phase 1 **Goal**: Login, register, onboarding — both web
and mobile.

#### Deliverables (per screen — web + mobile)

- **Splash screen** (mobile only) — branding, 2-3 sec
- **Onboarding slides** (mobile only) — 3-4 value prop screens, skippable, first install only
- **Login screen** — phone + OTP input, Google OAuth button, Apple Sign-In button, "Skip" option
  (anonymous)
- **Register screen** — if separate from login, or combined flow
- **Industry selection screen** — visual category grid (Saloon, Restaurant, Creator, Store, etc.) —
  optional, skippable
- **Bio setup wizard** — name, photo, first links — skippable, completable later
- All screens use mock/static data — no real auth backend yet

**Requirements**: AUTH-09 through AUTH-12, MOB-01 through MOB-03

---

### Phase 3 — Discovery & Search Screens

**Status**: 🔵 In progress **Depends on**: Phase 1 **Goal**: Discovery home, search, Near Me — the
primary browsing experience.

#### Deliverables (per screen — web + mobile)

- **Discovery home** — clean search-bar-first UI (AI-feel, Perplexity-style), floating search input
  at bottom (mobile), trending/nearby cards with mock data
- **Search results** — list of profile cards with distance, rating, industry badge, verified badge
- **Near Me** — location-gated view, radius selector, map-style layout
- **Category filter** — filter by industry tag in search
- **Profile card component** — avatar, name, industry badge, distance, rating, connection count
- **Anonymous experience** — no login required to browse (everything accessible)

**Requirements**: DISC-01 through DISC-14, MOB-07, MOB-08

**Plans**: 4 plans

Plans:
- [x] 03-01-PLAN.md — Flutter project scaffold + Clean Architecture structure
- [x] 03-02-PLAN.md — Core design system, theme, shared widgets, navigation shell, DI, router
- [ ] 03-03-PLAN.md — Discovery Home screen (HomeScreen + DiscoverySearchInput, FilterChipRow, SuggestionPillRow widgets)
- [ ] 03-04-PLAN.md — Search Results + Near Me screens + route wiring

---

### Phase 4 — Bio Profile Screens

**Status**: ⬜ Not started **Depends on**: Phase 1 **Goal**: Public profile view and profile editor
— the core identity surface.

#### Deliverables (per screen — web + mobile)

- **Public profile page** (`[username]` on web) — avatar, cover image, bio, industry badge,
  connections count, links list, social icons, video embeds, QR code button, share button
- **Profile editor** — edit name, bio, avatar, cover image, slug, industry tag
- **Link manager** — add/edit/delete/reorder links, link type selector (URL, email, phone, social,
  file)
- **Social links section** — preset social platform connections (Instagram, YouTube, TikTok,
  Twitter, Facebook)
- **Video embed manager** — add YouTube/Instagram Reels/TikTok embeds, reorder, preview
- **Profile preview** — mobile view preview before publishing
- **Share profile** — copy link, share to WhatsApp, QR code display
- **Business details section** (visible when Business mode) — business name, logo, location,
  category, contact

**Requirements**: PROF-01 through PROF-15, MOB-09

---

### Phase 5 — Account & Settings Screens

**Status**: ⬜ Not started **Depends on**: Phase 2 **Goal**: Account management, settings, business
mode activation.

#### Deliverables (per screen — web + mobile)

- **Account settings** — name, email, phone, avatar, bio
- **Settings screen** — default landing screen toggle, location preferences (precise/city/off),
  industry tag change, notification preferences
- **Business mode activation** — full-screen upgrade moment (value prop, one-tap unlock) + Settings
  toggle
- **Avatar dropdown / bottom sheet** — current user name, mode badge (Normal/Business), quick links
  (Edit Profile, Settings, Switch to Business, Logout)
- **Dashboard screen** (Business mode only — hidden for Normal) — cards/summary view for orders,
  bookings, CRM, analytics (all mock data)

**Requirements**: ACC-01 through ACC-08, MOB-10, AUTH-12

---

### Phase 6 — Commerce & Booking Screens

**Status**: ⬜ Not started **Depends on**: Phase 4 **Goal**: Product/service catalogue, cart,
checkout, order management, booking flow.

#### Deliverables (per screen — web + mobile)

- **Catalogue view** (on profile) — product grid + service list, category tabs
- **Product detail** — photos, description, price, stock, "Add to Cart" button
- **Service detail** — description, duration, price, "Book Now" button
- **Add/edit product** — form with name, photos (camera upload on mobile), description, price,
  stock, category
- **Add/edit service** — form with name, description, duration, price, availability slots
- **Cart** — line items, quantity, total, checkout button
- **Checkout** — payment method selection (UPI, card, net banking), order summary, confirm
- **Booking flow** — slot picker (available time slots), booking confirmation screen
- **Order tracking** — order status timeline (pending → confirmed → shipped → delivered)
- **Seller order management** — order list, status update actions (confirm, ship, deliver, cancel)
- **Seller booking management** — booking list, confirm/reschedule/cancel
- **Availability manager** — working hours setup, slot configuration

**Requirements**: COM-01 through COM-10, BOOK-01 through BOOK-10, PAY-01 through PAY-05

---

### Phase 7 — Connections, CRM & Social Screens

**Status**: ⬜ Not started **Depends on**: Phase 4 **Goal**: Connection management, CRM dashboard,
referrals.

#### Deliverables (per screen — web + mobile)

- **Connection request** — send button on profile, pending/accepted indicator
- **Connections list** — list of mutual connections with profile cards
- **Connection requests inbox** — accept/decline UI
- **CRM dashboard** (Business mode) — customer list, lead tracking, order/booking history per
  customer
- **Bookmarks** — saved profiles/businesses list
- **Referral screen** — unique referral link, share to WhatsApp, performance stats (count,
  conversions)

**Requirements**: CONN-01 through CONN-05, CRM-01 through CRM-05, REF-01 through REF-05, DISC-12

---

### Phase 8 — Ratings, Notifications & Analytics Screens

**Status**: ⬜ Not started **Depends on**: Phase 6 **Goal**: Review system UI, notification centre,
analytics dashboards.

#### Deliverables (per screen — web + mobile)

- **Review form** — star rating + text review (post-transaction)
- **Reviews list on profile** — star rating, verified badge, business response
- **Business review response** — reply form
- **Notification centre** — push notification list, deep link to relevant screen
- **Notification preferences** — opt in/out per type
- **Analytics dashboard** (all users) — profile views, link clicks over time
- **Business analytics** — sales, revenue, top products, discovery impressions, booking stats,
  earnings
- **Trust score display** — on profile alongside star rating

**Requirements**: RAT-01 through RAT-06, NOT-01 through NOT-05, AN-01 through AN-05, MON-03

---

### Phase 9 — Admin Panel Screens

**Status**: ⬜ Not started **Depends on**: Phase 1 **Goal**: Internal admin panel — user management,
moderation, platform analytics.

#### Deliverables (web only — admin app)

- **Admin login** — separate auth flow
- **User listing** — table with search, filter by mode (Normal/Business), status
- **User detail** — profile view, links, account status, mode, industry
- **Business verification** — verify button → trust badge
- **Review moderation** — flagged reviews list, remove action
- **Platform analytics dashboard** — total users, active profiles, GMV, bookings, referral
  conversions
- **Feature flags** — toggle management UI

**Requirements**: ADM-01 through ADM-06

---

## PART 2 — Backend

> **After ALL UI screens are built**, implement backend in this order. Each phase wires real APIs
> behind the existing UI.

---

### Phase 10 — Database Schema & Foundation

**Status**: ⬜ Not started **Depends on**: Part 1 complete **Goal**: Prisma schema, migrations, seed
data, Redis, config validation, CORS fix.

#### Deliverables

- Prisma schema — all models: account (mode, industry, default_landing_screen), catalogue_item
  (type: product|service), booking, order, connection, review, referral, video_embed, notification,
  bookmark, profile, link
- PostGIS extension enabled
- Initial migration + seed script
- RedisService fully implemented
- Better Auth wired with Prisma adapter
- CORS fixed — env-driven allowed origins
- Config modules validated at startup (fail-fast)

**Requirements**: F-01 through F-07

---

### Phase 11 — Auth & Account Backend

**Status**: ⬜ Not started **Depends on**: Phase 10 **Goal**: Wire real auth behind the UI — OTP,
OAuth, JWT, anonymous sessions, account mode gates.

#### Deliverables

- AuthModule — OTP send/verify, Google OAuth, Apple Sign-In, JWT issue/refresh/revoke
- Anonymous guest sessions — guest token on app open, convert to full on login
- Gated action middleware — 401 `login_required` with pending_action
- Passport JWT strategy, `@Public()` decorator
- AccountModule — mode activation (one-time Business), industry tag CRUD, settings
- Business mode gate middleware — 403 `business_mode_required`
- Connect web + mobile auth screens to real API

**Requirements**: AUTH-01 through AUTH-08, ACC-01 through ACC-08

---

### Phase 12 — Profile & Connections Backend

**Status**: ⬜ Not started **Depends on**: Phase 11 **Goal**: Wire profile CRUD, link management,
video embeds, connections behind existing UI.

#### Deliverables

- ProfileModule — slug management, profile CRUD, social links, video embeds, QR code generation,
  preview
- Link management API — CRUD, reorder
- R2 pre-signed URL upload flow + imgproxy integration
- Public profile API — `GET /api/v1/p/:username`
- ConnectionsModule — request/accept/decline, CRM lead sync
- Analytics — profile view tracking, link click tracking
- Connect web + mobile profile/connection screens to real API

**Requirements**: PROF-01 through PROF-15, CONN-01 through CONN-05, AN-01, AN-02

---

### Phase 13 — Discovery & Search Backend

**Status**: ⬜ Not started **Depends on**: Phase 12 **Goal**: Wire discovery, search, bookmarks
behind existing UI.

#### Deliverables

- DiscoveryModule — PostGIS geo queries, Meilisearch sync (via Redis Streams), combined search
- Location update endpoint
- Discovery feed API, search API with category filter
- Bookmarks API — CRUD
- Connect web + mobile discovery screens to real API

**Requirements**: DISC-01 through DISC-15

---

### Phase 14 — Commerce, Booking & Payments Backend

**Status**: ⬜ Not started **Depends on**: Phase 11, Phase 12 **Goal**: Wire commerce, booking,
payments behind existing UI.

#### Deliverables

- CommerceModule — product catalogue CRUD, cart, checkout, order state machine
- BookingModule — service catalogue, slot management, double-booking prevention, booking lifecycle
- PaymentsModule — Razorpay Route integration, splits, payouts, refunds, webhooks
- Unified `GET /api/v1/orders` endpoint (merges products + bookings)
- NotificationsModule — FCM push, Firebase Dynamic Links, preferences, Redis Streams dispatch
- Connect all commerce/booking/payment screens to real API

**Requirements**: COM-01 through COM-11, BOOK-01 through BOOK-10, PAY-01 through PAY-06, NOT-01
through NOT-05

---

### Phase 15 — Ratings, Referral, CRM & Admin Backend

**Status**: ⬜ Not started **Depends on**: Phase 14 **Goal**: Wire remaining features behind
existing UI.

#### Deliverables

- RatingsModule — review eligibility (completed transaction), review CRUD, trust score, business
  response, moderation
- ReferralModule — referral link generation, signup tracking, double-sided reward dispatch
- CRMModule — customer records, lead tracking, export
- AnalyticsModule — shop metrics, discovery metrics, booking analytics
- AdminModule — user management, verification, moderation, platform analytics, feature flags
- Connect all remaining screens to real API

**Requirements**: RAT-01 through RAT-06, REF-01 through REF-05, CRM-01 through CRM-05, AN-03 through
AN-05, MON-01 through MON-03, ADM-01 through ADM-06

---

### Phase 16 — Infrastructure, CI/CD & Polish

**Status**: ⬜ Not started **Depends on**: Phase 10 **Goal**: CI pipelines, observability,
production readiness.

#### Deliverables

- GitHub Actions CI for web, admin, mobile
- Pino structured logging in NestJS
- Sentry/OpenTelemetry error tracking
- Swagger docs current with endpoints
- Dockerfile validated
- Grafana + Loki setup
- Unit tests for core services (Auth, Account, Profile, Commerce, Booking, Payments)
- E2E tests for critical flows

**Requirements**: F-08 through F-11, Testing requirements from PRD

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

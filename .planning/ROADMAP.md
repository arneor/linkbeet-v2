# LinkBeet v2 — ROADMAP.md

_Milestone: 1.0 — Phase 2 Core Build | PRD: v2.3 | Target: July 2026 Soft Launch_

---

## Milestone Goal

Deliver a fully functional hyperlocal community commerce platform — anonymous-first discovery,
bio-link profiles, Normal/Business mode commerce, bookings, payments, CRM, ratings, referrals,
notifications, and a complete mobile + web + admin experience.

---

## Phase 1 — Foundation & Database Schema

**Status**: ⬜ Not started **Goal**: Define all data models, wire database + Redis + auth properly,
fix infrastructure gaps.

### Deliverables

- Prisma schema with ALL core models per PRD v2.3:
  - `account` (mode: normal|business, industry tag, default_landing_screen, onboarding_completed)
  - `catalogue_item` (type: product|service, account_id, name, photos JSONB, price, stock_quantity,
    duration_minutes, category)
  - `booking` (service catalogue_item_id, slot datetime, status lifecycle, reminder_sent)
  - `order` (product catalogue_item_id, cart JSONB, payment_id, fulfilment status)
  - `connection` (requester_id, recipient_id, status: pending|accepted|declined)
  - `review` (booking_id OR order_id, star_rating, text, business_response, verified boolean)
  - `referral` (referrer_account_id, referred_account_id, status: pending|converted,
    reward_dispatched)
  - `video_embed` (account_id, platform: youtube|instagram|tiktok, url, display_order)
  - `notification`, `bookmark`, profile, link tables
- PostGIS extension enabled (`CREATE EXTENSION postgis; CREATE EXTENSION postgis_topology;`)
- Initial database migration
- Dev seed script with realistic data (users, profiles, products, services, bookings, orders)
- RedisService fully implemented (connection lifecycle, cache, pub/sub, Streams helpers)
- Better Auth wired with Prisma adapter in `api/` + `web/`
- CORS fixed — env-driven allowed origins list
- All config modules validated at startup (fail-fast on missing required vars)

**Requirements**: F-01 through F-07

---

## Phase 2 — Auth Module & Account System

**Status**: ⬜ Not started **Depends on**: Phase 1 **Goal**: Full authentication — OTP, OAuth, JWT,
anonymous sessions, account mode management.

### Deliverables

- `AuthController`/`AuthService` — endpoints:
  - `POST /api/v1/auth/otp/send` — send OTP to phone
  - `POST /api/v1/auth/otp/verify` — verify OTP → issue JWT
  - `POST /api/v1/auth/google` — Google OAuth callback
  - `POST /api/v1/auth/apple` — Apple Sign-In callback
  - `POST /api/v1/auth/refresh` — refresh token rotation
  - `POST /api/v1/auth/logout` — revoke tokens
  - `GET /api/v1/auth/session` — current session info
- Anonymous guest sessions — guest token on app open, converted to full session on login
- Gated action middleware — returns 401 `reason: "login_required"` with `pending_action` field for
  client redirect
- Passport JWT strategy (`jwt.strategy.ts`)
- `@Public()` decorator working correctly
- `AccountModule` — CRUD, mode management:
  - `PATCH /api/v1/account/mode` — one-time activate Business mode (permanent)
  - `PATCH /api/v1/account/industry` — set/change/remove industry tag
  - `PATCH /api/v1/account/settings` — default_landing_screen, preferences
- Business mode backend gate middleware — 403 `reason: "business_mode_required"` on seller/provider
  endpoints
- Better Auth session check in web middleware
- Mobile: expo-secure-store token management

**Requirements**: AUTH-01 through AUTH-08, ACC-01 through ACC-08

---

## Phase 3 — Profile System & Connections

**Status**: ⬜ Not started **Depends on**: Phase 2 **Goal**: Users can create and manage their
bio-link profile, add video embeds, and build connections.

### Deliverables

- `ProfileController`/`ProfileService`:
  - Slug management — unique, URL-safe, case-insensitive
  - Display name, bio, avatar, cover image, business details
  - Social media preset links (Instagram, YouTube, TikTok, Twitter, Facebook)
- Link management — CRUD, reorder, types (URL, email, phone, social, file)
- Video embed management — YouTube, Instagram Reels, TikTok — CRUD, reorder, URL validation
- QR code generation for profile URL
- Profile preview endpoint (render as mobile view)
- Public profile read API — `GET /api/v1/p/:username` (public, no auth required)
- Web: `[username]` page renders public profile from API with SEO meta tags
- Web: dashboard → profile editor UI (links, bio, socials, video embeds)
- R2 pre-signed URL upload flow (client → R2 → NestJS records reference)
- imgproxy integration for avatar/cover/product images
- Connection system:
  - `POST /api/v1/connections/request` — send connection request
  - `PATCH /api/v1/connections/:id` — accept/decline
  - `GET /api/v1/connections` — list connections
  - Connection count on profile
  - For Business users: accepted connections → CRM lead sync with source `connection`
- Analytics stubs — increment view count on profile visit, click count on link follow

**Requirements**: PROF-01 through PROF-15, CONN-01 through CONN-05, AN-01, AN-02

---

## Phase 4 — Discovery & Search

**Status**: ⬜ Not started **Depends on**: Phase 3 **Goal**: Anonymous-first hyperlocal discovery —
geo search, text search, bookmarks.

### Deliverables

- Discovery accessible to anonymous users (no auth required)
- Clean search-bar home screen (AI-feel, minimal, Perplexity-style)
- Discover feed — city-level content by default, upgrades to hyperlocal on location grant
- Near Me — location permission prompt, radius-based results
- `PATCH /api/v1/account/location` — stores PostGIS point
- `DiscoveryService`:
  - PostGIS `ST_DWithin()` radius queries (default 5km, max 50km)
  - Distance calculation from user to each result
  - Meilisearch indexing — profile documents synced via Redis Streams on create/update
  - Combined search: PostGIS geo filter → Meilisearch text ranking → merged result
- `GET /api/v1/discovery/feed` — geo-paginated nearby profiles
- `GET /api/v1/discovery/search?q=&lat=&lng=&category=` — full-text + geo + category filter
- Industry tag category filter in search results
- Bookmarks:
  - `POST /api/v1/bookmarks` — bookmark profile/business (gated — login required)
  - `GET /api/v1/bookmarks` — list bookmarks
  - `DELETE /api/v1/bookmarks/:id`
- Infinite scroll pagination

**Requirements**: DISC-01 through DISC-15

---

## Phase 5 — Mobile App Foundation

**Status**: ⬜ Not started **Depends on**: Phase 3 **Goal**: Mobile app is fully functional
end-to-end — onboarding, auth, profile, discovery, sidebar nav.

### Deliverables

- **Navigation**: Sidebar drawer (hamburger menu, NOT bottom tabs) — ChatGPT/Perplexity pattern
  - Sidebar contents: Discover, Near Me, My Bio, Dashboard (Business only), Bookmarks, Connections,
    Settings, Login/Signup
  - Avatar dropdown (top right) — account info, mode badge, quick links
  - Contextual FAB (bottom right) per screen
- Onboarding slides (first install only, `onboarding_completed` in local storage)
- Auth flow: splash → onboarding → login/signup (skippable) → industry selection (optional) → bio
  setup (skippable) → Discovery
- Anonymous mode — browse discovery without login
- Contextual login prompt on gated actions (with pending action redirect)
- Token storage (expo-secure-store) + refresh flow
- API client setup (TanStack Query + Zustand auth store)
- Profile view/edit screen
- Discovery feed screen with floating search input
- Account/settings screen (default screen override, industry tag, mode management)
- Push notification permissions prompt
- Auto location for nearby search

**Requirements**: MOB-01 through MOB-10, MOB-13, MOB-16 through MOB-18, AUTH-09 through AUTH-12

---

## Phase 6 — Admin Panel, Ratings, Referrals, Notifications

**Status**: ⬜ Not started **Depends on**: Phase 3 (Ratings/Referrals), Phase 2 (Admin) **Goal**:
Admin tools, verified reviews, referral program, push notifications.

### Deliverables

- **Admin Panel**:
  - Admin auth — JWT with ADMIN/SUPER_ADMIN role check
  - User listing with search, filter by mode (Normal/Business)
  - User detail view (profile, links, account status)
  - Manual business verification → trust badge
  - Review moderation (flag + remove)
  - Platform analytics dashboard (users, profiles, GMV, bookings, referral conversions)
- **Ratings & Reviews**:
  - Review eligibility check — must have completed booking OR order
  - Star rating + written review CRUD
  - "Verified buyer" badge on reviews
  - Business owner public response
  - Trust score computation alongside star rating
  - Notification on new review
- **Referral System**:
  - Unique referral link generation per account
  - Signup tracking / attribution
  - Double-sided reward: referrer + referred each get 1 month free Business mode
  - Referral performance dashboard (count, conversions)
  - WhatsApp direct share for referral link
- **Notifications**:
  - FCM push (mobile) for bookings, orders, reviews, connections, offers
  - Firebase Dynamic Links for WhatsApp deep linking (app install)
  - Deep linking — tap notification → relevant screen
  - Dispatch via Redis Streams events
- **Mobile additions**:
  - QR code scanner (camera) to open business profiles
  - Share bio link to WhatsApp with Firebase Dynamic Links
- **Profile themes** (basic 3+ themes)

**Requirements**: ADM-01 through ADM-05, RAT-01 through RAT-06, REF-01 through REF-05, NOT-01,
NOT-04, NOT-05, MOB-11, MOB-14, PROF-13, DISC-10, DISC-11

---

## Phase 7 — Infrastructure & CI/CD

**Status**: ⬜ Not started **Depends on**: Phase 1 **Goal**: All CI pipelines running, observability
wired, production-ready config.

### Deliverables

- GitHub Actions workflow for `web/` (lint + build on push)
- GitHub Actions workflow for `admin/` (lint + build on push)
- GitHub Actions workflow for `mobile/` (lint)
- Pino logger module added to NestJS AppModule (structured logs with request ID)
- Sentry/OpenTelemetry `instrument.ts` ported to monolith entry
- API Dockerfile validated — local `docker build` succeeds
- Swagger docs current with actual implemented endpoints
- Grafana + Loki setup docs

**Requirements**: F-08 through F-11

---

## Phase 8 — Commerce & Payments & Booking

**Status**: ⬜ Not started **Depends on**: Phase 2, Phase 3, Phase 6 (notifications) **Goal**:
Business users can list products/services, accept orders/bookings, and receive payments.

### Deliverables

- **Commerce (Products)**:
  - Product catalogue CRUD — name, photos (R2 upload from camera/gallery), description, price,
    stock, category
  - Cart + checkout flow — in-profile purchase UX
  - Order placement + confirmation notification
  - Order state machine (pending → confirmed → shipped → delivered → cancelled)
  - Seller order management dashboard
- **Booking (Services)**:
  - Service catalogue CRUD — name, description, duration, price
  - Availability slot + working hours management
  - Customer booking flow — slot selection → confirmation
  - Double-booking prevention
  - Booking confirm/reschedule/cancel from dashboard
  - Pre-booking reminder notification
  - Customer cancel/reschedule within window
- **Payments**:
  - Razorpay order creation
  - Payment verification via webhook
  - Razorpay Route — platform 2-5% commission auto-split to seller
  - Payout trigger on order/booking completion
  - Refund flow from dashboard
  - All credentials in AWS Secrets Manager
- **Unified orders feed**: `GET /api/v1/orders` merges product orders + service bookings for
  frontend
- **Mobile**: commerce screens, booking screens, Razorpay payment UI, camera photo upload
- Business mode gate on all seller/provider endpoints

**Requirements**: COM-01 through COM-10, BOOK-01 through BOOK-10, PAY-01 through PAY-06, MOB-15

---

## Phase 9 — CRM, Monetization & Polish

**Status**: ⬜ Not started **Depends on**: Phase 8 **Goal**: Complete CRM tools, monetization
features, and platform polish.

### Deliverables

- **CRM**:
  - Customer list with order + booking history
  - Lead tracking — profile visitors, savers, connections as lead sources
  - Targeted messages/offers to customer list
  - Unified dashboard — bookings, orders, comms in one view
  - Customer data export (CSV)
- **Business Analytics**:
  - Shop performance — total sales, revenue, top products
  - Discovery metrics — impressions, profile visits, conversion rate
  - Booking analytics — total bookings, cancellation rate, peak times
  - Earnings dashboard — affiliate commissions, product sales, payouts
- **Monetization**:
  - Digital product sales (e-books, templates, presets)
  - Affiliate marketing — promote other users' products, earn commissions
  - Profile visibility boost in nearby search results
- **Polish**:
  - Web push notifications (desktop)
  - Notification preferences per type
  - Offline access on mobile (profile, saved, past orders)
  - Admin feature flags management

**Requirements**: CRM-01 through CRM-05, AN-03 through AN-05, MON-01 through MON-03, COM-11, NOT-02,
NOT-03, MOB-12, ADM-06

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

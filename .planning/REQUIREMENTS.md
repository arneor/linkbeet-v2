# LinkBeet v2 — REQUIREMENTS.md

_Milestone: 1 (Phase 2 Core Build) | PRD: v2.3 | Target: July 2026 Soft Launch_

---

## Scope Summary

This milestone delivers the full Phase 2 platform: anonymous-first discovery, bio-link profiles,
Normal/Business mode commerce, bookings, payments, CRM, ratings, referrals, and a functional mobile
app + admin panel. The monolith scaffold exists — this milestone implements all business logic.

---

## Foundation & Infrastructure

| ID   | Requirement                                                                                                                                  | Stories | Phase |
| ---- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----- |
| F-01 | Prisma schema — all core models (account, catalogue_item, booking, order, connection, review, referral, video_embed, notification, bookmark) | —       | 1     |
| F-02 | Database migrations created and runnable                                                                                                     | —       | 1     |
| F-03 | Seeder script with realistic dev data                                                                                                        | —       | 1     |
| F-04 | Better Auth wired with Prisma adapter — sessions in PostgreSQL                                                                               | —       | 1     |
| F-05 | CORS configured with env-driven allowed origins                                                                                              | —       | 1     |
| F-06 | Redis service implemented (connection lifecycle, cache helpers, pub/sub)                                                                     | —       | 1     |
| F-07 | Config modules validated at startup (fail-fast on missing required vars)                                                                     | —       | 1     |
| F-08 | Pino structured logging module in NestJS AppModule                                                                                           | —       | 7     |
| F-09 | Sentry/OpenTelemetry error tracking ported to monolith                                                                                       | —       | 7     |
| F-10 | GitHub Actions CI for web, admin, mobile (lint + build)                                                                                      | —       | 7     |
| F-11 | Swagger docs current with implemented endpoints                                                                                              | —       | 7     |

---

## Authentication & Onboarding

| ID      | Requirement                                                          | Stories           | Phase |
| ------- | -------------------------------------------------------------------- | ----------------- | ----- |
| AUTH-01 | Phone number + OTP signup/login                                      | 3, 9              | 2     |
| AUTH-02 | Google OAuth sign-in                                                 | 4                 | 2     |
| AUTH-03 | Apple Sign-In                                                        | 5                 | 2     |
| AUTH-04 | JWT access (15m) + refresh (7d, Redis-stored) token lifecycle        | —                 | 2     |
| AUTH-05 | Token refresh endpoint                                               | —                 | 2     |
| AUTH-06 | Logout with token revocation                                         | —                 | 2     |
| AUTH-07 | Anonymous guest sessions — guest token issued on app open            | 2, 11-17          | 2     |
| AUTH-08 | Contextual login prompt on gated action with pending action redirect | 14, 15            | 2     |
| AUTH-09 | Onboarding slides — first install only, never shown again, skippable | 1                 | 5     |
| AUTH-10 | Industry category selection during onboarding (optional, skippable)  | 6                 | 5     |
| AUTH-11 | Bio setup wizard after onboarding (skippable, completable later)     | 7, 8              | 5     |
| AUTH-12 | Smart app open default — Normal → Discovery, Business → Dashboard    | 3 (smart default) | 5     |
| AUTH-13 | Phone number recovery / re-authentication                            | 9                 | 4     |

---

## Account Management

| ID     | Requirement                                                                                       | Stories | Phase |
| ------ | ------------------------------------------------------------------------------------------------- | ------- | ----- |
| ACC-01 | Account mode field: `normal` \| `business` (default: normal)                                      | 33-37   | 2     |
| ACC-02 | Business mode contextual unlock (full-screen upgrade moment on business action)                   | 33, 34  | 2     |
| ACC-03 | Business mode manual unlock from Settings                                                         | 34      | 2     |
| ACC-04 | Business mode is one-time permanent — cannot be reverted                                          | 35      | 2     |
| ACC-05 | Business mode backend gate middleware — 403 `business_mode_required` on seller/provider endpoints | —       | 2     |
| ACC-06 | Industry tag CRUD — set, change, remove anytime                                                   | 6, 101  | 2     |
| ACC-07 | Default landing screen preference per account                                                     | 99      | 2     |
| ACC-08 | Account settings — name, email, phone, avatar, bio                                                | —       | 2     |
| ACC-09 | Account deletion / deactivation                                                                   | —       | 6     |

---

## Bio-Link Profile

| ID      | Requirement                                                                  | Stories | Phase |
| ------- | ---------------------------------------------------------------------------- | ------- | ----- |
| PROF-01 | Username/slug management (unique, URL-safe)                                  | 25      | 3     |
| PROF-02 | Display name and bio text                                                    | 25, 26  | 3     |
| PROF-03 | Avatar + cover image upload (R2 pre-signed URL + imgproxy)                   | 25, 26  | 3     |
| PROF-04 | Custom link CRUD — add, edit, delete, reorder unlimited links                | 28      | 3     |
| PROF-05 | Link types: URL, email, phone, social, file                                  | —       | 3     |
| PROF-06 | Social media preset links (Instagram, YouTube, TikTok, Twitter, Facebook)    | 29      | 3     |
| PROF-07 | Video embeds — YouTube, Instagram Reels, TikTok — embed, multiple, reorder   | 87-89   | 3     |
| PROF-08 | QR code generation for profile URL                                           | 31      | 3     |
| PROF-09 | Profile preview before publishing (mobile view)                              | 32      | 3     |
| PROF-10 | Public profile page rendering (`[username]` route on web)                    | 25, 30  | 3     |
| PROF-11 | Profile share — single URL works everywhere (WhatsApp, Instagram bio, email) | 30      | 3     |
| PROF-12 | Business details — business name, logo, location, category, contact          | 26      | 3     |
| PROF-13 | Profile themes (customisable design, colours, layout)                        | 27      | 6     |
| PROF-14 | SEO meta tags on public profile page                                         | —       | 3     |
| PROF-15 | Connection count displayed on profile                                        | 42      | 3     |

---

## Discovery & Search

| ID      | Requirement                                                                     | Stories    | Phase |
| ------- | ------------------------------------------------------------------------------- | ---------- | ----- |
| DISC-01 | Anonymous discovery — no login required to search/browse/view profiles          | 11-13      | 4     |
| DISC-02 | Clean search-bar-first home screen (AI-feel, minimal UI)                        | 18         | 4     |
| DISC-03 | Discover feed — city-level by default, upgrades to hyperlocal on location grant | 16, 17, 19 | 4     |
| DISC-04 | Near Me — location-gated, prompts for permission, radius-based results          | 17, 22     | 4     |
| DISC-05 | Full-text typo-tolerant search (Meilisearch)                                    | 20         | 4     |
| DISC-06 | Geo search — PostGIS `ST_DWithin()` radius queries (default 5km, max 50km)      | 22         | 4     |
| DISC-07 | Combined search — PostGIS geo filter → Meilisearch text ranking → merged result | —          | 4     |
| DISC-08 | Category filter by industry tag in search                                       | 21         | 4     |
| DISC-09 | Distance display from user to each result                                       | 22         | 4     |
| DISC-10 | Local mode vs online mode toggle                                                | 23         | 6     |
| DISC-11 | Verified rating + review count in search results                                | 24         | 6     |
| DISC-12 | Bookmarks — save profiles/businesses (logged-in users only, gated action)       | 14         | 4     |
| DISC-13 | Meilisearch indexing on profile create/update (via Redis Streams)               | —          | 4     |
| DISC-14 | Infinite scroll pagination                                                      | —          | 4     |
| DISC-15 | User location capture / update endpoint                                         | —          | 4     |

---

## Commerce (Business Mode — Seller)

| ID     | Requirement                                                                   | Stories | Phase |
| ------ | ----------------------------------------------------------------------------- | ------- | ----- |
| COM-01 | Product catalogue CRUD — name, photos, description, price, stock, category    | 43, 44  | 8     |
| COM-02 | Cart + checkout flow — add to cart, complete purchase without leaving profile | 45      | 8     |
| COM-03 | Payment at checkout — UPI, debit/credit card, net banking (Razorpay)          | 46      | 8     |
| COM-04 | Order confirmation notification                                               | 47      | 8     |
| COM-05 | Real-time order status tracking                                               | 48      | 8     |
| COM-06 | Seller order management — pending, confirmed, shipped, delivered, cancelled   | 50      | 8     |
| COM-07 | Seller instant notification on new order                                      | 49      | 8     |
| COM-08 | Auto-payout to seller bank via Razorpay Route (minus 2-5% commission)         | 51      | 8     |
| COM-09 | Refund from dashboard                                                         | 52      | 8     |
| COM-10 | Business mode gate — seller endpoints return 403 for Normal mode              | —       | 8     |
| COM-11 | Digital product sales (e-books, templates, presets)                           | 78      | 9     |

---

## Booking (Business Mode — Provider)

| ID      | Requirement                                                        | Stories | Phase |
| ------- | ------------------------------------------------------------------ | ------- | ----- |
| BOOK-01 | Service catalogue CRUD — name, description, duration, price        | 53      | 8     |
| BOOK-02 | Available time slot + working hours management                     | 54      | 8     |
| BOOK-03 | Double-booking prevention                                          | 55      | 8     |
| BOOK-04 | Customer slot selection + booking flow                             | 56      | 8     |
| BOOK-05 | Instant booking confirmation with details                          | 57      | 8     |
| BOOK-06 | Seller push notification for new bookings                          | 58      | 8     |
| BOOK-07 | Seller booking management — confirm, reschedule, cancel            | 59      | 8     |
| BOOK-08 | Pre-booking reminder notification                                  | 60      | 8     |
| BOOK-09 | Customer cancellation/reschedule within defined window             | 61      | 8     |
| BOOK-10 | Business mode gate — provider endpoints return 403 for Normal mode | —       | 8     |

---

## Payments

| ID     | Requirement                                                      | Stories | Phase |
| ------ | ---------------------------------------------------------------- | ------- | ----- |
| PAY-01 | Razorpay order creation                                          | —       | 8     |
| PAY-02 | Payment verification via webhook                                 | —       | 8     |
| PAY-03 | Razorpay Route — platform commission (2-5%) auto-split to seller | 51      | 8     |
| PAY-04 | Payout trigger on order/booking completion                       | —       | 8     |
| PAY-05 | Refund flow                                                      | 52      | 8     |
| PAY-06 | All payment credentials in AWS Secrets Manager                   | —       | 8     |

---

## Connections

| ID      | Requirement                                                   | Stories | Phase |
| ------- | ------------------------------------------------------------- | ------- | ----- |
| CONN-01 | Send connection request (any logged-in user)                  | 38      | 3     |
| CONN-02 | Accept / decline connection request                           | 39      | 3     |
| CONN-03 | Connection list visible on bio profile                        | 40      | 3     |
| CONN-04 | For Business users — connections appear in CRM as lead source | 41      | 3     |
| CONN-05 | Connection count on profile                                   | 42      | 3     |

---

## CRM & Business Tools

| ID     | Requirement                                             | Stories | Phase |
| ------ | ------------------------------------------------------- | ------- | ----- |
| CRM-01 | Customer list with order + booking history              | 68      | 9     |
| CRM-02 | Lead tracking — profile visitors, savers, connections   | 69      | 9     |
| CRM-03 | Targeted messages/offers to customer list               | 70      | 9     |
| CRM-04 | Unified dashboard — bookings, orders, comms in one view | 71      | 9     |
| CRM-05 | Customer data export                                    | 72      | 9     |

---

## Ratings & Reviews

| ID     | Requirement                                                               | Stories | Phase |
| ------ | ------------------------------------------------------------------------- | ------- | ----- |
| RAT-01 | Star rating + written review — only from users with completed transaction | 62, 63  | 6     |
| RAT-02 | "Verified buyer" badge on reviews                                         | 63      | 6     |
| RAT-03 | Business owner public response to reviews                                 | 64      | 6     |
| RAT-04 | Trust score alongside star rating                                         | 65      | 6     |
| RAT-05 | Notification on new review                                                | 66      | 6     |
| RAT-06 | Admin review moderation (flag + remove violating reviews)                 | 67      | 6     |

---

## Analytics & Insights

| ID    | Requirement                                                                       | Stories | Phase |
| ----- | --------------------------------------------------------------------------------- | ------- | ----- |
| AN-01 | Profile view tracking over time                                                   | 73      | 3     |
| AN-02 | Link click tracking per link                                                      | 74      | 3     |
| AN-03 | Shop performance dashboard — total sales, revenue, top products (Business mode)   | 75      | 9     |
| AN-04 | Discovery metrics — impressions, profile visits, conversion rate (Business mode)  | 76      | 9     |
| AN-05 | Booking analytics — total bookings, cancellation rate, peak times (Business mode) | 77      | 9     |

---

## Referral & Invites

| ID     | Requirement                                                              | Stories | Phase |
| ------ | ------------------------------------------------------------------------ | ------- | ----- |
| REF-01 | Unique referral link generation                                          | 82      | 6     |
| REF-02 | Referrer gets 1 month free Business mode on referral signup + activation | 83      | 6     |
| REF-03 | Referred user gets 1 month free Business mode                            | 84      | 6     |
| REF-04 | Referral performance tracking (count, conversions)                       | 85      | 6     |
| REF-05 | Share referral link via WhatsApp (direct share)                          | 86      | 6     |

---

## Monetization (Business Mode)

| ID     | Requirement                                                           | Stories | Phase |
| ------ | --------------------------------------------------------------------- | ------- | ----- |
| MON-01 | Affiliate marketing — promote other users' products, earn commissions | 79      | 9     |
| MON-02 | Profile visibility boost in nearby search results                     | 80      | 9     |
| MON-03 | Earnings dashboard — affiliate commissions, product sales, payouts    | 81      | 9     |

---

## Notifications

| ID     | Requirement                                                           | Stories | Phase |
| ------ | --------------------------------------------------------------------- | ------- | ----- |
| NOT-01 | FCM push on mobile for bookings, orders, reviews, connections, offers | 90      | 6     |
| NOT-02 | Web push notifications on desktop                                     | 91      | 9     |
| NOT-03 | Notification preferences — opt out per type                           | 92      | 9     |
| NOT-04 | Deep linking — tap notification → relevant screen in app              | 93      | 6     |
| NOT-05 | Notification dispatch via Redis Streams events                        | —       | 6     |

---

## Mobile App

| ID     | Requirement                                                          | Stories | Phase |
| ------ | -------------------------------------------------------------------- | ------- | ----- |
| MOB-01 | Onboarding slides (first install only, skippable)                    | 1       | 5     |
| MOB-02 | Login/register flow (skippable — anonymous mode)                     | 2-5     | 5     |
| MOB-03 | Industry selection + bio setup wizard                                | 6-8     | 5     |
| MOB-04 | Sidebar drawer navigation (hamburger menu) — NOT bottom tabs         | —       | 5     |
| MOB-05 | Avatar dropdown (top right) — account info, mode, quick links        | —       | 5     |
| MOB-06 | Contextual FAB per screen                                            | —       | 5     |
| MOB-07 | Discovery feed screen (anonymous accessible)                         | 11-13   | 5     |
| MOB-08 | Search with floating search bar                                      | 18      | 5     |
| MOB-09 | Profile view/edit screen                                             | 25-32   | 5     |
| MOB-10 | Account/settings screens                                             | 99-102  | 5     |
| MOB-11 | QR code scanner (camera) to open business profiles                   | 94      | 6     |
| MOB-12 | Offline access — profile, saved businesses, past orders              | 95      | 9     |
| MOB-13 | Auto location for nearby search                                      | 96      | 5     |
| MOB-14 | Share bio link to WhatsApp with Firebase Dynamic Links (app install) | 97      | 6     |
| MOB-15 | Product photo upload from camera                                     | 98      | 8     |
| MOB-16 | Expo Router tab layout with `/(tabs)` → sidebar drawer pattern       | —       | 5     |
| MOB-17 | Token storage (expo-secure-store) + refresh flow                     | —       | 5     |
| MOB-18 | API client (TanStack Query + Zustand auth store)                     | —       | 5     |

---

## Admin Panel

| ID     | Requirement                                                              | Stories | Phase |
| ------ | ------------------------------------------------------------------------ | ------- | ----- |
| ADM-01 | Admin authentication (JWT with ADMIN/SUPER_ADMIN role check)             | —       | 6     |
| ADM-02 | User listing with profile status + mode (Normal/Business)                | 103     | 6     |
| ADM-03 | Manual business verification → trust badge                               | 104     | 6     |
| ADM-04 | Review moderation (reported reviews)                                     | 105     | 6     |
| ADM-05 | Platform analytics dashboard (users, profiles, GMV, bookings, referrals) | 106     | 6     |
| ADM-06 | Feature flags management                                                 | 107     | 9     |

---

## Testing Requirements (per PRD)

| Module              | Test Type          | What to Test                                                                                           |
| ------------------- | ------------------ | ------------------------------------------------------------------------------------------------------ |
| AuthModule          | Unit + Integration | OTP flow, JWT issue/refresh/revoke, OAuth callback, anonymous session, post-login redirect             |
| AccountModule       | Unit + Integration | Business mode one-time activation, mode gate enforcement (403), industry tag CRUD                      |
| ProfileModule       | Unit + Integration | Slug uniqueness, theme CRUD, link ordering, video embed URL validation, QR code                        |
| ConnectionsModule   | Unit + Integration | Request/accept/decline, duplicate prevention, CRM lead sync on accept                                  |
| DiscoveryModule     | Unit + Integration | Geo radius queries, Meilisearch sync, anonymous access, city vs hyperlocal fallback                    |
| CommerceModule      | Unit + Integration | Cart calculations, order state machine, Business mode gate                                             |
| BookingModule       | Unit + Integration | Slot availability, double-booking prevention, booking state transitions, reminders, Business mode gate |
| PaymentsModule      | Integration        | Razorpay Route split, payout trigger, refund flow, webhook handling                                    |
| ReferralModule      | Unit + Integration | Link generation, signup attribution, duplicate prevention, reward dispatch                             |
| RatingsModule       | Unit               | Review eligibility (completed transaction only), trust score computation                               |
| NotificationsModule | Unit               | Event-to-notification mapping, preference filtering                                                    |

**Testing Principles:**

- Test at service layer, not controller
- Mock external services (Razorpay, FCM, Meilisearch) in unit tests — real instances in integration
- Every booking and payment flow needs happy path + failure mode integration tests
- Anonymous access middleware needs explicit tests for each gated action

---

## V2 — Future Milestones (Out of Scope)

| Item                                                      | Phase               |
| --------------------------------------------------------- | ------------------- |
| Pricing tier definition and enforcement                   | 3                   |
| ClickHouse analytics (OLAP, sales funnels, search trends) | 3                   |
| Product + Service combo catalogue type                    | 3                   |
| Private messaging between connections                     | 3                   |
| Native video upload (storage + transcoding)               | 3                   |
| International payments via Stripe                         | 3                   |
| Kafka MSK event bus upgrade                               | 4                   |
| AWS EKS / Kubernetes                                      | 4                   |
| Regional language search (Hindi, Tamil)                   | 4                   |
| Background location tracking                              | —                   |
| Live streaming                                            | —                   |
| Multi-vendor marketplace                                  | —                   |
| Subscription products (recurring billing)                 | —                   |
| Staff management (multiple team per account)              | —                   |
| Phase 1 data migration (MongoDB → PostgreSQL)             | Post-launch cutover |

---

## Pre-Build Checklist

- [ ] Run Lighthouse / PageSpeed audit on linkbeet.in — fix LCP before Phase 2 build
- [ ] Set up imgproxy pipeline for existing images
- [ ] Provision RDS PostgreSQL 16 + PostGIS in ap-south-1 via Terraform
- [ ] Enable PostGIS: `CREATE EXTENSION postgis; CREATE EXTENSION postgis_topology;`
- [ ] Set up AWS Secrets Manager for all credentials
- [ ] Docker Compose local dev ready (Postgres + PostGIS + Redis + Meilisearch + imgproxy + pgAdmin)
- [ ] Set up Grafana + Loki (observability from day 1)
- [ ] Set up staging environment (RDS db.t3.micro, ECS staging cluster)
- [ ] GitHub Actions CI/CD pipelines for all 4 surfaces

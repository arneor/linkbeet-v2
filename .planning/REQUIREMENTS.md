# LinkBeet v2 — REQUIREMENTS.md

_Milestone: 1 (Phase 2 Core Build) | Updated: April 2026_

---

## Scope Summary

This milestone covers the full Phase 2 implementation: turning the monolith scaffold into a
functioning platform. The Turborepo monorepo, NestJS module structure, and multi-surface codebase
are already in place. This milestone implements the actual business logic.

---

## V1 — Must Have (Phase 2)

### Foundation

| ID   | Requirement                                                                                                                                         | Phase   |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| F-01 | Prisma schema defined — all core models (User, Profile, Link, Connection, Product, Order, Booking, Payment, Wallet, Notification, Rating, Referral) | Phase 1 |
| F-02 | Database migrations created and runnable via `pnpm --filter api db:migrate`                                                                         | Phase 1 |
| F-03 | Seeder script (`api/prisma/seed.ts`) with sample data for development                                                                               | Phase 1 |
| F-04 | Better Auth fully wired with Prisma adapter — sessions stored in PostgreSQL                                                                         | Phase 2 |
| F-05 | CORS configured with real allowed origins from env var                                                                                              | Phase 2 |
| F-06 | Redis service implemented with connection lifecycle and typed helper methods                                                                        | Phase 1 |

### Authentication & Accounts

| ID   | Requirement                                            | Phase   |
| ---- | ------------------------------------------------------ | ------- |
| A-01 | User registration (email + password)                   | Phase 2 |
| A-02 | User login with JWT access + refresh tokens (15m / 7d) | Phase 2 |
| A-03 | Token refresh endpoint                                 | Phase 2 |
| A-04 | Logout (token revocation)                              | Phase 2 |
| A-05 | OTP-based phone number verification                    | Phase 3 |
| A-06 | Google OAuth sign-in                                   | Phase 3 |
| A-07 | Apple Sign-In                                          | Phase 3 |
| A-08 | Account mode selection (Normal / Business)             | Phase 2 |
| A-09 | Account settings (name, email, avatar, bio)            | Phase 2 |
| A-10 | Account deletion / deactivation                        | Phase 4 |

### Profile (Public Page)

| ID   | Requirement                                                   | Phase   |
| ---- | ------------------------------------------------------------- | ------- |
| P-01 | Username/slug management (unique, URL-safe)                   | Phase 2 |
| P-02 | Bio and display name                                          | Phase 2 |
| P-03 | Avatar + cover image upload (via R2 + imgproxy)               | Phase 3 |
| P-04 | Link CRUD — add, edit, delete, reorder links                  | Phase 2 |
| P-05 | Link types: URL, email, phone, social, file                   | Phase 2 |
| P-06 | Social media preset links (Instagram, Twitter, YouTube, etc.) | Phase 2 |
| P-07 | QR code generation for profile URL                            | Phase 3 |
| P-08 | Public profile page rendering (`[username]` route on web)     | Phase 2 |
| P-09 | Profile themes (at least 3 visual themes)                     | Phase 4 |
| P-10 | SEO meta tags on public profile page                          | Phase 2 |

### Discovery (Hyperlocal)

| ID   | Requirement                                      | Phase   |
| ---- | ------------------------------------------------ | ------- |
| D-01 | User location capture / update                   | Phase 2 |
| D-02 | Nearby users/businesses feed (PostGIS geo query) | Phase 2 |
| D-03 | Full-text search by name/username (Meilisearch)  | Phase 2 |
| D-04 | Geo-aware search (search near location)          | Phase 2 |
| D-05 | Category/tag filter in discovery                 | Phase 3 |
| D-06 | Infinite scroll pagination                       | Phase 2 |

### Commerce (Business Mode)

| ID   | Requirement                                                | Phase   |
| ---- | ---------------------------------------------------------- | ------- |
| C-01 | Catalogue: create/edit/delete products and services        | Phase 3 |
| C-02 | Product listing with price, description, images            | Phase 3 |
| C-03 | Order placement by customer                                | Phase 3 |
| C-04 | Order management (confirm, process, ship, deliver, cancel) | Phase 3 |
| C-05 | Order notifications to seller                              | Phase 3 |

### Bookings (Business Mode)

| ID   | Requirement                           | Phase   |
| ---- | ------------------------------------- | ------- |
| B-01 | Business sets available time slots    | Phase 3 |
| B-02 | Customer books appointment            | Phase 3 |
| B-03 | Booking confirmation/cancellation     | Phase 3 |
| B-04 | Booking reminders (push notification) | Phase 3 |

### Payments

| ID     | Requirement                                            | Phase   |
| ------ | ------------------------------------------------------ | ------- |
| PAY-01 | Razorpay order creation                                | Phase 3 |
| PAY-02 | Payment verification via webhook                       | Phase 3 |
| PAY-03 | Razorpay Route — platform commission (2–5%) auto-split | Phase 3 |
| PAY-04 | Wallet top-up                                          | Phase 4 |
| PAY-05 | Payout to seller bank account                          | Phase 4 |

### Analytics

| ID    | Requirement                                                           | Phase   |
| ----- | --------------------------------------------------------------------- | ------- |
| AN-01 | Link click tracking                                                   | Phase 2 |
| AN-02 | Profile view tracking                                                 | Phase 2 |
| AN-03 | Analytics dashboard on web/mobile (business mode)                     | Phase 3 |
| AN-04 | Analytics data retention per plan (7d FREE / 90d PRO / 365d BUSINESS) | Phase 3 |

### Connections

| ID    | Requirement                 | Phase   |
| ----- | --------------------------- | ------- |
| CN-01 | Send connection request     | Phase 3 |
| CN-02 | Accept / decline connection | Phase 3 |
| CN-03 | View connections list       | Phase 3 |

### Notifications

| ID   | Requirement                                 | Phase   |
| ---- | ------------------------------------------- | ------- |
| N-01 | Push notification delivery via Firebase FCM | Phase 3 |
| N-02 | In-app notification centre                  | Phase 3 |
| N-03 | Notification preferences per type           | Phase 4 |

### Mobile App

| ID   | Requirement                                     | Phase   |
| ---- | ----------------------------------------------- | ------- |
| M-01 | Auth flow — login / register screens            | Phase 2 |
| M-02 | Profile view/edit screen                        | Phase 2 |
| M-03 | Discovery feed screen                           | Phase 2 |
| M-04 | Public profile screen                           | Phase 2 |
| M-05 | Account/settings screens                        | Phase 2 |
| M-06 | Commerce screens (catalogue, orders)            | Phase 3 |
| M-07 | Booking screen                                  | Phase 3 |
| M-08 | Payment UI (Razorpay integration)               | Phase 3 |
| M-09 | Notifications screen                            | Phase 3 |
| M-10 | Expo Router tab navigation setup with `/(tabs)` | Phase 2 |

### Admin Panel

| ID     | Requirement                                    | Phase   |
| ------ | ---------------------------------------------- | ------- |
| ADM-01 | Admin authentication (separate from user auth) | Phase 2 |
| ADM-02 | User listing and search                        | Phase 2 |
| ADM-03 | User ban/unban, profile moderation             | Phase 3 |
| ADM-04 | Platform analytics dashboard                   | Phase 3 |

### Infrastructure & Quality

| ID     | Requirement                                        | Phase   |
| ------ | -------------------------------------------------- | ------- |
| INF-01 | GitHub Actions CI for web and admin (lint + build) | Phase 2 |
| INF-02 | GitHub Actions CI for mobile (lint)                | Phase 2 |
| INF-03 | Pino structured logging in NestJS API              | Phase 2 |
| INF-04 | Sentry/OpenTelemetry error tracking in API         | Phase 3 |
| INF-05 | Unit tests for core API services (auth, profile)   | Phase 3 |
| INF-06 | E2E tests for critical API flows                   | Phase 4 |

---

## V2 — Future Milestones

- Gamification (points, badges, leaderboards) — Phase 3
- In-app messaging (direct messages) — Phase 3
- Referral program — Phase 3/4
- CRM features (customer notes, tags) — Phase 3
- Custom domain support — PRO/BUSINESS feature
- Ratings and reviews — Phase 3
- React Native OTA updates (Expo Updates) — Phase 3

---

## Out of Scope (This Milestone)

| Item                                         | Reason                                        |
| -------------------------------------------- | --------------------------------------------- |
| Microservices migration                      | Phase 4 at 1M+ users — premature optimization |
| Stripe payments                              | India market = Razorpay only                  |
| Desktop/PWA app                              | Mobile-first; web is secondary                |
| Multi-language support (i18n)                | English first, i18n Phase 4                   |
| Gamification                                 | Phase 3 feature                               |
| In-app video calls                           | Too complex for Phase 2                       |
| Marketplace search outside profile discovery | Phase 4                                       |

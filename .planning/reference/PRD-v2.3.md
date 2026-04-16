# LinkBeet v2 — Phase 2 Product Requirements Document

**Version**: 3.0 **Date**: April 2026 **Status**: Ready for Development **Target Launch**: July 2026
(Soft Launch) **Previous Version**: 2.3 (April 2026)

---

## Problem Statement

Independent businesses, service providers, and creators in India lack a single platform that
converts their digital presence into real-world engagement and revenue. Existing bio-link tools
(Linktree, Beacons, Hopp) stop at link aggregation — they provide no local discovery, no transaction
capability, and no trust layer. Traditional local discovery platforms (Google Maps, Yelp) suffer
from fake reviews, high advertising costs, and poor conversion paths for small businesses.

Consumers searching for nearby services, offers, and products have no reliable, low-friction way to
discover, evaluate, and transact with local businesses — especially on 3G networks common across
India.

LinkBeet Phase 1 established a live MVP at linkbeet.in with basic bio-link and nearby discovery
features and 100–200 active customers. Phase 2 transforms this foundation into a full community
commerce platform: a hyperlocal discovery engine, a transactional marketplace, a creator
monetization ecosystem, and a verified trust system — all accessible from one bio link.

---

## Solution

LinkBeet v2 Phase 2 delivers a unified platform across web and mobile that allows any individual,
business, creator, or service provider to:

1. Discover nearby businesses, services, and offers anonymously — no login required
2. Build a rich, customisable bio-link profile as their single digital identity
3. Get discovered by nearby consumers through a hyperlocal search engine powered by geo-queries and
   typo-tolerant text search
4. Connect with other users through mutual LinkedIn-style connections
5. Operate in **Normal mode** by default — bio link, discovery, search, own bookings/purchases,
   analytics, connections
6. Unlock **Business mode** (one-time permanent) to sell products/services, manage orders, run CRM,
   publish offers, and receive payouts
7. Earn verified reviews only from users who have completed real transactions
8. Monetize through affiliate tools, platform-native commerce, and creator-specific revenue streams

The platform runs on a modular NestJS monolith backend, Next.js web surfaces (client + admin), and a
**Flutter mobile app** (iOS + Android — migrated from Expo React Native in Phase 3), all hosted on
AWS ECS (Mumbai), backed by PostgreSQL + PostGIS, Redis, Meilisearch, Firebase Cloud Messaging, and
Razorpay Route.

---

## User Flows

### 1. App Open & Onboarding Flow

```
App open
  ↓
Splash screen (2–3 sec, branding)
  ↓
Onboarding slides — first install only, never shown again (3–4 screens, value prop) — skippable
  ↓
Login / Signup screen — fully skippable
  ↓
  ├── Skipped → Discovery home screen (anonymous user)
  │
  └── Signed up / Logged in →
        ↓
        Industry / category selection (optional tag for discovery — Saloon, Restaurant, Creator, Store etc.)
        ↓
        Bio setup (name, photo, links — skippable, completable later)
        ↓
        Discovery home screen (Normal mode, logged in)
```

### 2. Anonymous User Flow

- User lands on Discovery screen with no login required
- Can freely search, browse nearby businesses, view profiles, and browse offers
- On attempting a transactional action (bookmark, book, buy, review, follow) → contextual login
  prompt appears
- After login, user returns to exactly where they were — no flow restart

### 3. Smart App Open Default (post-login)

| User state            | Default screen on app open       |
| --------------------- | -------------------------------- |
| Normal mode           | Discovery screen                 |
| Business mode enabled | Bio / Dashboard screen           |
| Any user              | Can override default in Settings |

### 4. Normal vs Business Mode

Every account starts in Normal mode. Business mode is a one-time permanent unlock.

**Normal mode features (all users, default):**

- Bio link profile
- Discovery + nearby search
- Own bookings (as a customer)
- Own purchases (as a customer)
- Analytics (profile views, link clicks)
- Connections (LinkedIn-style mutual)
- Offers browsing
- Reviews (leave a review)

**Business mode features (one-time unlock, permanent):**

- Everything in Normal mode, PLUS:
- Product catalogue (sell products)
- Service catalogue (accept bookings from others)
- Order management (receive + fulfil orders)
- CRM (customer list, leads, connections as leads)
- Offer publishing (create offers, not just browse)
- Payments + payouts via Razorpay Route
- Business analytics (sales, bookings, discovery impressions)
- Affiliate tools
- Profile boost / visibility promotion

**Business mode activation triggers:**

- Contextual: user attempts to add a product, create a service, or publish an offer → full-screen
  "Unlock Business Mode" moment with value prop → one confirm tap → permanently unlocked
- Manual: Settings → "Switch to Business Mode"
- Once enabled, cannot be reverted

### 5. Connections Flow

- Any logged-in user can send a connection request to any other user
- Connection is mutual — both users must accept
- Connection list visible on bio profile
- For Business mode users: connections appear in CRM as a lead source
- No private messaging in Phase 2

### 6. Catalogue Item Creation Flow

Any user (Normal or Business mode) can create catalogue items. User decides item type at creation:

```
Add item →
  ├── Product
  │     → Name, photos, price, category, stock quantity
  │     → Fulfilment: cart → checkout → order tracking
  │     → Requires Business mode to receive orders + payments
  │
  └── Service
        → Name, description, duration, price
        → Slot management: define working hours + availability
        → Fulfilment: slot selection → booking confirmation → reminder
        → Requires Business mode to receive bookings + payments
```

Note: Any user can browse and purchase products or book services. Only Business mode users can
receive orders and payments.

---

## Navigation Structure

No traditional bottom navigation bar. LinkBeet uses a modern contextual navigation pattern inspired
by ChatGPT and Perplexity — clean, minimal, surface-specific.

### Mobile Navigation Pattern

**Primary surface: full-screen content with a floating action bar at the bottom**

- The screen itself is the navigation — no persistent tab bar
- A **floating pill/bar at the bottom** (like Perplexity's search bar) serves as the primary
  interaction point on the Discovery screen
- Navigation to other surfaces happens via:
  - **Hamburger / sidebar menu** (top left) — accessed by swipe or tap, slides in a full-height
    drawer containing all navigation destinations
  - **Avatar / account button** (top right) — opens account switcher and profile access
  - **Contextual FAB** (floating action button, bottom right) — context-aware action for the current
    screen (e.g. "Add listing" on Dashboard, "New search" on Discover)

**Sidebar drawer contents (all users):**

- Discover
- Near Me
- My Bio / Profile
- Dashboard (Business mode only — hidden in Normal mode)
- Bookmarks
- Connections
- Settings
- Login / Signup (if anonymous)

**Header pattern (per screen):**

- Left: hamburger menu or back arrow
- Centre: search bar (on Discovery) or screen title
- Right: avatar (account switcher) + optional action icon (e.g. QR scanner, filter)

### Web Navigation Pattern

- **Left sidebar** (desktop) — persistent, collapsible, contains all navigation destinations —
  similar to ChatGPT's conversation sidebar
- **Top bar** (mobile web) — minimal, logo left, account avatar right, search centre
- No horizontal tab bars on web — navigation lives in the sidebar
- Active surface highlighted in sidebar with a subtle indicator

### Screen-Specific Navigation Behaviour

| Screen        | Mobile header                     | Primary interaction             | Contextual FAB          |
| ------------- | --------------------------------- | ------------------------------- | ----------------------- |
| Discovery     | Hamburger + search bar + avatar   | Floating search input at bottom | None                    |
| Near Me       | Back + "Near Me" title + filter   | Scrollable location feed        | None                    |
| Bio / Profile | Hamburger + profile name + share  | Bio content                     | Edit profile            |
| Dashboard     | Hamburger + "Dashboard" + account | Cards and lists                 | Add listing / New offer |
| Bookmarks     | Back + "Saved"                    | Saved list                      | None                    |
| Settings      | Back + "Settings"                 | List                            | None                    |

### Account Avatar (top right)

- Tapping avatar opens a bottom sheet (mobile) or dropdown (web)
- Shows current user name, industry tag, and mode (Normal / Business)
- Quick links: Edit Profile, Settings, Switch to Business Mode (if Normal), Logout

---

## Industry Tag

Industry is an optional tag selected during onboarding. It does NOT gate or restrict any features.
All features are available to all users regardless of industry.

**Purpose of industry tag:**

- Powers category filters in nearby search ("find saloons near me")
- Displays an industry badge on the bio profile ("Saloon", "Restaurant", "Creator" etc.)
- Improves Meilisearch indexing and discovery relevance
- Can be set, changed, or removed anytime in Settings

**Available industry tags:** Store, Restaurant / Food & Drink, Saloon / Beauty, Doctor / Health /
Wellness, Content Creator, Music / Creative, Events, Real Estate, Sport & Fitness, Education, Tech &
Gaming, Travel & Activities, Community, Business / Other

---

## User Stories

### Authentication & Onboarding

1. As a new user, I want to see onboarding slides only on my first install, so that subsequent app
   opens go straight to the relevant screen without interruption.
2. As a new user, I want to skip the login screen entirely and use the app anonymously, so that I
   can explore the platform before committing to an account.
3. As a new user, I want to sign up with my phone number and OTP, so that I can create an account
   without remembering a password.
4. As a new user, I want to sign up with Google, so that I can onboard quickly using my existing
   account.
5. As a new user, I want to sign up with Apple, so that I can create an account privately on my iOS
   device.
6. As a new user after signup, I want to optionally select my industry from a visual category grid
   (Saloon, Restaurant, Creator, Store etc.), so that my profile appears in the right search
   categories.
7. As a new user, I want to be guided through bio setup immediately after onboarding, so that I have
   a live profile within minutes.
8. As a new user, I want to skip bio setup and complete it later, so that I can explore the platform
   first without being blocked.
9. As any user, I want to reset my phone number or re-authenticate if I lose access, so that I never
   get permanently locked out.

### Anonymous Discovery

11. As an anonymous user, I want to search for nearby businesses and services without logging in, so
    that I can explore the platform before creating an account.
12. As an anonymous user, I want to view any business profile and bio page without logging in, so
    that I can evaluate a business before deciding to transact.
13. As an anonymous user, I want to browse nearby offers and the Discover feed without logging in,
    so that I get full value from the platform immediately.
14. As an anonymous user attempting to bookmark a business, I want a contextual login prompt to
    appear, so that I understand why login is needed and can complete the action after signing in.
15. As an anonymous user attempting to book or buy, I want a contextual login prompt that returns me
    to exactly where I was after login, so that the transaction flow is not interrupted.
16. As an anonymous user in a city, I want to see city-level discovery content (top businesses,
    trending offers in my city) without granting precise location, so that I get relevant content
    immediately.
17. As any user who grants location permission, I want the Discover feed and Near Me tab to upgrade
    to hyperlocal results within my precise radius, so that I see what is actually near me.

### Search & Discover

18. As any user, I want the home screen to feel like a clean, AI-powered search experience with a
    single prominent search bar, so that finding what I need feels instant and modern.
19. As any user, I want a dedicated Discover page showing an ongoing feed of nearby businesses,
    trending offers, new listings, and curated local content, so that I can browse without a
    specific search intent.
20. As a consumer, I want search results to be typo-tolerant so that misspellings still return
    relevant results, so that I don't have to type perfectly on a mobile keyboard.
21. As a consumer, I want to filter nearby search results by category (e.g. food, repairs, beauty,
    fitness), so that I can narrow results quickly.
22. As a consumer, I want to see the distance from my location to each business in search results,
    so that I can choose the most convenient option.
23. As a consumer, I want to switch between local mode (nearby) and online mode (global), so that I
    can discover businesses outside my immediate area.
24. As a consumer, I want to see a business's verified rating and review count in search results, so
    that I can evaluate trustworthiness before clicking.

### Bio-Link Profile

25. As any user, I want to create a free bio-link profile with my name, photo, and social links, so
    that I have a single shareable URL for all my online presence.
26. As a business owner, I want to add my business name, logo, location, category, and contact
    details to my profile, so that customers can find and contact me.
27. As a creator, I want to customise the design and layout of my bio page with themes and colours,
    so that my profile reflects my personal brand.
28. As any user, I want to add unlimited custom links to my bio page, so that I can direct visitors
    to any external content.
29. As any user, I want to connect my Instagram, YouTube, TikTok, Twitter, and Facebook profiles to
    my bio page, so that visitors can find all my social channels in one place.
30. As any user, I want to share my bio-link as a single URL that works everywhere — Instagram bio,
    WhatsApp, email — so that I never have to update multiple places.
31. As a business owner, I want my bio profile to include a QR code that customers can scan in
    person to open my profile, so that offline customers can discover me digitally.
32. As any user, I want to preview how my bio page looks on mobile before publishing, so that I can
    ensure it looks correct for my audience.

### Business Mode

33. As a Normal mode user attempting to add a product or service, I want a contextual full-screen
    prompt explaining Business mode, so that I understand what unlocking it gives me before I
    commit.
34. As a Normal mode user, I want to unlock Business mode in one tap from the contextual prompt or
    from Settings, so that I can start selling immediately.
35. As a user, I want Business mode to be a one-time permanent unlock, so that I never have to
    re-enable it and my business data is always accessible.
36. As a Business mode user, I want to see my full dashboard — orders, bookings, CRM, analytics,
    payouts — always visible, so that I can manage my business at a glance.
37. As a Business mode user, I want my app to default to the Bio/Dashboard screen on open, so that I
    land on my business hub immediately.

### Connections

38. As any logged-in user, I want to send a connection request to any other LinkBeet user, so that I
    can build my professional network.
39. As any logged-in user, I want to accept or decline incoming connection requests, so that I
    control who is in my network.
40. As any user, I want to see my connection list on my bio profile, so that visitors can see my
    network.
41. As a Business mode user, I want my connections to appear in my CRM as a lead source, so that I
    can follow up with people already in my network.
42. As any user, I want to see a user's connection count on their bio profile, so that I can gauge
    their network presence.

### Product Catalogue & E-Commerce

43. As any Business mode user, I want to add products to my catalogue with name, photos,
    description, price, and stock quantity, so that customers can browse and buy directly from my
    profile.
44. As any Business mode user, I want to organise products into categories, so that customers can
    navigate my catalogue easily.
45. As any logged-in user, I want to add products to a cart and complete checkout in one flow
    without leaving the profile, so that the purchase experience is fast and frictionless.
46. As any user, I want to pay via UPI, debit/credit card, or net banking at checkout, so that I can
    use my preferred payment method.
47. As any user, I want to receive an order confirmation immediately after purchase, so that I know
    my order is placed.
48. As any user, I want to track my order status in real time, so that I always know where my order
    is.
49. As a Business mode user, I want to receive instant notifications when a new order is placed, so
    that I can fulfil it promptly.
50. As a Business mode user, I want to manage order statuses (pending, confirmed, shipped,
    delivered, cancelled) from my dashboard, so that I can keep customers informed.
51. As a Business mode user, I want payouts from sales automatically transferred to my bank account
    via Razorpay Route after platform commission is deducted, so that I receive revenue without
    manual reconciliation.
52. As a Business mode user, I want to issue refunds from my dashboard, so that I can resolve
    disputes quickly.

### Service Booking

53. As any Business mode user, I want to add services to my catalogue with name, description,
    duration, and price, so that customers know exactly what I offer.
54. As any Business mode user, I want to define my available time slots and working hours, so that
    customers can only book times when I am available.
55. As any Business mode user, I want the system to prevent double-booking automatically, so that I
    never have two customers booked for the same slot.
56. As any logged-in user, I want to view a service provider's real-time availability and book a
    slot in a single flow, so that I can secure an appointment without calling.
57. As any logged-in user, I want to receive an instant booking confirmation with date, time, and
    service details, so that I have a record of my appointment.
58. As a Business mode user, I want to receive instant push notifications for new bookings, so that
    I can prepare in advance.
59. As a Business mode user, I want to confirm, reschedule, or cancel bookings from my dashboard, so
    that I have full control over my schedule.
60. As any logged-in user, I want to receive a reminder notification before my booking, so that I
    don't forget my appointment.
61. As any logged-in user, I want to cancel or reschedule a booking within a defined window, so that
    I can manage changes to my plans.

### Ratings & Reviews

62. As any logged-in user who completed a purchase or booking, I want to leave a star rating and
    written review, so that I can share my experience with others.
63. As any user, I want to see clearly that reviews are from verified buyers only, so that I can
    trust the ratings are genuine.
64. As a Business mode user, I want to respond to reviews publicly, so that I can address feedback
    and show I care about customer experience.
65. As any user, I want to see a profile's overall trust score alongside their star rating, so that
    I get a richer sense of reliability.
66. As a Business mode user, I want to receive a notification when a new review is posted, so that I
    can respond promptly.
67. As a platform admin, I want to flag and remove reviews that violate community guidelines, so
    that the review ecosystem stays trustworthy.

### CRM & Business Tools

68. As a Business mode user, I want to see a list of all my customers with their order and booking
    history, so that I can understand my customer base.
69. As a Business mode user, I want to track leads — people who visited my profile, saved my
    business, or connected with me — so that I can follow up and convert them.
70. As a Business mode user, I want to send targeted messages or offers to my customer list, so that
    I can drive repeat business.
71. As a Business mode user, I want to manage bookings, orders, and customer communications from a
    single dashboard, so that I don't need multiple tools.
72. As a Business mode user, I want to export my customer data, so that I retain ownership of my
    audience.

### Analytics & Insights

73. As any logged-in user, I want to see how many people visited my bio profile over time, so that I
    can track my growth.
74. As any logged-in user, I want to see which links on my bio page get the most clicks, so that I
    can optimise my profile for engagement.
75. As a Business mode user, I want to see my shop performance — total sales, revenue, top products
    — in a dashboard, so that I can make informed decisions.
76. As a Business mode user, I want to see my search discovery metrics — impressions, profile
    visits, conversion rate — so that I can measure my local visibility.
77. As a Business mode user, I want to see booking analytics — total bookings, cancellation rate,
    peak booking times — so that I can manage my capacity.

### Monetization

78. As any Business mode user, I want to sell digital products (e-books, templates, presets)
    directly from my bio profile, so that I can monetize my audience without a separate storefront.
79. As any Business mode user, I want to participate in affiliate marketing by promoting other
    LinkBeet users' products, so that I can earn commissions on referrals.
80. As any Business mode user, I want to boost my profile visibility in nearby search results, so
    that I appear higher for relevant searches in my area.
81. As any Business mode user, I want to see a clear earnings dashboard showing affiliate
    commissions, product sales, and payouts, so that I can track my income.

### Referral & Invites

82. As any logged-in user, I want to generate a unique referral link, so that I can invite friends
    and contacts to join LinkBeet.
83. As a user who referred a new signup, I want to automatically receive 1 month of free Business
    mode when my referral signs up and activates their account, so that I am rewarded for growing
    the platform.
84. As a new user who signed up via a referral link, I want to automatically receive 1 month of free
    Business mode, so that I can experience the full platform immediately.
85. As any user, I want to see how many referrals I have made and how many have converted, so that I
    can track my referral performance.
86. As any user, I want to share my referral link directly via WhatsApp, so that inviting contacts
    is frictionless.

### Video Content on Bio Profile

87. As any user, I want to embed a YouTube, Instagram Reels, or TikTok video on my bio page, so that
    visitors can watch my content without leaving my profile.
88. As any user, I want to add multiple video embeds to my bio page and reorder them, so that I can
    curate my video showcase.
89. As any user, I want to preview how video embeds look on my bio page before publishing, so that I
    can ensure the layout looks correct.

### Notifications

90. As any logged-in user, I want to receive push notifications on mobile for bookings, orders,
    reviews, connection requests, and offers, so that I stay informed in real time.
91. As any logged-in user, I want to receive web push notifications on desktop, so that I stay
    informed even when the mobile app is not open.
92. As any user, I want to manage my notification preferences and opt out of specific notification
    types, so that I only receive relevant alerts.
93. As any user, I want to tap a push notification and be taken directly to the relevant screen in
    the app via deep linking, so that I don't have to navigate manually.

### Mobile App Specific

94. As a mobile user, I want to scan a business's QR code with the app camera to open their LinkBeet
    profile instantly, so that I can discover businesses in the physical world.
95. As a mobile user, I want to view my own profile, saved businesses, and past orders offline, so
    that I can access key information without a data connection.
96. As a mobile user, I want the app to use my current location automatically for nearby search
    without me entering an address, so that discovery is instant.
97. As a mobile user, I want to share my bio link directly to WhatsApp, and have recipients who tap
    it land directly inside the app, so that sharing drives app installs.
98. As a Business mode user on mobile, I want to upload product photos directly from my phone
    camera, so that I can update my catalogue on the go.

### Settings

99. As any logged-in user, I want to change my default app open screen (Discovery or Bio/Dashboard)
    in Settings, so that I can override the smart automatic default.
100. As any user, I want to manage my location preferences in Settings — precise location,
     city-level only, or off — so that I control my privacy.
101. As any user, I want to set or change my industry tag in Settings anytime, so that my discovery
     categorisation stays accurate.
102. As a Normal mode user, I want to access "Switch to Business Mode" from Settings, so that I can
     activate it without needing a contextual trigger.

### Admin Panel

103. As a platform admin, I want to view all registered users with their profile status and mode
     (Normal/Business), so that I can monitor platform health.
104. As a platform admin, I want to manually verify businesses, so that verified profiles get a
     trust badge.
105. As a platform admin, I want to view and moderate reported reviews, so that I can maintain the
     integrity of the rating system.
106. As a platform admin, I want to see platform-wide analytics — total users, active profiles, GMV,
     bookings, referral conversions — in a single dashboard, so that I can measure business
     performance.
107. As a platform admin, I want to manage feature flags, so that I can control rollouts and
     override account settings when needed.

---

## Implementation Decisions

### Architecture

- NestJS modular monolith — single deployable backend on AWS ECS (Docker), ap-south-1 Mumbai
- 14 modules: `AuthModule`, `AccountModule`, `ProfileModule`, `ConnectionsModule`,
  `DiscoveryModule`, `CommerceModule`, `BookingModule`, `PaymentsModule`, `CRMModule`,
  `NotificationsModule`, `RatingsModule`, `AnalyticsModule`, `ReferralModule`, `AdminModule`
- Module boundaries enforced at code level — each module owns its own service, controller, and
  repository layer
- No inter-service HTTP calls — all cross-module communication via direct service injection or Redis
  Streams events
- `CommerceModule` and `BookingModule` remain separate at the backend (different state machines). A
  unified `GET /orders` aggregation endpoint merges both for the frontend

### Scaling Philosophy

We do not change architecture as we grow. The same stack runs from Day 1 to 10L users.

We only scale: instance size, number of running containers, and caching layers (Redis added at
threshold, not on day 1).

| Stage   | Users   | Monthly Cost   |
| ------- | ------- | -------------- |
| Stage 1 | 0–1,000 | ₹5,000–10,000  |
| Stage 2 | 1k–10k  | ₹10,000–20,000 |
| Stage 3 | 10k–50k | ₹20,000–40,000 |
| Stage 4 | 50k–1L  | ₹40,000–80,000 |

### Authentication & Anonymous Access

- Better Auth (self-hosted) integrated into NestJS `AuthModule`
- Providers: Google OAuth, Apple Sign In, Phone OTP
- One email or phone number = one account, one identity — no multi-account system
- Anonymous sessions: guest token issued on app open, converted to full session on login
- Gated actions (bookmark, book, buy, review, connect): middleware checks session type, returns 401
  with `reason: "login_required"` — client shows contextual prompt and stores pending action for
  post-login redirect
- User identity stored entirely in PostgreSQL — no third-party identity store
- JWT access tokens (short-lived) + refresh tokens (long-lived, stored in Redis when Redis is
  active)

### Account Mode System

- Every account has a `mode` field: `normal` | `business`
- Default on signup: `normal`
- Business mode activation: one-time permanent — `mode` field set to `business`, never reverted
- Activation triggers: (1) contextual — user attempts business action → full-screen upgrade moment →
  confirm → `mode = business` (2) Settings → "Switch to Business Mode"
- Business mode gates (backend middleware): `CommerceModule` seller endpoints, `BookingModule`
  provider endpoints, `CRMModule`, offer publishing, payouts — return 403 with
  `reason: "business_mode_required"` if `mode = normal`
- Normal mode users can still browse, search, book (as customer), and buy (as customer) — no
  restrictions on consuming

### Connections System

- Mutual connection model — both users must accept
- `connection` table: `requester_id`, `recipient_id`, `status` (pending | accepted | declined)
- Connection list visible on bio profile (count + list)
- For Business mode accounts: accepted connections appear in CRM as lead source `connection`
- No messaging in Phase 2 — connection is purely a social graph relationship

### Industry Tag

- Industry is an optional tag stored on `account` record
- No feature gating by industry — all features available to all users
- Industry used purely for: Meilisearch indexing, category filters in search, profile badge display
- Can be set, changed, or removed anytime — not mandatory during onboarding

### Onboarding Flow

- Onboarding slides shown only on first install — `onboarding_completed` flag stored in device local
  storage
- Login screen skippable — app proceeds with anonymous guest session
- Industry selection optional after first login — skippable, changeable anytime in Settings
- Bio setup skippable — user can complete later from Dashboard
- All users land on Discovery screen after onboarding regardless of industry

### Catalogue: Product vs Service

- `catalogue_item` has a `type` field: `product` or `service`
- Available to ALL users — no industry or mode restriction on creating items
- Product items: name, photos, description, price, stock_quantity, category → fulfilment via
  `CommerceModule` (cart, checkout, order tracking) — receiving orders requires Business mode
- Service items: name, description, duration_minutes, price, category → fulfilment via
  `BookingModule` (slot selection, booking lifecycle) — receiving bookings requires Business mode
- Any user can browse, buy products, and book services regardless of mode
- Product + Service combo type: Phase 3

### Discovery & Search

- Home screen: single search bar, minimal AI-feel UI
- Discover tab: feed of city-level content by default, upgrades to hyperlocal on location grant
- Near Me tab: location-gated, prompts for permission, shows radius-based results
- Text search: Meilisearch — typo-tolerant, fast, synced from PostgreSQL via Redis Streams
- Geo search: PostGIS `ST_DWithin()` for radius queries
- Combined search: PostGIS geo filter → Meilisearch text ranking → merged result

### Navigation

- No bottom tab bar — modern contextual navigation (ChatGPT/Perplexity-style)
- Mobile: hamburger sidebar drawer (top left) + avatar dropdown (top right) + contextual FAB (bottom
  right)
- Web: persistent collapsible left sidebar (desktop), minimal top bar (mobile web)
- Avatar dropdown: bottom sheet on mobile, dropdown on web — shows mode (Normal/Business), quick
  links
- Smart default active screen on launch: Normal mode → Discovery, Business mode → Bio/Dashboard
- User can override default in Settings → `default_landing_screen` field on `account`
- Sidebar Dashboard item hidden for Normal mode users — shown only after Business mode activated

---

## Technical Stack

### Guiding Principles

- **Monolith first** — modular monolith until data forces a split. Microservices kill small teams.
- **Mumbai only** — all backend infra in ap-south-1. Latency is a product quality issue.
- **No Vercel** — both web and admin self-hosted on ECS. Vercel bills explode at Indian scale.
- **3G-first** — every media and API decision is optimised for Indian mobile networks.
- **DPDP compliant** — all user identity stays in our own PostgreSQL. No Firebase Auth.
- **Observable from day 1** — Grafana + Loki set up before the first feature ships.
- **Design for scale, pay for usage** — same architecture from Day 1, scale resources gradually.

### Monorepo

```
/
├── apps/
│   ├── web/           → Next.js 15 — customer-facing web app (ECS)
│   ├── admin/         → Next.js 15 — internal admin panel (ECS)
│   ├── mobile/        → React Native (Expo) — iOS + Android
│   └── api/           → NestJS modular monolith (ECS)
├── packages/
│   ├── ui/            → Shared design tokens, Tailwind config, RN StyleSheet
│   ├── shared/        → Shared types, DTOs, constants
│   └── mock-services/ → Mock service layer — all UI calls go through here first
├── terraform/         → All AWS infrastructure as code
└── .github/
    └── workflows/     → CI/CD for all 4 surfaces
```

### Frontend — Web

| Component        | Technology                                |
| ---------------- | ----------------------------------------- |
| Framework        | Next.js 15 (App Router)                   |
| Hosting          | AWS ECS (Docker) — ap-south-1. No Vercel. |
| CDN              | AWS CloudFront in front of ECS            |
| Styling          | Tailwind CSS                              |
| State management | React Query (TanStack)                    |
| Forms            | React Hook Form + Zod                     |
| Admin panel      | Next.js 15 on same ECS cluster            |

### Frontend — Mobile

| Component          | Technology                     |
| ------------------ | ------------------------------ |
| Framework          | React Native (Expo SDK 51+)    |
| Navigation         | Expo Router                    |
| Push notifications | Firebase Cloud Messaging (FCM) |
| Deep links         | Firebase Dynamic Links         |
| Camera / Location  | Expo Camera, Expo Location     |
| Offline resilience | React Query + AsyncStorage     |

### Backend

| Component | Technology                             |
| --------- | -------------------------------------- |
| Framework | NestJS (modular monolith)              |
| Runtime   | Node.js 20 LTS, TypeScript strict mode |
| Hosting   | AWS ECS (Docker) — ap-south-1          |
| API style | REST (OpenAPI documented)              |

### Database

| Component    | Technology                                                    |
| ------------ | ------------------------------------------------------------- |
| Database     | PostgreSQL 16 + PostGIS                                       |
| Hosting      | AWS RDS — start db.t3.micro, scale to db.t3.medium at Stage 3 |
| Geo queries  | PostGIS `ST_DWithin`                                          |
| Bio profiles | JSONB columns                                                 |
| Migrations   | Version-controlled, run in CI                                 |

### Cache + Event Bus

| Component    | Technology                                                         |
| ------------ | ------------------------------------------------------------------ |
| Cache        | Redis 7 on AWS ElastiCache — add at Stage 2 (1k+ users), not day 1 |
| Event bus    | Redis Streams                                                      |
| Upgrade path | Kafka MSK at 10L+ users                                            |

### Search

| Component     | Technology                                                |
| ------------- | --------------------------------------------------------- |
| Engine        | Meilisearch self-hosted on EC2                            |
| Day 1         | EC2 t3.micro                                              |
| Scale trigger | Dedicated cluster when index > 5GB or p95 latency > 200ms |

### Storage + Media

| Component        | Technology                                              |
| ---------------- | ------------------------------------------------------- |
| Object storage   | Cloudflare R2 (zero egress fees)                        |
| Image processing | imgproxy on EC2 (WebP, device-responsive, 3G-optimised) |
| Upload flow      | Client → R2 pre-signed URL → NestJS records reference   |
| CDN              | CloudFront caches imgproxy output                       |
| Video embeds     | External only — YouTube, Instagram, TikTok              |

### Auth + Payments + Infra

| Component     | Technology                                                    |
| ------------- | ------------------------------------------------------------- |
| Auth          | Better Auth — identity in LinkBeet's own PostgreSQL           |
| Payments      | Razorpay Route (merchant of record, 2–5% platform commission) |
| IaC           | Terraform                                                     |
| CI/CD         | GitHub Actions                                                |
| Security      | AWS WAF + Shield — enable at Stage 3 (10k+ users)             |
| Secrets       | AWS Secrets Manager                                           |
| Observability | Grafana + Loki from day 1                                     |

### Key Schema (v3.0)

```
account           — one per email/phone, mode (normal|business), industry tag, default_landing_screen
catalogue_item    — type: product | service, linked to account
booking           — service item, slot, status lifecycle
order             — product item, cart, payment, fulfilment status
connection        — requester_id, recipient_id, status (pending|accepted|declined)
review            — linked to completed booking or order (verified transaction only)
referral          — referrer_id, referred_id, status, reward_dispatched
video_embed       — account_id, platform (youtube|instagram|tiktok), url, display_order
```

### Module Responsibilities

| Module                | Responsibilities                                                                                                                                                            |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `AuthModule`          | Better Auth, JWT, OTP, OAuth, anonymous sessions                                                                                                                            |
| `AccountModule`       | Mode management (normal/business activation), industry tag, default screen preference                                                                                       |
| `ProfileModule`       | Bio page layout, themes, custom design, link ordering, social media connections, external video embeds, QR code generation, profile preview, slug management, profile share |
| `ConnectionsModule`   | Connection requests, accept/decline, connection list, CRM lead sync                                                                                                         |
| `DiscoveryModule`     | Geo search, text search, Discover feed, Near Me, bookmarks                                                                                                                  |
| `CommerceModule`      | Product catalogue, cart, checkout, orders, order state machine, payouts                                                                                                     |
| `BookingModule`       | Service catalogue, slot management, availability calendar, booking lifecycle, double-booking prevention, reminders                                                          |
| `PaymentsModule`      | Razorpay Route integration, payment splits, payout triggers, refunds — shared by CommerceModule and BookingModule                                                           |
| `CRMModule`           | Customer records, lead tracking, export                                                                                                                                     |
| `NotificationsModule` | FCM push, deep links, preferences, event dispatch                                                                                                                           |
| `RatingsModule`       | Review eligibility, review CRUD, trust score, moderation                                                                                                                    |
| `AnalyticsModule`     | Profile views, link clicks, shop metrics, discovery metrics                                                                                                                 |
| `ReferralModule`      | Referral link generation, signup tracking, double-sided reward dispatch                                                                                                     |
| `AdminModule`         | User management, verification, moderation, platform analytics, feature flags                                                                                                |

---

## Testing Decisions

### What makes a good test

Tests should verify external behaviour — what a module does — not how it does it internally. Tests
should not break when implementation details change, only when observable behaviour changes.

### Modules to test

| Module                | Test Type          | What to test                                                                                                            |
| --------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `AuthModule`          | Unit + Integration | OTP flow, JWT issue/refresh/revoke, OAuth callback, anonymous session creation, post-login redirect with pending action |
| `AccountModule`       | Unit + Integration | Business mode one-time activation, mode gate enforcement (403 on business endpoints for normal mode), industry tag CRUD |
| `ProfileModule`       | Unit + Integration | Slug uniqueness, theme CRUD, link ordering, external video embed URL validation, QR code generation                     |
| `ConnectionsModule`   | Unit + Integration | Request/accept/decline flow, duplicate request prevention, CRM lead sync on accept                                      |
| `DiscoveryModule`     | Unit + Integration | Geo radius queries, Meilisearch sync on profile update, anonymous access allowed, city-level vs hyperlocal fallback     |
| `CommerceModule`      | Unit + Integration | Cart calculations, order state machine, Business mode gate                                                              |
| `BookingModule`       | Unit + Integration | Slot availability, double-booking prevention, booking state transitions, reminder dispatch, Business mode gate          |
| `PaymentsModule`      | Integration        | Razorpay Route split logic, payout trigger on order/booking completion, refund flow, webhook handling                   |
| `ReferralModule`      | Unit + Integration | Referral link generation, signup attribution, duplicate referral prevention, reward dispatch on qualified signup        |
| `RatingsModule`       | Unit               | Review eligibility (completed transaction only), trust score computation                                                |
| `NotificationsModule` | Unit               | Event-to-notification mapping, preference filtering, connection request notifications                                   |

### Testing principles

- Test at the service layer, not the controller layer
- Mock external services (Razorpay, FCM, Meilisearch) in unit tests — use real instances in
  integration tests
- Every booking and payment flow must have an integration test covering happy path and primary
  failure modes
- Anonymous access middleware must have explicit tests for each gated action

---

## Out of Scope (Phase 2)

- Pricing tier definition and enforcement — Phase 3
- ClickHouse analytics (OLAP, sales funnels, search trends) — Phase 3
- Product + Service combo catalogue item type — Phase 3
- Private messaging between connections — Phase 3
- Native video upload on bio profiles (storage + transcoding) — Phase 3
- Kafka MSK event bus upgrade — Phase 4
- AWS EKS / Kubernetes — Phase 5
- Regional language search (Hindi, Tamil, Telugu etc.) — Phase 4
- International payments via Stripe — Phase 5
- Background location tracking on mobile
- Live streaming
- Multi-vendor marketplace
- Subscription products (recurring billing for end consumers)
- Staff management for businesses (multiple team members per account)
- Phase 1 data migration (MongoDB → PostgreSQL, S3 → R2) — deferred to post-launch cutover
  workstream

---

## Pre-Build Checklist

- [ ] Provision RDS PostgreSQL 16 + PostGIS in ap-south-1 via Terraform (start db.t3.micro)
- [ ] Run: `CREATE EXTENSION postgis; CREATE EXTENSION postgis_topology;`
- [ ] Set up AWS Secrets Manager for all credentials
- [ ] Configure ECS cluster — single t3.small node, tasks for web, admin, api
- [ ] Set up CloudFront distribution in front of ECS (enable from day 1)
- [ ] Set up EC2 t3.micro for Meilisearch + imgproxy
- [ ] Create Cloudflare R2 bucket, configure imgproxy, test WebP output
- [ ] Set up Grafana + Loki before first feature ships
- [ ] Set up staging environment (RDS db.t3.micro, ECS staging cluster)
- [ ] Set up GitHub Actions CI/CD pipelines for all 4 surfaces
- [ ] Docker Compose at monorepo root (Postgres + PostGIS + Redis + pgAdmin + Meilisearch)
- [ ] `packages/mock-services` scaffolded with real API shapes
- [ ] README with one-command local setup
- [ ] Razorpay Route — test + production credentials in Secrets Manager
- [ ] Firebase project — FCM + Dynamic Links configured

---

## Further Notes

- All AWS infrastructure in ap-south-1 (Mumbai) — non-negotiable for Indian user latency
- Better Auth over Firebase Auth — all user identity stays in LinkBeet's PostgreSQL, required for
  DPDP compliance
- Redis Streams as event bus in Phase 2 — migrate to Kafka MSK only when Redis Streams becomes a
  bottleneck (Phase 4)
- imgproxy + Cloudflare R2 is the single highest-impact change for 3G performance — prioritise in
  Sprint 0
- Firebase Dynamic Links (WhatsApp deep linking) is the primary organic growth driver for India —
  implement at launch
- Anonymous access is a top-of-funnel priority — every friction point before login costs users in
  the Indian market
- Normal vs Business mode is the core product axis — not industry, not user type. Industry is purely
  a discovery tag
- Business mode activation is a meaningful product moment — design it as a full-screen upgrade, not
  a settings toggle
- Connections feed into CRM as leads — this is the organic growth loop for Business mode users
- Phase 2 is a fresh build from scratch — Phase 1 at linkbeet.in stays live during development. Data
  cutover happens at launch, not during build
- Cost reality: ₹5,000–10,000/month on day 1. ₹25,000–40,000/month at 50k+ users. Cost grows with
  users, not before users.

---

_PRD v3.0 — April 2026_ _Changes from v2.3: Technical stack section rewritten — Vercel removed, both
web and admin on AWS ECS + CloudFront, scaling philosophy added, day 1 vs scaled setup documented,
cost stages added, Redis deferred to Stage 2, WAF deferred to Stage 3._ _Stack reference:
`linkbeet_v2_phase2_stack.md`_

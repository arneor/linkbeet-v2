# Phase 3: Discovery & Search Screens — Context

**Gathered:** 2026-04-15 **Status:** Theme locked — ready for planning **Source:** Phase 2 test
drive (screenshot validation) + DESIGN.md lock

---

<domain>

## Phase Boundary

Build the Discovery home, search results, Near Me, and category filter screens — both **web
(Next.js)** and **mobile (Flutter — Clean Architecture with flutter_bloc + go_router + get_it)**.

All screens use mock data. No backend wiring. The goal is pixel-perfect execution of the locked
"Spatial AI Light" theme established in Phase 2 test drive.

> **Stack note**: Mobile is Flutter (not Expo React Native). Migrated in plan 03-01. Theme is in
> `mobile/lib/src/core/theme/` — all 7 files aligned to DESIGN.md. `AppTheme.lightTheme` is wired in
> `my_app.dart`. `shared/ui` has been removed — React components cannot be shared with Flutter.

</domain>

---

<decisions>

## Theme Lock (NON-NEGOTIABLE — validated by test drive)

### T-01: Theme = "Spatial AI Light" — pure light mode

The Phase 2 test drive confirmed the final design direction. DESIGN.md is now locked. **All screens
in Phase 3 (and every future phase) MUST follow DESIGN.md exactly.**

The theme is:

- White/light backgrounds only — `#ffffff` page, `#f5f5f7` cards, `slate-50/90` sidebar
- Apple Blue `#0071e3` is the ONLY chromatic accent color
- No dark section backgrounds, no dark mode, no alternating black/light rhythm
- Frosted glass sidebar (`bg-slate-50/90 backdrop-blur-xl border-r border-slate-200`)
- Inter font (Google Fonts) on web, system font on mobile

**Override**: Phase 1 CONTEXT.md D-09 ("binary section rhythm") is superseded by this lock.

### T-02: AppShell is mandatory wrapper for all web screens

Every web screen wraps in `AppShell` from `@/components/layout`. Props: `currentPath` (required),
`userMode`, `isLoggedIn`, `userName`, `userAvatar`.

### T-03: Entry animations on all screens

Primary content enters with `animate-[fadeInUp_0.8s_ease-out_both]`. Secondary elements stagger: 0s
→ 0.1s → 0.2s delays. Keyframe:
`@keyframes fadeInUp { from { opacity:0; transform:translateY(15px) } to { opacity:1; transform:translateY(0) } }`

---

## Discovery Home Screen

### D-01: Chat paradigm layout — center-first

The Discovery home is an AI chat paradigm screen, not a feed:

- Centered content area, `max-w-3xl mx-auto`
- Vertically centered within the viewport (`justify-center` on flex container)
- Time-based greeting: "Good morning/afternoon/evening, [Name]."
- Greeting size: `text-3xl md:text-[44px] font-medium tracking-tight text-slate-900`
- Subtext: "What are you exploring today?" — `text-lg md:text-xl text-slate-500`

### D-02: Search input — the discovery paradigm component

The primary search input IS the discovery paradigm component (already built in Phase 2). Reuse the
existing component at `web/src/app/page.tsx`. It must appear on the Discovery screen — do NOT
rebuild, import/compose.

Shape: `rounded-[24px] bg-white border border-slate-200` Focused:
`border-[#0071e3]/40 shadow-[0_4px_30px_rgba(0,113,227,0.15)] ring-4 ring-[#0071e3]/5` Min height:
140px (textarea, not single-line input)

### D-03: Filter chips row below the search input

Horizontal scrollable row (desktop: wrap, mobile: horizontal scroll):

- "Filters" chip with SlidersHorizontal icon
- Separator `w-px h-4 bg-slate-200`
- Category chips: Restaurants, Salons & Spas, Creators
- Status chip: "Open Now" — emerald accent only
  (`text-emerald-700 bg-emerald-50 border-emerald-200`)
- All chips: `rounded-full px-4 py-1.5 text-[13px] font-medium border border-slate-200 bg-white`

### D-04: Suggestion pills (prompt starters)

3 suggestion pills below filter chips:

- MapPin icon (emerald-500) — location-based suggestion
- Sparkles icon (purple-500) — featured/AI suggestion
- Search icon (blue `#0071e3`) — search suggestion

Pills:
`px-4 py-2.5 bg-white border border-slate-200 shadow-sm rounded-2xl text-[14px] font-medium text-slate-600`

---

## Search Results Screen

### S-01: Profile card component

Each result is a Profile Card:

```
bg-white or #f5f5f7
rounded-[12px] (large radius)
no visible border
shadow-[0_8px_30px_rgba(0,0,0,0.06)] on hover

Content:
  - Avatar (48px, rounded-full, bg-[#0071e3] for placeholder)
  - Name: text-slate-900 font-medium text-[17px]
  - Industry badge: bg-[#0071e3]/10 text-[#0071e3] text-[11px] rounded-full
  - Distance: text-slate-500 text-[13px]
  - Rating: text-slate-600 text-[13px]
  - Connection count: text-slate-500 text-[13px]
```

### S-02: Results layout

- List layout (not grid) on mobile
- 2-column grid on desktop (md+)
- "X results" count in `text-slate-500 text-[13px]` above the list
- Empty state: centered, `text-slate-400`, no illustration (text only for Phase 3)

### S-03: Search input at top of results

The same search input (compact version, single-line, not textarea) appears sticky at the top of the
search results page, pre-filled with the query. Compact version: `rounded-[12px]` instead of
`rounded-[24px]`, `h-[44px]`, single-line input.

---

## Near Me Screen

### N-01: Location prompt first

If location permission not granted: full-screen centered state.

- Lock/Location icon in `text-[#0071e3]`, 48px
- "Enable location" heading: `text-slate-900 text-[28px] font-medium tracking-tight`
- Description: `text-slate-500 text-[17px]`
- Primary CTA: `bg-[#0071e3] text-white rounded-[8px] px-6 py-3 text-[17px]`

### N-02: When location granted — list view (no map in Phase 3)

- Radius selector chips: "500m", "1km", "5km", "10km" — same chip style as filter chips
- Profile cards list sorted by distance
- Distance shown prominently: `text-[#0071e3] text-[13px] font-medium`
- No map component in Phase 3 — list only (map is backlog)

---

## Mobile Adaptations

### M-01: Search input placement — bottom floating

On mobile Discovery, the search input floats at the **bottom** of the screen (ChatGPT mobile
pattern), not centered in the page. Flutter: use `Stack` + `Positioned(bottom: 16)` inside
`SafeArea`. Greeting and suggestions remain centered above.

### M-02: Filter chips — horizontal scroll

On mobile, filter chips row is a horizontal `SingleChildScrollView` (Flutter) with
`scrollDirection: Axis.horizontal`. No wrap. Single row, scrollable.

### M-03: Suggestion pills — 2 visible, rest scrollable

On mobile, show 2 suggestion pills by default. Horizontal `SingleChildScrollView` for more.

### M-04: Near Me — bottom sheet for radius selector

On mobile, the radius selector triggers a `showModalBottomSheet` (Flutter). Bottom sheet: white bg,
`borderRadius: BorderRadius.vertical(top: Radius.circular(24))`, drag handle at top. Use
`AppRadius.searchInput` (24px) for the top corners.

---

## What This Phase Does NOT Include

- No real search API — all mock data with hardcoded results
- No map/MapView component — Phase 13 backend adds geolocation
- No real location APIs — mock location (`Bangalore, India` or similar) for Phase 3
- No authentication — all screens visible anonymously
- No bookmarking backend — UI only (bookmark icon toggles locally)

</decisions>

---

<specifics>

- The existing Discovery test drive page (`web/src/app/page.tsx`) is the reference implementation.
  Phase 3 Discovery screen should start from it, not replace it from scratch.
- DESIGN.md is the single source of truth for all styling decisions. When in doubt, DESIGN.md wins.
- Both web and mobile screens must be built for each screen before moving to the next.

</specifics>

---

## Canonical References

- `DESIGN.md` — Locked design system (authoritative for both web and mobile)
- `web/src/app/page.tsx` — Discovery test drive (web reference implementation)
- `web/src/components/layout/` — AppShell, Sidebar, TopBar (do not rebuild)
- `mobile/lib/src/core/theme/` — Flutter theme (all 7 files, aligned to DESIGN.md)
- `mobile/lib/src/app/my_app.dart` — Theme wired here (`AppTheme.lightTheme`)
- `shared/constants/src/colors.ts` — Web design tokens (mirrors Flutter AppColors)
- `.planning/phases/01-design-system-shared-ui/01-CONTEXT.md` — Foundation decisions (D-01 through
  D-12, except D-09 which is overridden by T-01 above)
- **Note**: `shared/ui` has been deleted. Web imports `cn` from `@linkbeet/utils`.

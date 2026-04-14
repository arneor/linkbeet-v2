# Phase 1: Design System & Shared UI Foundation - Context

**Gathered:** 2026-04-14 **Status:** Ready for planning **Source:** DESIGN.md + Codebase Scout + PRD
v2.3

<domain>
## Phase Boundary

Establish the Apple-inspired design system (per DESIGN.md), design tokens, component library,
navigation shells, and shared UI patterns that every subsequent screen phase will build upon. Covers
**both web (Next.js) and mobile (Expo React Native)** surfaces.

This phase does NOT build any screens — only the foundation: tokens, primitives, navigation shells,
and shared components.

</domain>

<decisions>
## Implementation Decisions

### Typography & Font Strategy

- **D-01:** Use **Inter** (Google Fonts) as the primary web font — closest publicly available
  alternative to SF Pro. Configure with optical sizing support via `next/font/google`.
- **D-02:** On mobile (React Native), use the **system font**
  (`Platform.select({ ios: 'SF Pro Display', android: 'Roboto' })`) — iOS automatically uses SF Pro,
  Android uses Roboto.
- **D-03:** Follow DESIGN.md typography scale exactly: Display Hero (56px/600/1.07), Section Heading
  (40px/600/1.10), Tile Heading (28px/400/1.14), Body (17px/400/1.47), Button (17px/400), Link
  (14px/400), Caption (14px/400), Micro (12px/400), Nano (10px/400).
- **D-04:** Apply negative letter-spacing at ALL sizes per DESIGN.md: -0.28px at 56px, -0.374px at
  17px, -0.224px at 14px, -0.12px at 12px.
- **D-05:** Weight range: 300 (light) to 700 (bold). Most text at 400/600. Weight 700 rare (bold
  card titles only).

### Color Palette (Apple-Inspired per DESIGN.md)

- **D-06:** Replace current indigo/violet brand colors with DESIGN.md Apple palette:
  - Primary backgrounds: Pure Black `#000000`, Light Gray `#f5f5f7`
  - Text: `#1d1d1f` on light, `#ffffff` on dark
  - Interactive accent: Apple Blue `#0071e3` (ONLY chromatic color)
  - Links: `#0066cc` (light bg), `#2997ff` (dark bg)
  - Dark surfaces: `#272729`, `#262628`, `#28282a`, `#2a2a2d`, `#242426`
  - Semantic colors (success/warning/error/info) remain as-is for functional UI elements
- **D-07:** Update `shared/constants/src/colors.ts` to reflect new palette.
- **D-08:** Update Tailwind theme in `web/src/app/globals.css` with new CSS variables.

### Dark Mode Strategy

- **D-09:** Use **binary section rhythm** per DESIGN.md (dark sections alternate with light
  sections) — NOT a user-togglable dark mode. Each section declares its own background color.
- **D-10:** Navigation bar always uses translucent dark glass (`rgba(0,0,0,0.8)` +
  `backdrop-filter: saturate(180%) blur(20px)`) regardless of section background.

### Component Scope

- **D-11:** Phase 1 components (shared `@linkbeet/ui`): Button (primary blue, primary dark, pill
  link, filter/search, media control), Card, Input/TextField, Modal/BottomSheet, Avatar, Badge,
  LoadingState, EmptyState.
- **D-12:** Navigation shells ARE included in Phase 1:
  - Web: persistent collapsible left sidebar (ChatGPT-style) + minimal mobile-web top bar
  - Mobile: sidebar drawer (hamburger) + avatar dropdown + contextual FAB pattern + header component
- **D-13:** No bottom tab bar — confirmed per PRD.

### Spacing & Layout

- **D-14:** Base spacing unit: 8px (per DESIGN.md). Dense scale at small sizes (2-11px), then jumps.
- **D-15:** Max content width: ~980px centered.
- **D-16:** Border radius scale: Micro (5px), Standard (8px), Comfortable (11px), Large (12px), Full
  Pill (980px), Circle (50%).

### Breakpoints

- **D-17:** Use DESIGN.md breakpoints: <360px, 360-480, 480-640, 640-834, 834-1024, 1024-1070,
  1070-1440, >1440px. Update `shared/constants/src/breakpoints.ts`.

### Shadows & Depth

- **D-18:** Single shadow style: `rgba(0, 0, 0, 0.22) 3px 5px 30px 0px` — used sparingly.
- **D-19:** Navigation glass: `backdrop-filter: saturate(180%) blur(20px)` on `rgba(0,0,0,0.8)`.

### Existing Component Overhaul

- **D-20:** Rewrite `shared/ui/src/components/Button.tsx` — replace violet/slate Tailwind classes
  with Apple palette variants (Primary Blue CTA, Primary Dark, Pill Link, Filter/Search, Media
  Control).
- **D-21:** Rewrite `shared/ui/src/components/Card.tsx` — update variants to `light` (#f5f5f7 bg),
  `dark` (#272729-#2a2a2d bg), drop borders per DESIGN.md.
- **D-22:** Update `shared/ui/src/lib/utils.ts` (cn utility) — keep as-is, works fine.

### Agent's Discretion

- Loading spinner/skeleton animation style — agent picks based on Apple patterns
- Empty state illustration approach — agent decides (icon-based vs text-only)
- Modal/BottomSheet animation timing — agent picks smooth Apple-like transitions
- Sidebar collapse animation easing — agent decides

</decisions>

<canonical_refs>

## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System

- `DESIGN.md` — Complete Apple-inspired design system specification (colors, typography, spacing,
  components, layout, responsive behavior)

### Project Architecture

- `.planning/codebase/STRUCTURE.md` — Directory layout and file organization
- `.planning/codebase/STACK.md` — Technology stack details (Tailwind 4, Expo 54, React 19)
- `.planning/codebase/CONVENTIONS.md` — Code patterns and formatting rules

### Navigation Pattern

- `.planning/PROJECT.md` §Navigation Pattern — ChatGPT/Perplexity-style sidebar + FAB (no bottom
  tabs)

### Existing Code

- `shared/ui/src/components/Button.tsx` — Current Button component (to be rewritten)
- `shared/ui/src/components/Card.tsx` — Current Card component (to be rewritten)
- `shared/constants/src/colors.ts` — Current color constants (to be replaced)
- `shared/constants/src/typography.ts` — Current typography constants (to be replaced)
- `shared/constants/src/spacing.ts` — Current spacing constants (to be updated)
- `shared/constants/src/breakpoints.ts` — Current breakpoints (to be updated)
- `web/src/app/globals.css` — Current global CSS (to be overhauled)
- `web/src/app/layout.tsx` — Current root layout (to be updated with Inter font)

</canonical_refs>

<code_context>

## Existing Code Insights

### Reusable Assets

- `shared/ui/src/lib/utils.ts` — `cn()` utility (clsx + tailwind-merge) — keep as-is
- `shared/ui/src/index.ts` — Barrel exports — extend with new components

### Established Patterns

- Tailwind CSS 4 via `@import "tailwindcss"` + `@theme inline` for CSS variables
- React.forwardRef pattern on all components with `cn()` for class merging
- TypeScript interfaces exported alongside components
- CVA (class-variance-authority) available in deps for variant management

### Integration Points

- `web/src/app/layout.tsx` — Root layout needs font change (Geist → Inter)
- `web/src/app/globals.css` — Design tokens via CSS variables + Tailwind theme
- `shared/constants/` — All token constants shared across web + mobile
- `shared/ui/` — Shared components consumed by web + admin apps

</code_context>

<specifics>
## Specific Ideas

- DESIGN.md pill CTA shape (980px radius) — the signature Apple "Learn more" / "Shop" link
- Navigation glass effect is non-negotiable — translucent dark blur defines the Apple UI identity
- Products on solid-color fields with no backgrounds — this aesthetic informs Card component design
- Cinematic section rhythm — dark/light alternation — not a CSS dark mode toggle

</specifics>

<deferred>
## Deferred Ideas

- Profile themes (PROF-13) — Phase 6
- Dark mode user toggle — not planned per DESIGN.md (uses section-based rhythm instead)
- Icon system setup (Lucide React already in deps) — can be added incrementally

</deferred>

---

_Phase: 01-design-system-shared-ui_ _Context gathered: 2026-04-14_

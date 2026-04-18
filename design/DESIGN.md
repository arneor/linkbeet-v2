# LinkBeet v2 — Design System (LOCKED)

> **LOCKED after Phase 2 test drive — 2026-04-15** This document is the canonical design reference
> for ALL web and mobile screens in LinkBeet v2. Do not deviate without explicit user approval. All
> future phases (UI and backend) must conform.

---

## Theme Identity: "Spatial AI Light"

**Concept**: Apple-precision meets AI chat paradigm in permanent light mode. The interface is calm,
clean, and spatial — like Claude or Perplexity, not Apple.com. Apple's contribution is: typography
discipline, Apple Blue as the sole chromatic accent, frosted glass surfaces, and spatial breathing
room. NOT Apple's dark cinema sections.

**Key override from original plan**: No alternating black/light section rhythm. No dark mode. No
dark backgrounds on the main app. Pure light mode throughout.

---

## 1. Color System

### Backgrounds

| Token        | Value                                    | Use                                     |
| ------------ | ---------------------------------------- | --------------------------------------- |
| Page bg      | `#ffffff`                                | Main content area, all screens          |
| Secondary bg | `#f5f5f7`                                | Cards, section fills, subtle containers |
| Sidebar bg   | `rgba(249,250,251,0.90)` = `slate-50/90` | Sidebar — frosted glass, light          |
| Input bg     | `#ffffff`                                | Search inputs, form fields              |

### Text

| Token       | Value                            | Use                         |
| ----------- | -------------------------------- | --------------------------- |
| Primary     | `#1d1d1f` / `slate-900`          | Headings, labels, body      |
| Secondary   | `slate-600` / `rgba(0,0,0,0.60)` | Nav labels, descriptions    |
| Tertiary    | `slate-500` / `rgba(0,0,0,0.48)` | Subtitles, placeholders     |
| Placeholder | `slate-300`                      | Input placeholder text      |
| Inverse     | `#ffffff`                        | Text on blue buttons/badges |

### Interactive — Apple Blue is the ONLY chromatic accent

| Token                | Value                  | Use                                                    |
| -------------------- | ---------------------- | ------------------------------------------------------ |
| Accent / Interactive | `#0071e3`              | CTAs, active nav, focus rings, send button, logo badge |
| Accent hover         | `#0077ED`              | Hover on accent blue elements                          |
| Accent tint bg       | `rgba(0,113,227,0.10)` | Active nav item background                             |
| Accent tint ring     | `rgba(0,113,227,0.05)` | Search focus ring (ring-4)                             |
| Accent focus border  | `rgba(0,113,227,0.40)` | Input focused border                                   |
| Link light           | `#0066cc`              | Inline links on light bg                               |

### Borders & Dividers

| Token          | Value       | Use                                                |
| -------------- | ----------- | -------------------------------------------------- |
| Default border | `slate-200` | Input borders, sidebar border, chip borders, cards |
| Divider        | `slate-200` | Sidebar bottom section divider                     |

### Special — accent chips (use sparingly, only for contextual status)

| Token          | Value                                               | Use                         |
| -------------- | --------------------------------------------------- | --------------------------- |
| Emerald accent | `text-emerald-700 bg-emerald-50 border-emerald-200` | "Open Now" filter chip only |

### Shadows

| Token        | Value                             | Use                            |
| ------------ | --------------------------------- | ------------------------------ |
| Card shadow  | `0 8px 30px rgba(0,0,0,0.06)`     | Default input/card shadow      |
| Focus shadow | `0 4px 30px rgba(0,113,227,0.15)` | Input focused state            |
| Chip shadow  | `shadow-sm` (Tailwind)            | Filter chips, suggestion pills |

---

## 2. Typography

**Font**: Inter (Google Fonts, loaded via `next/font/google` on web). **Fallbacks**:
`SF Pro Display`, `SF Pro Text`, `Helvetica Neue`, `Helvetica`, `Arial`, `sans-serif`. **Mobile
(React Native)**: System font — SF Pro on iOS, Roboto on Android.

### Scale

| Role            | Size                  | Weight       | Line Height | Tracking | Use                       |
| --------------- | --------------------- | ------------ | ----------- | -------- | ------------------------- |
| Hero Greeting   | 44px (md) / 30px (sm) | 500 (medium) | tight       | tight    | Discovery screen greeting |
| Section Heading | 40px                  | 600          | 1.10        | tight    | Major section headers     |
| Tile Heading    | 28px                  | 400          | 1.14        | 0.196px  | Card/tile headlines       |
| Sub-heading     | 21px                  | 400          | 1.19        | 0.231px  | Card sub-headers          |
| Body            | 17px                  | 400          | 1.47        | -0.374px | Standard text             |
| Nav Label       | 12px                  | 400          | normal      | normal   | Sidebar navigation labels |
| Input Text      | 17–20px               | 400          | relaxed     | tight    | Search textarea           |
| Filter Chip     | 13px                  | 500          | —           | —        | Category filter buttons   |
| Suggestion Pill | 14px                  | 500          | —           | —        | Prompt suggestion buttons |
| Button          | 14–17px               | 400          | —           | —        | CTA buttons               |
| Caption         | 14px                  | 400          | 1.29        | -0.224px | Secondary text            |
| Micro           | 12px                  | 400          | 1.33        | -0.12px  | Fine print                |

**Principles**:

- `tracking-tight` at display sizes — Apple-style tight headlines
- Negative letter-spacing at body sizes: -0.374px at 17px
- `font-medium` (500) for greetings — approachable, not aggressive bold
- Weight 300 (light) only on very large decorative text
- Maximum weight: 700 (bold) — used extremely rarely

---

## 3. Layout & Navigation

### Web Sidebar (Desktop)

```
Width expanded:   260px
Width collapsed:   72px
Background:       bg-slate-50/90 backdrop-blur-xl
Border:           border-r border-slate-200
Position:         fixed, left-0, top-0, full height (h-screen)
z-index:          40
Transition:       300ms ease-in-out
```

### Web TopBar (Mobile — <1024px)

```
Height:           48px
Style:            same frosted glass treatment as sidebar
Position:         fixed top
```

### Main Content

```
Margin left (desktop): sidebar width (260px or 72px), transition 300ms
Padding top (mobile):  48px (topbar height)
Inner container:       max-w-[980px] px-4 py-6 mx-auto
```

### Sidebar Logo Badge

```
Size:             32px × 32px
Radius:           8px
Background:       #0071e3
Text:             "LB", white, 14px, font-semibold
```

### Sidebar Navigation Items

```
Height:           48px per item
Padding:          px-3
Radius:           8px
Label size:       12px, font-normal

Active state:     bg-[#0071e3]/10  text-[#0071e3]
                  + 2px left indicator bar: w-[2px] h-5 bg-[#0071e3] rounded-r absolute left-0

Inactive:         text-slate-600
Hover:            bg-slate-200/50  text-slate-900
```

### Sidebar Bottom

```
Border top:       border-slate-200
Login CTA:        h-[40px] rounded-[8px] bg-[#0071e3] text-white text-[14px] full width
Collapse toggle:  h-[36px] text-slate-400 hover:bg-slate-200/50
```

### Mobile Drawer

```
Width:            260px
Overlay:          bg-black/50
Animation:        slideInLeft 300ms ease-out
Same sidebar component, isCollapsed=false
```

---

## 4. Component Specifications

### Search Input (Discovery paradigm)

```
Container:
  rounded-[24px]
  bg-white
  border border-slate-200
  shadow-[0_8px_30px_rgba(0,0,0,0.06)]

Focused:
  border-[#0071e3]/40
  shadow-[0_4px_30px_rgba(0,113,227,0.15)]
  ring-4 ring-[#0071e3]/5

Search icon:
  default: text-slate-400
  focused: text-[#0071e3]
  size: 22px

Textarea:
  text-[17px] md:text-xl
  text-slate-900
  placeholder: text-slate-300
  min-h-[140px]
  pl-14 pr-[100px] py-[20px]
  resize-none
  tracking-tight leading-relaxed

Send button (empty): bg-slate-50 text-slate-300 border-slate-200, scale-95
Send button (filled): bg-[#0071e3] text-white hover:bg-[#0077ED] shadow-md
  Both: w-[40px] h-[40px] rounded-[20px]

Mic button: w-[40px] h-[40px] rounded-full text-slate-400 hover:bg-slate-100
```

### Filter Chips (below search)

```
Default chip:
  px-3 py-1.5
  text-[13px] font-medium text-slate-600
  bg-white border border-slate-200
  rounded-full
  shadow-sm
  hover:bg-slate-50
  active:scale-95

Accent chip (Open Now):
  text-emerald-700 bg-emerald-50 border-emerald-200
  (only for live status indicators)

Separator between Filters and categories:
  w-px h-4 bg-slate-200 mx-1
```

### Suggestion Pills

```
px-4 py-2.5
bg-white border border-slate-200
shadow-sm rounded-2xl (= rounded-[16px])
text-[14px] font-medium text-slate-600
hover:bg-slate-50
active:scale-95
flex items-center gap-2

Icon colors:
  Location / Near Me: text-emerald-500
  AI / Featured:      text-purple-500
  Search:             text-[#0071e3]
```

### Cards (Profile, Product, etc.)

```
Background:     #f5f5f7 or #ffffff
Border:         none (no visible borders on content cards)
Radius:         8px (standard) / 12px (large)
Shadow:         0 8px 30px rgba(0,0,0,0.06) for elevated cards
Hover:          subtle bg shift, no border change
```

### Buttons

```
Primary (Apple Blue):
  bg-[#0071e3] text-white
  rounded-[8px] px-4 py-2
  hover:bg-[#0077ED]
  font-normal text-[14px-17px]

Ghost / Outline:
  bg-white border border-slate-200 text-slate-600
  rounded-[8px] hover:bg-slate-50

Pill CTA (Learn more style):
  rounded-[980px]
  border border-[#0071e3] text-[#0071e3]
  (used for secondary actions, not primary nav)
```

### Avatar

```
Logged in:      img rounded-full 32px
Logged out:     bg-[#0071e3] rounded-full 32px, white initial letter
```

### Badge

```
Industry / Mode badges:
  text-[11px] font-medium
  rounded-full px-2 py-0.5
  bg-slate-100 text-slate-600 (neutral)
  bg-[#0071e3]/10 text-[#0071e3] (featured/verified)
```

---

## 5. Motion & Animation

```
Page entry:       fadeInUp — opacity 0→1, translateY 15px→0, 0.8s ease-out
Staggered delay:  0s (heading) → 0.1s (input) → 0.2s (suggestions)
Sidebar collapse: transition-all 300ms ease-in-out
Drawer open:      slideInLeft 300ms ease-out
Overlay:          fadeIn 200ms ease-out
Button press:     active:scale-95 (chips, pills)
Focus transition: transition-all duration-300 (input border/shadow)
```

---

## 6. Border Radius Scale

| Name            | Value | Use                                            |
| --------------- | ----- | ---------------------------------------------- |
| Micro           | 5px   | Small tags                                     |
| Standard        | 8px   | Buttons, nav items, logo badge, cards          |
| Comfortable     | 11px  | Search filters                                 |
| Large           | 12px  | Feature panels, suggestion pills (rounded-2xl) |
| Search Input    | 24px  | The main search box                            |
| Send Button     | 20px  | Circular-ish send button                       |
| Avatar / Toggle | 50%   | Circular elements                              |
| Pill CTA        | 980px | "Learn more" pill links                        |

---

## 7. Spacing System

Base unit: `8px`. Tailwind spacing scale applies.

Key measurements:

- Sidebar width expanded: `260px`
- Sidebar width collapsed: `72px`
- Nav item height: `48px`
- Topbar height: `48px`
- Logo badge: `32px`
- Content max-width: `980px`
- Content padding: `px-4 py-6`

---

## 8. Responsive Behaviour

| Breakpoint                 | Behaviour                                |
| -------------------------- | ---------------------------------------- |
| `< 1024px` (mobile/tablet) | Sidebar hidden → TopBar + Drawer overlay |
| `≥ 1024px` (desktop)       | Fixed sidebar, content shifts right      |

Collapsed sidebar state persisted in `localStorage` key `linkbeet-sidebar-collapsed`.

---

## 9. What NOT to do (Hard Rules)

- **No dark backgrounds** on app screens — page bg is always white/light
- **No additional accent colors** — Apple Blue `#0071e3` is the only chromatic color
- **No alternating black section rhythm** — this is a web app, not a marketing site
- **No gradients or textures** on backgrounds — solid colors only
- **No borders on content cards** — shadow and background contrast create depth
- **No weight > 700** — maximum is bold (700), used very rarely
- **No wide letter-spacing on Inter/SF Pro** — always tight or neutral
- **No bottom tab bar** on mobile — drawer navigation only (confirmed in PRD)
- **No dark mode toggle** — this app is light mode only

---

## 10. Mobile (React Native / Expo) Adaptations

The web theme above is the canonical reference. Mobile adaptations:

```
Font:           Platform.select({ ios: 'SF Pro Display/Text', android: 'Roboto' })
Sidebar:        Replaced by hamburger → Drawer overlay (same nav items)
Search:         Floating bottom input on Discovery (matches ChatGPT mobile pattern)
Touch targets:  Minimum 44×44px for all interactive elements
Shadows:        React Native shadow props (shadowColor, shadowOffset, elevation)
Backdrop blur:  expo-blur BlurView for frosted glass surfaces
Radius:         Same scale as web
Colors:         Identical token values
```

---

## 11. Agent Prompt Reference

### Quick color lookup

```
Page bg:          #ffffff
Sidebar bg:       slate-50/90 (frosted glass)
Primary text:     #1d1d1f / slate-900
Secondary text:   slate-600
Accent ONLY:      #0071e3 (Apple Blue)
Accent hover:     #0077ED
Border:           slate-200
Card bg:          #f5f5f7
```

### New screen checklist

1. Wrap in `AppShell` with `currentPath` prop
2. Content inside `<div className="flex flex-col w-full min-h-[calc(100vh-100px)]">`
3. Max-width container: `max-w-3xl mx-auto w-full px-4 md:px-8` (or `max-w-[980px]`)
4. All interactive elements use `#0071e3` — no other accent
5. Entry animation: `animate-[fadeInUp_0.8s_ease-out_both]` on primary elements
6. Borders default to `border-slate-200`
7. Card/surface backgrounds: `bg-white` or `bg-[#f5f5f7]`
8. No dark backgrounds unless explicitly approved

### Example: New screen hero area

```tsx
<div className="flex flex-col items-center text-center animate-[fadeInUp_0.8s_ease-out_both]">
  <h1 className="text-3xl md:text-[44px] font-medium tracking-tight text-slate-900 mb-3">
    Screen Title
  </h1>
  <p className="text-lg md:text-xl text-slate-500 font-normal tracking-tight">
    Subtitle or description
  </p>
</div>
```

### Example: Primary action button

```tsx
<button className="px-4 py-2 bg-[#0071e3] text-white text-[14px] rounded-[8px] hover:bg-[#0077ED] transition-colors">
  Primary Action
</button>
```

### Example: Filter chip

```tsx
<button className="px-4 py-1.5 text-[13px] font-medium text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
  Category Label
</button>
```

### Example: Suggestion pill

```tsx
<button className="px-4 py-2.5 bg-white border border-slate-200 shadow-sm rounded-2xl hover:bg-slate-50 transition-all text-[14px] font-medium text-slate-600 flex items-center gap-2 active:scale-95">
  <IconComponent className="w-[18px] h-[18px] text-[#0071e3]" />
  Suggestion text
</button>
```

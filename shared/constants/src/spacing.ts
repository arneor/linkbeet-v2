// ─── LinkBeet Spacing — locked 2026-04-15 (DESIGN.md §7) ────────────────────
// Base unit: 8px. Tailwind spacing scale applies.

export const SPACING = {
  0: 0,
  0.25: 2,
  0.5: 4,
  0.625: 5,
  0.75: 6,
  0.875: 7,
  1: 8, // Base unit
  1.125: 9,
  1.25: 10,
  1.375: 11,
  1.75: 14,
  1.875: 15,
  2.125: 17,
  2.5: 20,
  3: 24,
  4: 32,
  5: 40,
  6: 48,
  8: 64,
  10: 80,
  // Named aliases
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

// ── Named Layout Tokens (DESIGN.md §3 & §7) ──────────────────────────────────
export const LAYOUT = {
  sidebarWidth: 260, // Expanded sidebar
  sidebarCollapsed: 72, // Collapsed sidebar
  topbarHeight: 48, // Mobile TopBar
  navItemHeight: 48, // Sidebar nav item height
  logoBadgeSize: 32, // Sidebar logo badge
  contentMaxWidth: 980, // Main content container max-width
} as const

// ── Border Radius Scale (DESIGN.md §6) ───────────────────────────────────────
export const BORDER_RADIUS = {
  none: 0,
  micro: 5, // Small tags
  standard: 8, // Buttons, nav items, logo badge, cards
  comfortable: 11, // Search filters
  large: 12, // Feature panels, suggestion pills (rounded-2xl)
  searchInput: 24, // The main search box
  sendButton: 20, // Circular-ish send button
  avatar: 9999, // Circular elements
  pill: 980, // "Learn more" pill links
} as const

export type SpacingKey = keyof typeof SPACING
export type LayoutKey = keyof typeof LAYOUT
export type BorderRadiusKey = keyof typeof BORDER_RADIUS

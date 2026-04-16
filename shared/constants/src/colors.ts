// ─── LinkBeet Design Tokens — locked 2026-04-15 (DESIGN.md §1) ───────────────
// Theme: "Spatial AI Light" — pure light mode, Apple Blue sole accent.
// No dark surfaces. No secondary accent colors.

// ── Backgrounds ──────────────────────────────────────────────────────────────
export const BACKGROUND_COLORS = {
  page: '#ffffff', // Main content area, all screens
  secondary: '#f5f5f7', // Cards, section fills, subtle containers
  sidebar: 'rgba(249, 250, 251, 0.90)', // Sidebar — frosted glass (slate-50/90)
  input: '#ffffff', // Search inputs, form fields
} as const

// ── Text ─────────────────────────────────────────────────────────────────────
export const TEXT_COLORS = {
  primary: '#1d1d1f', // Headings, labels, body (slate-900 equiv)
  secondary: '#475569', // slate-600 — nav labels, descriptions
  tertiary: '#64748b', // slate-500 — subtitles, placeholders
  placeholder: '#cbd5e1', // slate-300 — input placeholder text
  inverse: '#ffffff', // Text on blue buttons/badges
} as const

// ── Interactive — Apple Blue is the ONLY chromatic accent ────────────────────
export const INTERACTIVE_COLORS = {
  accent: '#0071e3', // CTAs, active nav, focus rings, send button
  accentHover: '#0077ED', // Hover on accent blue elements
  accentTintBg: 'rgba(0, 113, 227, 0.10)', // Active nav item background
  accentTintRing: 'rgba(0, 113, 227, 0.05)', // Search focus ring (ring-4)
  accentFocusBorder: 'rgba(0, 113, 227, 0.40)', // Input focused border
  link: '#0066cc', // Inline links on light backgrounds
} as const

// ── Borders & Dividers ────────────────────────────────────────────────────────
export const BORDER_COLORS = {
  default: '#e2e8f0', // slate-200 — inputs, sidebar border, chip borders, cards
} as const

// ── Semantic (functional — NOT brand) ────────────────────────────────────────
export const SEMANTIC_COLORS = {
  success: '#10B981',
  successBg: '#D1FAE5',
  successBorder: '#6ee7b7', // emerald-200 — "Open Now" chip border
  warning: '#F59E0B',
  warningBg: '#FEF3C7',
  error: '#EF4444',
  errorBg: '#FEE2E2',
  info: '#3B82F6',
  infoBg: '#DBEAFE',
  // Emerald chip — used only for "Open Now" live-status filter chip
  openNowText: '#065F46', // emerald-700
  openNowBg: '#D1FAE5', // emerald-50
  openNowBorder: '#6ee7b7', // emerald-200
} as const

// ── Shadows ───────────────────────────────────────────────────────────────────
export const SHADOWS = {
  card: '0 8px 30px rgba(0, 0, 0, 0.06)', // Default input/card shadow
  cardFocus: '0 4px 30px rgba(0, 113, 227, 0.15)', // Input focused state
} as const

// ── All tokens combined ───────────────────────────────────────────────────────
export const COLORS = {
  ...BACKGROUND_COLORS,
  ...TEXT_COLORS,
  ...INTERACTIVE_COLORS,
  ...BORDER_COLORS,
  ...SEMANTIC_COLORS,
} as const

export type ColorKey = keyof typeof COLORS
export type ColorValue = (typeof COLORS)[ColorKey]

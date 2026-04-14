// Apple-inspired design system colors (from DESIGN.md)

// Primary backgrounds
export const BACKGROUND_COLORS = {
  black: '#000000', // Hero sections, immersive showcases
  lightGray: '#f5f5f7', // Alternate sections, informational areas
  white: '#ffffff', // Pure white backgrounds
} as const

// Text colors
export const TEXT_COLORS = {
  white: '#ffffff', // Text on dark backgrounds
  nearBlack: '#1d1d1f', // Primary text on light backgrounds
  black80: 'rgba(0, 0, 0, 0.8)', // Secondary text, nav items on light bg
  black48: 'rgba(0, 0, 0, 0.48)', // Tertiary text, disabled states
} as const

// Interactive colors — Apple Blue is the ONLY chromatic accent
export const INTERACTIVE_COLORS = {
  appleBlue: '#0071e3', // Primary CTA, focus rings — the singular accent
  linkBlue: '#0066cc', // Inline text links on light backgrounds
  brightBlue: '#2997ff', // Links on dark backgrounds
} as const

// Dark surface variants
export const DARK_SURFACE_COLORS = {
  surface1: '#272729', // Card backgrounds in dark sections
  surface2: '#262628', // Subtle surface variation
  surface3: '#28282a', // Elevated cards on dark backgrounds
  surface4: '#2a2a2d', // Highest dark surface elevation
  surface5: '#242426', // Deepest dark surface tone
} as const

// Button states
export const BUTTON_STATE_COLORS = {
  active: '#ededf2', // Active/pressed state for light buttons
  defaultLight: '#fafafc', // Search/filter button backgrounds
  overlay: 'rgba(210, 210, 215, 0.64)', // Media control scrims
  whiteHover: 'rgba(255, 255, 255, 0.32)', // Hover on dark modal close buttons
} as const

// Semantic colors (functional — NOT brand)
export const SEMANTIC_COLORS = {
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  error: '#EF4444',
  errorLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
} as const

// Shadow
export const SHADOW = {
  card: 'rgba(0, 0, 0, 0.22) 3px 5px 30px 0px',
} as const

// All colors combined
export const COLORS = {
  ...BACKGROUND_COLORS,
  ...TEXT_COLORS,
  ...INTERACTIVE_COLORS,
  ...DARK_SURFACE_COLORS,
  ...BUTTON_STATE_COLORS,
  ...SEMANTIC_COLORS,
} as const

export type ColorKey = keyof typeof COLORS
export type ColorValue = (typeof COLORS)[ColorKey]

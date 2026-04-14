import { Platform } from 'react-native'

// ── Colors (Apple-inspired from DESIGN.md) ──────────────────

export const colors = {
  bg: {
    primary: '#000000',
    secondary: '#f5f5f7',
    white: '#ffffff',
  },
  text: {
    primary: '#1d1d1f',
    secondary: 'rgba(0, 0, 0, 0.8)',
    tertiary: 'rgba(0, 0, 0, 0.48)',
    inverse: '#ffffff',
  },
  interactive: {
    primary: '#0071e3', // Apple Blue — ONLY accent
    link: '#0066cc',
    linkDark: '#2997ff',
    focus: '#0071e3',
  },
  surface: {
    dark1: '#272729',
    dark2: '#262628',
    dark3: '#28282a',
    dark4: '#2a2a2d',
    dark5: '#242426',
  },
  button: {
    active: '#ededf2',
    defaultLight: '#fafafc',
    overlay: 'rgba(210, 210, 215, 0.64)',
  },
  semantic: {
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
  },
} as const

// ── Typography ──────────────────────────────────────────────

export const fontFamily = Platform.select({
  ios: {
    display: 'SF Pro Display',
    body: 'SF Pro Text',
    mono: 'SF Mono',
  },
  android: {
    display: 'Roboto',
    body: 'Roboto',
    mono: 'Roboto Mono',
  },
  default: {
    display: 'System',
    body: 'System',
    mono: 'Courier',
  },
})!

export const typeScale = {
  displayHero: {
    fontSize: 56,
    fontWeight: '600' as const,
    lineHeight: 60,
    letterSpacing: -0.28,
  },
  sectionHeading: {
    fontSize: 40,
    fontWeight: '600' as const,
    lineHeight: 44,
    letterSpacing: 0,
  },
  tileHeading: {
    fontSize: 28,
    fontWeight: '400' as const,
    lineHeight: 32,
    letterSpacing: 0.196,
  },
  cardTitle: {
    fontSize: 21,
    fontWeight: '700' as const,
    lineHeight: 25,
    letterSpacing: 0.231,
  },
  subHeading: {
    fontSize: 21,
    fontWeight: '400' as const,
    lineHeight: 25,
    letterSpacing: 0.231,
  },
  body: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 25,
    letterSpacing: -0.374,
  },
  bodyEmphasis: {
    fontSize: 17,
    fontWeight: '600' as const,
    lineHeight: 21,
    letterSpacing: -0.374,
  },
  button: {
    fontSize: 17,
    fontWeight: '400' as const,
    lineHeight: 41,
    letterSpacing: 0,
  },
  link: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 20,
    letterSpacing: -0.224,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    lineHeight: 18,
    letterSpacing: -0.224,
  },
  captionBold: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 18,
    letterSpacing: -0.224,
  },
  micro: {
    fontSize: 12,
    fontWeight: '400' as const,
    lineHeight: 16,
    letterSpacing: -0.12,
  },
  nano: {
    fontSize: 10,
    fontWeight: '400' as const,
    lineHeight: 15,
    letterSpacing: -0.08,
  },
} as const

// ── Spacing (8px base) ──────────────────────────────────────

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const

// ── Border Radius ───────────────────────────────────────────

export const borderRadius = {
  micro: 5,
  standard: 8,
  comfortable: 11,
  large: 12,
  pill: 980,
  full: 9999,
} as const

// ── Shadows ─────────────────────────────────────────────────

export const shadows = {
  card: {
    shadowColor: '#000000',
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.22,
    shadowRadius: 30,
    elevation: 8,
  },
} as const

// ── Layout ──────────────────────────────────────────────────

export const layout = {
  navHeight: 48,
  maxContentWidth: 980,
  touchTargetMinimum: 44,
} as const

// Apple-inspired typography scale (from DESIGN.md)

export const FONT_FAMILY = {
  display:
    "'Inter', 'SF Pro Display', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  body: "'Inter', 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  mono: "'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace",
} as const

// Complete type scale from DESIGN.md §3
export const TYPE_SCALE = {
  displayHero: {
    size: 56,
    weight: '600',
    lineHeight: 1.07,
    letterSpacing: -0.28,
    font: 'display',
  },
  sectionHeading: {
    size: 40,
    weight: '600',
    lineHeight: 1.1,
    letterSpacing: 0,
    font: 'display',
  },
  tileHeading: {
    size: 28,
    weight: '400',
    lineHeight: 1.14,
    letterSpacing: 0.196,
    font: 'display',
  },
  cardTitle: {
    size: 21,
    weight: '700',
    lineHeight: 1.19,
    letterSpacing: 0.231,
    font: 'display',
  },
  subHeading: {
    size: 21,
    weight: '400',
    lineHeight: 1.19,
    letterSpacing: 0.231,
    font: 'display',
  },
  navHeading: {
    size: 34,
    weight: '600',
    lineHeight: 1.47,
    letterSpacing: -0.374,
    font: 'body',
  },
  subNav: {
    size: 24,
    weight: '300',
    lineHeight: 1.5,
    letterSpacing: 0,
    font: 'body',
  },
  body: {
    size: 17,
    weight: '400',
    lineHeight: 1.47,
    letterSpacing: -0.374,
    font: 'body',
  },
  bodyEmphasis: {
    size: 17,
    weight: '600',
    lineHeight: 1.24,
    letterSpacing: -0.374,
    font: 'body',
  },
  buttonLarge: {
    size: 18,
    weight: '300',
    lineHeight: 1.0,
    letterSpacing: 0,
    font: 'body',
  },
  button: {
    size: 17,
    weight: '400',
    lineHeight: 2.41,
    letterSpacing: 0,
    font: 'body',
  },
  link: {
    size: 14,
    weight: '400',
    lineHeight: 1.43,
    letterSpacing: -0.224,
    font: 'body',
  },
  caption: {
    size: 14,
    weight: '400',
    lineHeight: 1.29,
    letterSpacing: -0.224,
    font: 'body',
  },
  captionBold: {
    size: 14,
    weight: '600',
    lineHeight: 1.29,
    letterSpacing: -0.224,
    font: 'body',
  },
  micro: {
    size: 12,
    weight: '400',
    lineHeight: 1.33,
    letterSpacing: -0.12,
    font: 'body',
  },
  microBold: {
    size: 12,
    weight: '600',
    lineHeight: 1.33,
    letterSpacing: -0.12,
    font: 'body',
  },
  nano: {
    size: 10,
    weight: '400',
    lineHeight: 1.47,
    letterSpacing: -0.08,
    font: 'body',
  },
} as const

// Legacy compat exports (deprecated — use TYPE_SCALE instead)
export const FONT_SIZE = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  display: 36,
} as const

export const FONT_WEIGHT = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const

export const LINE_HEIGHT = {
  compressed: 1.07,
  tight: 1.14,
  snug: 1.24,
  normal: 1.47,
  relaxed: 1.75,
  button: 2.41,
} as const

export type TypeScaleKey = keyof typeof TYPE_SCALE
export type FontSizeKey = keyof typeof FONT_SIZE
export type FontWeightKey = keyof typeof FONT_WEIGHT

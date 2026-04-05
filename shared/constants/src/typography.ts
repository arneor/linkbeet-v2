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
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const

export const LINE_HEIGHT = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.75,
} as const

export const FONT_FAMILY = {
  sans: 'System',
  mono: 'Courier',
} as const

export type FontSizeKey = keyof typeof FONT_SIZE
export type FontWeightKey = keyof typeof FONT_WEIGHT

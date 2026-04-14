// Apple-inspired spacing (base unit: 8px per DESIGN.md)
export const SPACING = {
  0: 0,
  0.25: 2, // Micro adjustments
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

// Apple border-radius scale (from DESIGN.md §5)
export const BORDER_RADIUS = {
  none: 0,
  micro: 5, // Small containers, link tags
  standard: 8, // Buttons, product cards, image containers
  comfortable: 11, // Search inputs, filter buttons
  large: 12, // Feature panels, lifestyle images
  pill: 980, // CTA links ("Learn more", "Shop")
  full: 9999, // Circle (media controls)
} as const

export type SpacingKey = keyof typeof SPACING
export type BorderRadiusKey = keyof typeof BORDER_RADIUS

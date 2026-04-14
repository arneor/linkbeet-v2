// Apple-inspired responsive breakpoints (from DESIGN.md §8)
export const BREAKPOINTS = {
  smMobile: 360, // Small Mobile <360px minimum supported
  mobile: 480, // Mobile 360-480px
  mobileLg: 640, // Mobile Large 480-640px
  tabletSm: 834, // Tablet Small 640-834px (2-col grids begin)
  tablet: 1024, // Tablet 834-1024px
  desktopSm: 1070, // Desktop Small 1024-1070px
  desktop: 1440, // Desktop 1070-1440px (full layout)
  // >1440px = Large Desktop (centered with generous margins)
} as const

// Max content width (from DESIGN.md §5)
export const MAX_CONTENT_WIDTH = 980

// Touch target minimums (from DESIGN.md §8)
export const TOUCH_TARGETS = {
  minimum: 44, // Minimum 44x44px touch target
  navHeight: 48, // Navigation bar height
  ctaPadding: { x: 15, y: 8 }, // Primary CTA padding
} as const

export type BreakpointKey = keyof typeof BREAKPOINTS

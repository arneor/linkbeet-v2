// Used in web/admin for responsive design
// Used in mobile for conditional layouts
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const

export type BreakpointKey = keyof typeof BREAKPOINTS

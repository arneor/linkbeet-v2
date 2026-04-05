// Brand colors
export const BRAND_COLORS = {
  primary: '#6366F1', // Indigo
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  secondary: '#8B5CF6', // Violet
  secondaryLight: '#A78BFA',
  secondaryDark: '#7C3AED',
  accent: '#EC4899', // Pink
} as const

// Semantic colors
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

// Neutral colors
export const NEUTRAL_COLORS = {
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
} as const

// All colors combined
export const COLORS = {
  ...BRAND_COLORS,
  ...SEMANTIC_COLORS,
  ...NEUTRAL_COLORS,
} as const

export type ColorKey = keyof typeof COLORS
export type ColorValue = (typeof COLORS)[ColorKey]

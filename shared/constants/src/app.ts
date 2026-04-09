// App-wide constants
export const APP = {
  NAME: 'Linkbeet',
  VERSION: '2.0.0',
  SUPPORT_EMAIL: 'support@linkbeet.com',
  WEBSITE_URL: 'https://linkbeet.com',
} as const

// Plan limits
export const PLAN_LIMITS = {
  FREE: {
    maxLinks: 5,
    maxAnalyticsDays: 7,
    customDomain: false,
    removesBranding: false,
  },
  PRO: {
    maxLinks: 50,
    maxAnalyticsDays: 90,
    customDomain: true,
    removesBranding: true,
  },
  BUSINESS: {
    maxLinks: -1, // unlimited
    maxAnalyticsDays: 365,
    customDomain: true,
    removesBranding: true,
  },
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
} as const

// Link types
export const LINK_TYPES = ['url', 'email', 'phone', 'social', 'file'] as const

export type LinkType = (typeof LINK_TYPES)[number]
export type PlanType = 'FREE' | 'PRO' | 'BUSINESS'
export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN'

// ─── PRD v2.3 additions ──────────────────────────────────────

// Account modes
export const ACCOUNT_MODES = {
  NORMAL: 'NORMAL',
  BUSINESS: 'BUSINESS',
} as const

// Catalogue item types
export const CATALOGUE_ITEM_TYPES = {
  PRODUCT: 'PRODUCT',
  SERVICE: 'SERVICE',
} as const

// Connection statuses
export const CONNECTION_STATUSES = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
} as const

// Order statuses
export const ORDER_STATUSES = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPED: 'SHIPPED',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
} as const

// Booking statuses
export const BOOKING_STATUSES = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
  NO_SHOW: 'NO_SHOW',
} as const

// Payment
export const PAYMENT = {
  CURRENCY: 'INR',
  PLATFORM_COMMISSION_MIN: 0.02, // 2%
  PLATFORM_COMMISSION_MAX: 0.05, // 5%
} as const

// Discovery
export const DISCOVERY = {
  DEFAULT_RADIUS_KM: 5,
  MAX_RADIUS_KM: 50,
  DEFAULT_RESULTS: 20,
  MEILISEARCH_INDEX_PROFILES: 'profiles',
  MEILISEARCH_INDEX_CATALOGUE: 'catalogue',
} as const

// Default screens per mode
export const DEFAULT_SCREENS = {
  NORMAL: 'discovery',
  BUSINESS: 'dashboard',
} as const

export type AccountMode = keyof typeof ACCOUNT_MODES
export type CatalogueItemType = keyof typeof CATALOGUE_ITEM_TYPES

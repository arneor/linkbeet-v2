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

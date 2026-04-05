// Centralized React Query keys
// Used by web, admin, and mobile
export const QUERY_KEYS = {
  auth: {
    all: ['auth'] as const,
    currentUser: () => ['auth', 'current-user'] as const,
  },
  profile: {
    all: ['profile'] as const,
    byUsername: (username: string) => ['profile', username] as const,
  },
  links: {
    all: ['links'] as const,
    list: () => ['links', 'list'] as const,
    detail: (id: string) => ['links', 'detail', id] as const,
  },
  analytics: {
    all: ['analytics'] as const,
    overview: () => ['analytics', 'overview'] as const,
    clicks: (linkId?: string) => ['analytics', 'clicks', linkId] as const,
  },
} as const

export interface User {
  id: string
  email: string
  username: string
  name: string | null
  avatar: string | null
  bio: string | null
  isVerified: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Link {
  id: string
  userId: string
  title: string
  url: string
  icon: string | null
  isActive: boolean
  order: number
  clicks: number
  createdAt: Date
  updatedAt: Date
}

export interface Profile {
  id: string
  userId: string
  username: string
  displayName: string
  bio: string | null
  avatar: string | null
  coverImage: string | null
  theme: string
  links: Link[]
  socialLinks: SocialLink[]
  isPublic: boolean
  views: number
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface ApiResponse<T> {
  success: boolean
  data: T | null
  error: string | null
  message: string | null
  statusCode: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export type UserRole = 'user' | 'admin' | 'superadmin'

export interface JwtPayload {
  sub: string
  email: string
  role: UserRole
  iat: number
  exp: number
}

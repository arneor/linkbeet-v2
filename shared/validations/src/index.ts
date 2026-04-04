import { z } from 'zod'

// ─── User Schemas ─────────────────────────────────────────────
export const userSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email('Invalid email address'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .regex(
      /^[a-z0-9_-]+$/,
      'Username can only contain lowercase letters, numbers, hyphens and underscores',
    ),
  name: z.string().min(1).max(100).nullable().optional(),
  avatar: z.string().url().nullable().optional(),
  bio: z.string().max(500).nullable().optional(),
  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
})

export const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must not exceed 30 characters')
    .regex(
      /^[a-z0-9_-]+$/,
      'Username can only contain lowercase letters, numbers, hyphens and underscores',
    ),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  name: z.string().min(1).max(100).optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>

// ─── Link Schemas ─────────────────────────────────────────────
export const linkSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, 'Title is required').max(100),
  url: z.string().url('Must be a valid URL'),
  icon: z.string().nullable().optional(),
  isActive: z.boolean().default(true),
  order: z.number().int().min(0).default(0),
})

export const createLinkSchema = linkSchema.omit({ id: true })
export const updateLinkSchema = linkSchema.partial().omit({ id: true })

export type LinkInput = z.infer<typeof linkSchema>
export type CreateLinkInput = z.infer<typeof createLinkSchema>
export type UpdateLinkInput = z.infer<typeof updateLinkSchema>

// ─── Profile Schemas ──────────────────────────────────────────
export const profileSchema = z.object({
  displayName: z.string().min(1).max(100),
  bio: z.string().max(500).nullable().optional(),
  avatar: z.string().url().nullable().optional(),
  coverImage: z.string().url().nullable().optional(),
  theme: z.string().default('default'),
  isPublic: z.boolean().default(true),
})

export const updateProfileSchema = profileSchema.partial()

export type ProfileInput = z.infer<typeof profileSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

// ─── Pagination Schema ────────────────────────────────────────
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
})

export type PaginationInput = z.infer<typeof paginationSchema>

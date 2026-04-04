import { z } from 'zod';

// ─── User Schemas ─────────────────────────────────────────────────────────────

export const userSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, 'Name is required').max(100).optional().nullable(),
  email: z.string().email('Invalid email address'),
  image: z.string().url('Invalid image URL').optional().nullable(),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password is too long')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const updateProfileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100).optional(),
  image: z.string().url('Invalid image URL').optional().nullable(),
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number'
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ['confirmNewPassword'],
  });

// ─── Link Schemas ─────────────────────────────────────────────────────────────

export const linkSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  url: z.string().url('Invalid URL'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(50, 'Slug is too long')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug can only contain lowercase letters, numbers, and hyphens'
    ),
  description: z.string().max(500, 'Description is too long').optional().nullable(),
  isActive: z.boolean().default(true),
  clicks: z.number().int().nonnegative().default(0),
  userId: z.string().cuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createLinkSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  url: z.string().url('Invalid URL — make sure to include http:// or https://'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .max(50, 'Slug is too long')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug can only contain lowercase letters, numbers, and hyphens'
    ),
  description: z.string().max(500, 'Description is too long').optional(),
  isActive: z.boolean().default(true),
});

export const updateLinkSchema = createLinkSchema.partial();

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────

export type User = z.infer<typeof userSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type Link = z.infer<typeof linkSchema>;
export type CreateLinkInput = z.infer<typeof createLinkSchema>;
export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;

import { NextRequest, NextResponse } from 'next/server'

// ─── Types ────────────────────────────────────────────────────
interface MockProfile {
  id: string
  userId: string
  displayName: string
  tagline: string | null
  avatarUrl: string | null
  backgroundUrl: string | null
  themeId: string | null
  socialLinks: Record<string, string>
  seoTitle: string | null
  seoDescription: string | null
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

interface UpdateProfileBody {
  displayName?: string
  tagline?: string
  avatarUrl?: string
  backgroundUrl?: string
  themeId?: string
  socialLinks?: Record<string, string>
  seoTitle?: string
  seoDescription?: string
  isPublic?: boolean
}

// ─── Mock data ────────────────────────────────────────────────
const mockProfile: MockProfile = {
  id: 'profile_clx1234567890',
  userId: 'user_clx1234567890',
  displayName: 'John Doe',
  tagline: 'Full-stack developer & creator',
  avatarUrl: null,
  backgroundUrl: null,
  themeId: 'default',
  socialLinks: {
    twitter: 'https://twitter.com/johndoe',
    github: 'https://github.com/johndoe',
  },
  seoTitle: "John Doe's Links",
  seoDescription: 'Check out all my links in one place',
  isPublic: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

/**
 * GET /api/profile
 * Returns the current authenticated user's profile
 */
export async function GET(_request: NextRequest): Promise<NextResponse> {
  // TODO: replace with session check + DB query
  // const session = await auth()
  // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // const profile = await prisma.profile.findUnique({ where: { userId: session.user.id } })

  return NextResponse.json({
    success: true,
    data: mockProfile,
    error: null,
    message: null,
    statusCode: 200,
  })
}

/**
 * PATCH /api/profile
 * Updates the current authenticated user's profile
 */
export async function PATCH(request: NextRequest): Promise<NextResponse> {
  // TODO: replace with session check + DB update
  // const session = await auth()
  // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: UpdateProfileBody

  try {
    body = (await request.json()) as UpdateProfileBody
  } catch {
    return NextResponse.json(
      { success: false, data: null, error: 'Invalid JSON body', message: null, statusCode: 400 },
      { status: 400 },
    )
  }

  const updated: MockProfile = {
    ...mockProfile,
    ...body,
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json({
    success: true,
    data: updated,
    error: null,
    message: 'Profile updated successfully',
    statusCode: 200,
  })
}

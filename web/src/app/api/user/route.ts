import { NextRequest, NextResponse } from 'next/server'

// ─── Types ────────────────────────────────────────────────────
interface MockUser {
  id: string
  email: string
  name: string | null
  username: string
  avatar: string | null
  bio: string | null
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN'
  plan: 'FREE' | 'PRO' | 'BUSINESS'
  isActive: boolean
  emailVerified: string | null
  createdAt: string
  updatedAt: string
}

// ─── Mock data ────────────────────────────────────────────────
const mockUser: MockUser = {
  id: 'user_clx1234567890',
  email: 'john@example.com',
  name: 'John Doe',
  username: 'johndoe',
  avatar: null,
  bio: 'Full-stack developer & creator',
  role: 'USER',
  plan: 'FREE',
  isActive: true,
  emailVerified: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

/**
 * GET /api/user
 * Returns the current authenticated user info
 */
export async function GET(_request: NextRequest): Promise<NextResponse> {
  // TODO: replace with session check + DB query
  // const session = await auth()
  // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // const user = await prisma.user.findUnique({ where: { id: session.user.id } })

  return NextResponse.json({
    success: true,
    data: mockUser,
    error: null,
    message: null,
    statusCode: 200,
  })
}

/**
 * DELETE /api/user
 * Deletes the current authenticated user account (placeholder)
 */
export async function DELETE(_request: NextRequest): Promise<NextResponse> {
  // TODO: replace with session check + DB delete + cleanup
  // const session = await auth()
  // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // await prisma.user.delete({ where: { id: session.user.id } })

  return NextResponse.json({
    success: true,
    data: null,
    error: null,
    message: 'Account deleted successfully. We are sad to see you go.',
    statusCode: 200,
  })
}

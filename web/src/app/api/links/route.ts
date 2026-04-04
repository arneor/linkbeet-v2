import { NextRequest, NextResponse } from 'next/server'

// ─── Types ────────────────────────────────────────────────────
interface MockLink {
  id: string
  userId: string
  title: string
  url: string
  icon: string | null
  position: number
  isActive: boolean
  clicks: number
  scheduleAt: string | null
  expireAt: string | null
  createdAt: string
  updatedAt: string
}

interface CreateLinkBody {
  title: string
  url: string
  icon?: string
}

// ─── Mock data ────────────────────────────────────────────────
const mockLinks: MockLink[] = [
  {
    id: 'link_001',
    userId: 'user_clx1234567890',
    title: 'My Website',
    url: 'https://example.com',
    icon: '🌐',
    position: 0,
    isActive: true,
    clicks: 142,
    scheduleAt: null,
    expireAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'link_002',
    userId: 'user_clx1234567890',
    title: 'GitHub',
    url: 'https://github.com/johndoe',
    icon: '💻',
    position: 1,
    isActive: true,
    clicks: 98,
    scheduleAt: null,
    expireAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'link_003',
    userId: 'user_clx1234567890',
    title: 'Twitter / X',
    url: 'https://twitter.com/johndoe',
    icon: '🐦',
    position: 2,
    isActive: true,
    clicks: 77,
    scheduleAt: null,
    expireAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

/**
 * GET /api/links
 * Returns all links for the current authenticated user
 */
export async function GET(_request: NextRequest): Promise<NextResponse> {
  // TODO: replace with session check + DB query
  // const session = await auth()
  // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  // const links = await prisma.link.findMany({ where: { userId: session.user.id }, orderBy: { position: 'asc' } })

  return NextResponse.json({
    success: true,
    data: mockLinks,
    error: null,
    message: null,
    statusCode: 200,
  })
}

/**
 * POST /api/links
 * Creates a new link for the current authenticated user
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  // TODO: replace with session check + DB create
  // const session = await auth()
  // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let body: CreateLinkBody

  try {
    body = (await request.json()) as CreateLinkBody
  } catch {
    return NextResponse.json(
      { success: false, data: null, error: 'Invalid JSON body', message: null, statusCode: 400 },
      { status: 400 },
    )
  }

  if (!body.title || !body.url) {
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: 'title and url are required',
        message: null,
        statusCode: 422,
      },
      { status: 422 },
    )
  }

  const newLink: MockLink = {
    id: `link_${Date.now()}`,
    userId: 'user_clx1234567890',
    title: body.title,
    url: body.url,
    icon: body.icon ?? null,
    position: mockLinks.length,
    isActive: true,
    clicks: 0,
    scheduleAt: null,
    expireAt: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json(
    {
      success: true,
      data: newLink,
      error: null,
      message: 'Link created successfully',
      statusCode: 201,
    },
    { status: 201 },
  )
}

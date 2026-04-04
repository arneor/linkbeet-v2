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

interface UpdateLinkBody {
  title?: string
  url?: string
  icon?: string | null
  position?: number
  isActive?: boolean
  scheduleAt?: string | null
  expireAt?: string | null
}

interface RouteParams {
  params: Promise<{ id: string }>
}

// ─── Mock helper ──────────────────────────────────────────────
function getMockLink(id: string): MockLink | null {
  const links: MockLink[] = [
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
  ]
  return links.find((l) => l.id === id) ?? null
}

/**
 * GET /api/links/[id]
 * Returns a single link by ID
 */
export async function GET(_request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params

  // TODO: replace with session check + DB query
  // const link = await prisma.link.findFirst({ where: { id, userId: session.user.id } })

  const link = getMockLink(id)

  if (!link) {
    return NextResponse.json(
      { success: false, data: null, error: 'Link not found', message: null, statusCode: 404 },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    data: link,
    error: null,
    message: null,
    statusCode: 200,
  })
}

/**
 * PATCH /api/links/[id]
 * Updates a link by ID
 */
export async function PATCH(request: NextRequest, { params }: RouteParams): Promise<NextResponse> {
  const { id } = await params

  const existingLink = getMockLink(id)
  if (!existingLink) {
    return NextResponse.json(
      { success: false, data: null, error: 'Link not found', message: null, statusCode: 404 },
      { status: 404 },
    )
  }

  let body: UpdateLinkBody

  try {
    body = (await request.json()) as UpdateLinkBody
  } catch {
    return NextResponse.json(
      { success: false, data: null, error: 'Invalid JSON body', message: null, statusCode: 400 },
      { status: 400 },
    )
  }

  const updated: MockLink = {
    ...existingLink,
    ...body,
    id,
    updatedAt: new Date().toISOString(),
  }

  return NextResponse.json({
    success: true,
    data: updated,
    error: null,
    message: 'Link updated successfully',
    statusCode: 200,
  })
}

/**
 * DELETE /api/links/[id]
 * Deletes a link by ID
 */
export async function DELETE(
  _request: NextRequest,
  { params }: RouteParams,
): Promise<NextResponse> {
  const { id } = await params

  // TODO: replace with session check + DB delete
  // await prisma.link.delete({ where: { id, userId: session.user.id } })

  const existing = getMockLink(id)
  if (!existing) {
    return NextResponse.json(
      { success: false, data: null, error: 'Link not found', message: null, statusCode: 404 },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    data: { id },
    error: null,
    message: 'Link deleted successfully',
    statusCode: 200,
  })
}

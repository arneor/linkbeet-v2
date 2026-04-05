import { NextRequest, NextResponse } from 'next/server'

// ─── Types ────────────────────────────────────────────────────
interface TopLink {
  id: string
  title: string
  url: string
  clicks: number
}

interface DailyStats {
  date: string
  views: number
  clicks: number
}

interface AnalyticsData {
  totalClicks: number
  totalViews: number
  uniqueVisitors: number
  clickThroughRate: number
  topLinks: TopLink[]
  dailyStats: DailyStats[]
  period: string
}

/**
 * GET /api/analytics
 * Returns analytics data for the current authenticated user
 */
export async function GET(_request: NextRequest): Promise<NextResponse> {
  // TODO: replace with session check + real analytics query (DB / analytics service)
  // const session = await auth()
  // if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const now = new Date()
  const dailyStats: DailyStats[] = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(now)
    d.setDate(d.getDate() - (6 - i))
    return {
      date: d.toISOString().split('T')[0] || '',
      views: Math.floor(Math.random() * 200) + 50,
      clicks: Math.floor(Math.random() * 80) + 10,
    }
  })

  const analyticsData: AnalyticsData = {
    totalClicks: 317,
    totalViews: 1248,
    uniqueVisitors: 843,
    clickThroughRate: 25.4,
    topLinks: [
      { id: 'link_001', title: 'My Website', url: 'https://example.com', clicks: 142 },
      { id: 'link_002', title: 'GitHub', url: 'https://github.com/johndoe', clicks: 98 },
      { id: 'link_003', title: 'Twitter / X', url: 'https://twitter.com/johndoe', clicks: 77 },
    ],
    dailyStats,
    period: 'last_7_days',
  }

  return NextResponse.json({
    success: true,
    data: analyticsData,
    error: null,
    message: null,
    statusCode: 200,
  })
}

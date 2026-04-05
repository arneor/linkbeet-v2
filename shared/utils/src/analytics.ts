// Calculate percentage change
export function percentageChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0
  return Math.round(((current - previous) / previous) * 100)
}

// Calculate click through rate
export function clickThroughRate(clicks: number, views: number): number {
  if (views === 0) return 0
  return Math.round((clicks / views) * 100 * 100) / 100
}

// Get date range labels
export function getDateRangeLabel(days: number): string {
  const map: Record<number, string> = {
    7: 'Last 7 days',
    30: 'Last 30 days',
    90: 'Last 90 days',
    365: 'Last year',
  }
  return map[days] ?? `Last ${days} days`
}

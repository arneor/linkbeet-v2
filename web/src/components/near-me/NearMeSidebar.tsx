import { QuickActions } from './QuickActions'
import { RecentlyViewed } from './RecentlyViewed'
import { TrendingOffers } from './TrendingOffers'

import type { TrendingOffer, RecentlyViewedItem } from '@/data/types'

interface NearMeSidebarProps {
  trendingOffers: TrendingOffer[]
  recentlyViewed: RecentlyViewedItem[]
}

export function NearMeSidebar({ trendingOffers, recentlyViewed }: NearMeSidebarProps) {
  return (
    <div className="flex flex-col gap-5">
      <QuickActions />
      <TrendingOffers items={trendingOffers} />
      <RecentlyViewed items={recentlyViewed} />
    </div>
  )
}

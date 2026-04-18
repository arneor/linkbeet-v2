import type { TrendingOffer, RecentlyViewedItem } from '@/data/types'
import { QuickActions } from './QuickActions'
import { TrendingOffers } from './TrendingOffers'
import { RecentlyViewed } from './RecentlyViewed'

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

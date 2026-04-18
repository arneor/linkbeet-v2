import type { Category, TopRatedItem, AllNearbyItem, TrendingOffer, RecentlyViewedItem } from '@/data/types'
import { CategoryFilter } from './CategoryFilter'
import { PromoBanner } from './PromoBanner'
import { TopRatedGrid } from './TopRatedGrid'
import { AllNearbyList } from './AllNearbyList'
import { MobileQuickActions } from './QuickActions'
import { TrendingOffers } from './TrendingOffers'
import { RecentlyViewed } from './RecentlyViewed'

interface NearMeMainProps {
  categories: Category[]
  activeCategory: number
  onCategoryChange: (i: number) => void
  topRatedItems: TopRatedItem[]
  allNearbyItems: AllNearbyItem[]
  trendingOffers: TrendingOffer[]
  recentlyViewed: RecentlyViewedItem[]
}

export function NearMeMain({
  categories,
  activeCategory,
  onCategoryChange,
  topRatedItems,
  allNearbyItems,
  trendingOffers,
  recentlyViewed,
}: NearMeMainProps) {
  return (
    <div className="flex flex-col min-w-0 h-[calc(100vh-120px)] lg:h-full">
      <div className="shrink-0 pb-2">
        <div className="hidden lg:flex items-center justify-between mb-3 pt-1">
          <h1 className="text-[26px] font-semibold text-slate-900 tracking-tight">Near Me</h1>
          <button className="flex items-center gap-2 px-3 py-1.5 text-[13px] font-medium text-slate-600 bg-white border border-slate-200 rounded-[8px] hover:bg-slate-50 transition-colors shadow-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="8" y1="12" x2="16" y2="12" />
              <line x1="11" y1="18" x2="13" y2="18" />
            </svg>
            Filters
          </button>
        </div>

        <CategoryFilter
          categories={categories}
          activeIndex={activeCategory}
          onChange={onCategoryChange}
        />
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 -mr-2 pr-2 pb-8 custom-scrollbar">
        <PromoBanner />

        <div className="lg:hidden mt-6 mb-2">
          <MobileQuickActions />
        </div>

        <TopRatedGrid items={topRatedItems} />

        <div className="lg:hidden mb-8">
          <TrendingOffers items={trendingOffers} />
        </div>

        <AllNearbyList items={allNearbyItems} />

        <div className="lg:hidden mt-2">
          <RecentlyViewed items={recentlyViewed} />
        </div>
      </div>
    </div>
  )
}

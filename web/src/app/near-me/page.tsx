'use client'

import { useState } from 'react'
import { CATEGORIES, TOP_RATED, ALL_NEARBY, TRENDING_OFFERS, RECENTLY_VIEWED } from '@/data/near-me'
import {
  NearMeTopBar,
  NearMeMobileHeader,
  NearMeSearchBar,
  NearMeMain,
  NearMeSidebar,
} from '@/components/near-me'

export default function NearMePage() {
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <>
      <NearMeTopBar />

      <div className="lg:hidden flex flex-col pt-3 pb-4">
        <NearMeMobileHeader />
        <NearMeSearchBar />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-120px)]">
        <div className="w-full lg:w-[70%] min-w-0 h-full">
          <NearMeMain
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            topRatedItems={TOP_RATED}
            allNearbyItems={ALL_NEARBY}
            trendingOffers={TRENDING_OFFERS}
            recentlyViewed={RECENTLY_VIEWED}
          />
        </div>
        <div className="hidden lg:block w-full lg:w-[30%] h-full overflow-y-auto pr-2 pb-8 custom-scrollbar">
          <NearMeSidebar
            trendingOffers={TRENDING_OFFERS}
            recentlyViewed={RECENTLY_VIEWED}
          />
        </div>
      </div>
    </>
  )
}

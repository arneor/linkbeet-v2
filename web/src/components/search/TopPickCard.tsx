import { StarIcon } from '@/components/ui/StarIcon'
import { VerifiedIcon } from '@/components/ui/VerifiedIcon'
import { SEARCH_RESULTS } from '@/data/search'

export function TopPickCard() {
  const topPick = SEARCH_RESULTS[0]

  return (
    <div>
      <div className="flex justify-between items-end mb-3">
        <h3 className="text-[16px] font-semibold text-slate-900 tracking-tight">Top Pick</h3>
        <span className="flex items-center gap-1 px-2 py-0.5 bg-orange-100/50 text-[#e65100] text-[11px] font-medium rounded-md border border-orange-200/50">
          <StarIcon className="w-3 h-3 text-[#e65100]" />
          Highest Rated
        </span>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="h-[120px] w-full bg-gradient-to-r from-orange-400 to-orange-500" />
        <div className="p-4">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold text-slate-900 text-[15px] flex items-center gap-1">
              {topPick.name}
              <VerifiedIcon className="w-[16px] h-[16px] text-accent shrink-0" />
            </h4>
          </div>
          <div className="flex items-center gap-1.5 text-[13px] text-slate-500 mb-4">
            <StarIcon className="w-3.5 h-3.5 text-slate-800" />
            <span className="font-medium text-slate-900">{topPick.rating}</span>
            <span>· {topPick.reviewCount} reviews</span>
            <span>· {topPick.distanceKm} km</span>
          </div>
          <button className="w-full py-2 bg-[#1d1d1f] hover:bg-black text-white text-[13px] font-medium rounded-full flex justify-center items-center gap-2 transition-colors">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Visit Bio
          </button>
        </div>
      </div>
    </div>
  )
}

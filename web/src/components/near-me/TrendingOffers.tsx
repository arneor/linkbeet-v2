import type { TrendingOffer } from '@/data/types'

interface TrendingOffersProps {
  items: TrendingOffer[]
}

export function TrendingOffers({ items }: TrendingOffersProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[14px] font-semibold text-slate-900">Trending Offers</h3>
        <a href="#" className="text-[12px] text-accent font-medium hover:underline">
          See All
        </a>
      </div>
      <div className="bg-white rounded-[12px] border border-slate-200 p-3">
        <ul className="space-y-3.5">
          {items.map((offer) => (
            <li key={offer.id} className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm shrink-0"
                style={{ backgroundColor: offer.iconBg }}
              >
                {offer.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-slate-900 truncate">{offer.label}</p>
                <p className="text-[11px] text-slate-400 truncate">{offer.sub}</p>
                {offer.bioLink && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className="w-3 h-3 text-accent shrink-0"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    <a
                      href={`https://${offer.bioLink}`}
                      className="text-[11px] text-accent font-medium hover:underline truncate"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {offer.bioLink}
                    </a>
                  </div>
                )}
              </div>
              {offer.badge && (
                <span className="px-1.5 py-0.5 text-[9px] font-bold text-orange-700 bg-orange-100 rounded-full shrink-0">
                  {offer.badge}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

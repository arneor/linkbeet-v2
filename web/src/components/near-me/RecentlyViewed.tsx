import type { RecentlyViewedItem } from '@/data/types'
import { StarIcon } from '@/components/ui/StarIcon'

interface RecentlyViewedProps {
  items: RecentlyViewedItem[]
}

export function RecentlyViewed({ items }: RecentlyViewedProps) {
  return (
    <div>
      <h3 className="text-[14px] font-semibold text-slate-900 mb-3">Recently Viewed</h3>
      <ul className="space-y-3.5">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-2.5">
            <div
              className="w-9 h-9 rounded-full shrink-0"
              style={{ backgroundColor: item.avatarColor }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-slate-900 truncate">{item.name}</p>
              <p className="text-[11px] text-slate-400">{item.category} · {item.distanceKm} km</p>
              {item.bioLink && (
                <div className="flex items-center gap-1 mt-0.5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-accent shrink-0">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                  <a href={`https://${item.bioLink}`} className="text-[11px] text-accent font-medium hover:underline truncate" onClick={e => e.stopPropagation()}>
                    {item.bioLink}
                  </a>
                </div>
              )}
            </div>
            <div className="flex items-center gap-0.5 shrink-0">
              <StarIcon className="w-3 h-3 text-slate-600" />
              <span className="text-[11px] font-medium text-slate-600">{item.rating}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

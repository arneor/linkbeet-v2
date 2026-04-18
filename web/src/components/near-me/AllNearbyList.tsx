import { StarIcon } from '@/components/ui/StarIcon'
import type { AllNearbyItem } from '@/data/types'

interface AllNearbyListProps {
  items: AllNearbyItem[]
}

export function AllNearbyList({ items }: AllNearbyListProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[18px] font-semibold text-slate-900 tracking-tight">All Nearby</h2>
        <button className="flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-slate-600 transition-colors">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-3.5 h-3.5"
          >
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="m21 8-4-4-4 4" />
            <path d="M17 4v16" />
          </svg>
          Distance
        </button>
      </div>
      <div className="flex flex-col gap-6 pb-6">
        {items.map((item) => (
          <article
            key={item.id}
            className="flex items-center gap-4 bg-transparent rounded-none border-none p-0 cursor-pointer group"
          >
            {/* Left: Avatar block */}
            <div
              className="w-[64px] h-[64px] rounded-[12px] shrink-0"
              style={{ backgroundColor: item.avatarColor }}
            />

            {/* Middle & Right: Content */}
            <div className="flex-1 min-w-0 flex justify-between items-center">
              <div className="flex flex-col items-start gap-1 overflow-hidden pr-4">
                <p className="text-[16px] font-semibold text-slate-900 truncate w-full">
                  {item.name}
                </p>

                <p className="text-[13px] text-slate-500 truncate w-full">
                  {item.category} • {item.distanceKm} km
                </p>

                {item.bioLink && (
                  <div className="flex items-center gap-1 w-full">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-[14px] h-[14px] text-accent shrink-0"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                    <a
                      href={`https://${item.bioLink}`}
                      className="text-[13px] text-accent font-medium hover:underline truncate w-full"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {item.bioLink}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-1.5 mt-0.5">
                  {/* Render native tags like 24/7, plus the semantic badges */}
                  {item.tags?.map((t: string) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-600 rounded-[6px]"
                    >
                      {t}
                    </span>
                  ))}
                  {item.badge && (
                    <span className="px-2 py-0.5 text-[11px] font-medium bg-accent/10 text-accent rounded-[6px]">
                      {item.badge}
                    </span>
                  )}
                  {item.offerLabel && (
                    <span className="px-2 py-0.5 text-[11px] font-medium bg-orange-50 text-[#e65c00] rounded-[6px]">
                      {item.offerLabel}
                    </span>
                  )}
                </div>
              </div>

              {/* Far Right: Rating */}
              <div className="shrink-0 flex items-center gap-1 font-semibold text-slate-900">
                <StarIcon className="w-4 h-4 text-amber-400" />
                <span className="text-[14px]">{item.rating}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

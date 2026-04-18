import type { TopRatedItem } from '@/data/types'

interface TopRatedGridProps {
  items: TopRatedItem[]
}

export function TopRatedGrid({ items }: TopRatedGridProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-4 mt-2">
        <h2 className="text-[19px] font-bold text-slate-900 tracking-tight">Top Rated Near You</h2>
        <a href="#" className="text-[14px] text-accent font-medium hover:underline flex items-center gap-1">
          See All
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[14px] h-[14px]">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </a>
      </div>
      <div className="flex md:grid md:grid-cols-3 gap-5 mb-8 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 md:mx-0 md:px-0">
        {items.map((item) => (
          <article
            key={item.id}
            className="w-[280px] md:w-auto shrink-0 snap-center bg-white border border-slate-200/80 rounded-[20px] overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-200 cursor-pointer group flex flex-col"
          >
            <div
              className="h-[160px] md:h-[180px] relative shrink-0"
              style={{ background: `linear-gradient(135deg, ${item.avatarColor}aa 0%, ${item.avatarColor} 100%)` }}
            >
              <span className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-white shadow-sm text-[13px] font-bold text-slate-900 rounded-full">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 text-accent">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {item.rating}
              </span>
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <p className="text-[17px] font-bold text-slate-900 truncate mb-[2px]">{item.name}</p>
              <p className="text-[14px] text-slate-500 mb-2 truncate">
                {item.category} • {item.distanceKm} km
              </p>
              {item.bioLink && (
                <div className="flex items-center gap-1.5 mb-2 w-full">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[14px] h-[14px] text-accent shrink-0">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                  </svg>
                  <a href={`https://${item.bioLink}`} className="text-[13px] text-accent font-medium hover:underline truncate w-full" onClick={e => e.stopPropagation()}>
                    {item.bioLink}
                  </a>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-auto">
                {item.tags.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-[12px] font-medium text-slate-600 bg-slate-100 rounded-[8px]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}

'use client'

import { StarIcon } from '@/components/ui/StarIcon'
import { VerifiedIcon } from '@/components/ui/VerifiedIcon'
import type { SearchResult } from '@/data/types'

interface ResultCardProps {
  item: SearchResult
  isActive: boolean
  onHover: () => void
}

export function ResultCard({ item, isActive, onHover }: ResultCardProps) {
  return (
    <article
      className={`px-4 py-5 lg:px-12 xl:px-20 cursor-pointer transition-colors duration-150 border-b border-slate-200 last:border-b-0 group ${isActive ? 'bg-[#f8f9fa]' : 'hover:bg-[#f8f9fa] bg-white'}`}
      onMouseEnter={onHover}
    >
      <div className="flex items-start gap-4 mb-2">
        <div
          className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-white text-lg font-semibold shadow-sm"
          style={{ background: item.avatarBg }}
          aria-hidden="true"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 pt-0.5">
            <h3 className="text-[16px] font-semibold text-slate-900 tracking-tight leading-snug truncate">
              {item.name}
            </h3>
            {item.isVerified && <VerifiedIcon className="w-[18px] h-[18px] text-accent shrink-0" />}
          </div>
          <p className="text-[13px] text-link truncate group-hover:underline">{item.handle}</p>
        </div>
      </div>

      <div className="pl-16">
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mb-2">
          <div className="flex items-center gap-1">
            <StarIcon className="w-3.5 h-3.5 text-slate-800" />
            <span className="text-[13px] font-medium text-slate-900">{item.rating}</span>
            <span className="text-[13px] text-slate-500">({item.reviewCount})</span>
          </div>
          <span className="text-slate-300">·</span>
          <span className="text-[13px] text-slate-500">{item.category || 'Saloon'}</span>
          <span className="text-slate-300">·</span>
          <span className="text-[13px] text-slate-500">{item.distanceKm} km</span>
          <span className="text-slate-300">·</span>
          {item.isOpenNow ? (
            <span className="text-[13px] font-medium text-emerald-600">Open now</span>
          ) : (
            <span className="text-[13px] font-medium text-red-500">Closes {item.closingTime}</span>
          )}
        </div>

        <p className="text-[13.5px] text-slate-600 leading-relaxed mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-medium text-slate-600 bg-slate-100 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

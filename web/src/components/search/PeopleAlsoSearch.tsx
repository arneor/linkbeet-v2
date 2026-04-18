'use client'

import { PEOPLE_ALSO_SEARCH } from '@/data/search'

export function PeopleAlsoSearch() {
  return (
    <div>
      <h3 className="text-[16px] font-semibold text-slate-900 tracking-tight mb-3">
        People also search
      </h3>
      <div className="flex flex-col gap-2">
        {PEOPLE_ALSO_SEARCH.map((term) => (
          <button
            key={term}
            className="flex justify-between items-center w-full bg-white px-4 py-3 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors group"
          >
            <div className="flex items-center gap-3 text-[14px] text-slate-600">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[18px] h-[18px] text-slate-400">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              {term}
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[16px] h-[16px] text-slate-300 group-hover:text-slate-500 transition-colors">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}

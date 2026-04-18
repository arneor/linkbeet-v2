'use client'

import { useState } from 'react'
import { SearchInput } from '@/components/ui'

export function NearMeSearchBar() {
  const [query, setQuery] = useState('')

  return (
    <div className="relative">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search nearby places..."
        className="w-full h-11 bg-white border border-slate-200 rounded-[24px] pl-10 pr-24 text-[14px] text-slate-900 placeholder:text-slate-500 outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
      />
      <button className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1 px-3 py-[6px] bg-slate-50 rounded-full border border-slate-100 text-[12px] text-accent font-semibold whitespace-nowrap hover:bg-slate-100 transition-colors">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        2 km
      </button>
    </div>
  )
}

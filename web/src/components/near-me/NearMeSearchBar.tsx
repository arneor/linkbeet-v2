'use client'

import { ArrowRight, Mic } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { SearchInput } from '@/components/ui'

export function NearMeSearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="relative">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <SearchInput
        value={query}
        onChange={setQuery}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleSearch()
          }
        }}
        placeholder="Search nearby places..."
        className="w-full h-11 bg-white border border-slate-200 rounded-[24px] pl-10 pr-[120px] text-[14px] text-slate-900 placeholder:text-slate-500 outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
      />

      <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5">
        <button className="flex items-center gap-1 px-3 py-[6px] bg-slate-50 rounded-full border border-slate-100 text-[12px] text-accent font-semibold whitespace-nowrap hover:bg-slate-100 transition-colors mr-1">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-3.5 h-3.5"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="hidden sm:inline">2 km</span>
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
          aria-label="Voice search"
        >
          <Mic className="w-4 h-4" />
        </button>
        <button
          onClick={handleSearch}
          className={[
            'flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200',
            query.length > 0
              ? 'bg-accent text-white hover:bg-accent-hover shadow-sm scale-100'
              : 'bg-slate-100 text-slate-300 scale-95',
          ].join(' ')}
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

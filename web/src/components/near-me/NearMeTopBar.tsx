'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Mic } from 'lucide-react'

export function NearMeTopBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div className="hidden lg:flex items-center justify-between gap-4 pb-3 mb-5 border-b border-slate-200 -mx-6 px-6">
      <nav className="text-[13px] text-slate-400 whitespace-nowrap shrink-0" aria-label="Breadcrumb">
        <span>Home</span>
        <span className="mx-1.5">/</span>
        <span className="text-slate-900 font-medium">Near Me</span>
      </nav>

      <div className="flex items-center gap-3">
        <div className="relative flex items-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
            placeholder="Search nearby places..."
            className="w-[280px] bg-white border border-slate-200 rounded-full py-[7px] pl-9 pr-[68px] text-[13px] text-slate-900 placeholder:text-slate-400 outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all"
          />
          <div className="absolute right-1 flex items-center gap-0.5">
            <button
              className="w-7 h-7 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              aria-label="Voice search"
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleSearch}
              className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200 ${
                query.length > 0 ? 'bg-accent text-white' : 'text-slate-300'
              }`}
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 px-3 py-[7px] bg-slate-100/80 rounded-full text-[13px] text-slate-700 font-medium whitespace-nowrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-accent">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Kochi, 2 km</span>
        </div>

        <button className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
        </button>
      </div>
    </div>
  )
}

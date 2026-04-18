'use client'

import React, { useState } from 'react'
import { ArrowRight, Mic, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SearchInput } from '@/components/ui'
import { TRENDING } from '@/data/trending'

export function HeroSearch() {
  const router = useRouter()
  const [isFocused, setIsFocused] = useState(false)
  const [query, setQuery] = useState('')

  const showDropdown = isFocused

  const handleSearch = (q?: string) => {
    const searchQuery = q ?? query
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div className="w-full max-w-[584px] animate-[fadeInUp_0.6s_ease-out_0.08s_both] relative z-50">
      {/* Search pill */}
      <div
        className={[
          'relative flex items-center w-full h-[60px] md:h-[60px] bg-white border transition-all duration-200',
          showDropdown
            ? 'rounded-[30px] md:rounded-t-[30px] md:rounded-b-none border-slate-200 md:border-b-transparent shadow-[0_2px_12px_rgba(0,0,0,0.06)] md:shadow-[0_-2px_12px_rgba(0,0,0,0.06)]'
            : 'rounded-full border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.09)]',
        ].join(' ')}
      >
        {/* Search icon */}
        <span className="absolute left-4 md:left-4 pointer-events-none">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`w-[20px] h-[20px] transition-colors duration-200 ${isFocused ? 'text-accent' : 'text-slate-400'}`}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>

        <SearchInput
          value={query}
          onChange={setQuery}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleSearch()
            }
          }}
          placeholder="Find a cafe, book a salon, hire a creator..."
          className="w-full h-full bg-transparent text-slate-900 text-[16px] md:text-[17px] pl-[48px] pr-[96px] outline-none placeholder:text-slate-400 font-normal tracking-tight"
        />

        {/* Right controls */}
        <div className="absolute right-2 flex items-center gap-1">
          <button
            className="flex items-center justify-center w-[40px] h-[40px] md:w-[36px] md:h-[36px] rounded-full text-slate-400 hover:text-slate-600 focus:bg-slate-100 hover:bg-slate-100 transition-colors"
            aria-label="Voice search"
            onMouseDown={(e) => e.preventDefault()}
          >
            <Mic className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
          </button>
          <button
            aria-label="Search"
            className={[
              'flex items-center justify-center w-[40px] h-[40px] md:w-[36px] md:h-[36px] rounded-full transition-all duration-200',
              query.length > 0
                ? 'bg-accent text-white hover:bg-accent-hover shadow-sm scale-100'
                : 'bg-slate-100 text-slate-300 scale-95',
            ].join(' ')}
            onMouseDown={(e) => {
              e.preventDefault()
              handleSearch()
            }}
          >
            <ArrowRight className="w-[20px] h-[20px] md:w-[18px] md:h-[18px]" />
          </button>
        </div>
      </div>

      {/* Trending dropdown */}
      <div
        className={[
          'z-50 bg-white',
          'max-md:relative max-md:mt-6 max-md:w-full',
          'max-md:border-none max-md:shadow-none max-md:rounded-none max-md:overflow-visible',
          'block',
          'md:absolute md:left-0 md:right-0 md:top-[60px]',
          'md:border md:border-t-0 md:border-slate-200 md:rounded-b-[30px] md:shadow-[0_8px_24px_rgba(0,0,0,0.08)] md:overflow-hidden',
          showDropdown ? 'md:block animate-[fadeIn_0.15s_ease-out]' : 'md:hidden',
        ].join(' ')}
      >
        <div className="hidden md:block mx-4 h-px bg-slate-100" />

        <div className="py-2 md:px-2 md:pt-2 md:pb-3 px-0">
          <p className="mb-4 md:mb-0 md:px-3 md:py-1.5 text-[14px] md:text-[11px] font-medium md:font-semibold text-slate-800 md:text-slate-400 capitalize md:uppercase md:tracking-widest">
            Trending searches
          </p>
          {TRENDING.map(({ label }, index) => (
            <div key={label} className="relative group">
              <button
                onMouseDown={(e) => {
                  e.preventDefault()
                  setQuery(label)
                  handleSearch(label)
                }}
                className="w-full flex items-center gap-4 md:gap-3 py-[14px] px-0 md:px-3 md:py-2.5 md:rounded-[10px] bg-white hover:bg-slate-50 transition-colors text-left"
              >
                <span className="shrink-0 flex items-center justify-center w-[24px] h-[24px] md:w-[32px] md:h-[32px] md:rounded-full md:bg-slate-100 md:group-hover:bg-slate-200 transition-colors">
                  <TrendingUp className="w-[18px] h-[18px] md:w-[14px] md:h-[14px] text-slate-400 md:text-accent" />
                </span>
                <span className="text-[15px] md:text-[14px] text-slate-700 font-normal leading-snug">
                  {label}
                </span>
              </button>
              {index < TRENDING.length - 1 && (
                <div className="absolute bottom-0 left-[40px] right-0 h-px bg-slate-200 md:hidden" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

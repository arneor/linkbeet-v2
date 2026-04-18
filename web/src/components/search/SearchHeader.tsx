'use client'

import Image from 'next/image'

import { LocationChip } from '@/components/ui/LocationChip'
import { SearchInput } from '@/components/ui/SearchInput'
import { FILTERS } from '@/data/search'

interface SearchHeaderProps {
  query: string
  onQueryChange: (q: string) => void
  onSearch: (q: string) => void
  activeFilter: number
  onFilterChange: (i: number) => void
  resultCount: number
  onBack: () => void
  onHome: () => void
}

export function SearchHeader({
  query,
  onQueryChange,
  onSearch,
  activeFilter,
  onFilterChange,
  resultCount,
  onBack,
  onHome,
}: SearchHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Navbar Row */}
      <div className="px-3 md:px-4 lg:px-12 xl:px-20 h-[64px] flex items-center gap-2 sm:gap-4 lg:gap-6">
        {/* Mobile Back Button */}
        <button onClick={onBack} className="sm:hidden p-1 text-slate-800 shrink-0">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-5 h-5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Logo */}
        <button onClick={onHome} className="shrink-0 hidden sm:flex items-center">
          <Image
            src="/black-logo.png"
            alt="LinkBeet"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
            unoptimized
          />
        </button>

        {/* Search Input Row */}
        <div className="flex-1 flex max-w-3xl items-center gap-2 lg:gap-3">
          <div className="flex-1 flex items-center gap-2 h-11 px-4 bg-white border border-slate-300 hover:shadow-md focus-within:shadow-md focus-within:border-white transition-all duration-300 rounded-full">
            <SearchInput
              id="search-input"
              value={query}
              onChange={onQueryChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && query.trim()) {
                  onSearch(query)
                }
              }}
              className="flex-1 text-[15px] text-slate-900 placeholder:text-slate-500 outline-none bg-transparent tracking-tight leading-none h-full pt-0.5"
              placeholder="Search near you..."
            />
            <button
              onClick={() => onQueryChange('')}
              className={`text-slate-400 hover:text-slate-600 ${query ? 'opacity-100' : 'opacity-0'} transition-opacity`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-4 h-4"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="w-px h-5 bg-slate-200 mx-1 hidden sm:block" />
            <button
              onClick={() => {
                if (query.trim()) onSearch(query)
              }}
              className="text-accent p-1.5 rounded-full hover:bg-accent/10 transition-colors"
              aria-label="Search"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-5 h-5"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>

          {/* Location badge (Desktop only) */}
          <LocationChip
            location="Kochi, 2 km"
            className="hidden lg:flex shrink-0 px-4 h-11 bg-white border border-slate-300 hover:border-slate-400 transition-colors rounded-full text-[14px]"
          />
        </div>

        <div className="hidden sm:block flex-1" />

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button className="flex w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-[20px] h-[20px]"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-semibold shadow-sm cursor-pointer">
            N
          </div>
        </div>
      </div>

      {/* Mobile Location Row */}
      <div className="lg:hidden px-4 pb-3 flex items-center bg-white">
        <LocationChip
          location="Kochi, 2 km"
          showChevron
          className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 transition-colors rounded-full border border-slate-200 text-[13px]"
        />
      </div>

      {/* Filter Bar */}
      <div className="px-4 lg:px-12 xl:px-20 flex items-center gap-6 overflow-x-auto no-scrollbar border-t border-slate-100">
        <div className="text-[13px] font-semibold text-slate-700 py-3 shrink-0 border-r border-slate-200 pr-4 mr-1">
          {resultCount} results
        </div>
        {FILTERS.map((f, i) => {
          const isActive = i === activeFilter
          return (
            <button
              key={f}
              id={`filter-${f.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => onFilterChange(i)}
              className={`relative py-3 text-[14px] font-medium whitespace-nowrap transition-colors ${isActive ? 'text-accent' : 'text-slate-600 hover:text-slate-900'}`}
            >
              {f}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-accent rounded-t-sm" />
              )}
            </button>
          )
        })}
      </div>
    </header>
  )
}

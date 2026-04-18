'use client'

import type { SearchResult } from '@/data/types'
import { MapBlock } from './MapBlock'
import { PeopleAlsoSearch } from './PeopleAlsoSearch'
import { TopPickCard } from './TopPickCard'

interface DesktopSidebarProps {
  results: SearchResult[]
  hoveredId: string
  onHover: (id: string) => void
}

export function DesktopSidebar({ results, hoveredId, onHover }: DesktopSidebarProps) {
  return (
    <div className="hidden lg:flex shrink-0 w-[40%] xl:w-[35%] sticky top-[112px] h-[calc(100vh-112px)] flex-col bg-[#f8f9fa] border-l border-slate-200 overflow-y-auto no-scrollbar p-5 lg:p-6 xl:p-8">
      <div className="w-full max-w-[480px] mx-auto flex flex-col gap-6">
        <MapBlock
          results={results}
          hoveredId={hoveredId}
          onHover={onHover}
          defaultZoom={14}
          showPopovers
          className="w-full h-[300px] bg-[#e8eee4] rounded-2xl overflow-hidden shadow-sm relative border border-slate-200"
        />
        <PeopleAlsoSearch />
        <TopPickCard />
      </div>
    </div>
  )
}

import type { SearchResult } from '@/data/types'
import { ResultCard } from './ResultCard'
import { PeopleAlsoSearch } from './PeopleAlsoSearch'
import { TopPickCard } from './TopPickCard'

interface ResultsListProps {
  query: string
  results: SearchResult[]
  hoveredId: string
  onHover: (id: string) => void
}

export function ResultsList({ query, results, hoveredId, onHover }: ResultsListProps) {
  return (
    <div className="flex-1 w-full lg:w-[60%] xl:w-[65%] shrink-0 relative flex flex-col">
      <div className="hidden lg:block sticky top-0 bg-white/80 backdrop-blur-md z-10 px-6 lg:px-12 xl:px-20 py-4 border-b border-slate-200">
        <h2 className="text-[20px] font-semibold text-slate-900 tracking-tight">
          Best {query ? `"${query}"` : 'matches'} around you
        </h2>
      </div>
      <div className="flex-1 pb-10">
        {results.map((item) => (
          <ResultCard
            key={item.id}
            item={item}
            isActive={hoveredId === item.id}
            onHover={() => onHover(item.id)}
          />
        ))}
      </div>

      {/* Mobile Extra Widgets */}
      <div className="lg:hidden w-full px-4 py-8 bg-[#f8f9fa] border-t border-slate-200 bg-gradient-to-b from-white to-[#f8f9fa] flex flex-col gap-8">
        <PeopleAlsoSearch />
        <TopPickCard />
      </div>
    </div>
  )
}

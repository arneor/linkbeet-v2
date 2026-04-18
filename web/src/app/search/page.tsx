'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'

import { SearchHeader, ResultsList, DesktopSidebar } from '@/components/search'
import { MapBlock } from '@/components/search/MapBlock'
import { SEARCH_RESULTS } from '@/data/search'

function SearchResults() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [activeFilter, setActiveFilter] = useState(0)
  const [hoveredId, setHoveredId] = useState(SEARCH_RESULTS[0].id)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  const handleSearch = (q: string) => {
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col pt-0">
      <SearchHeader
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        resultCount={SEARCH_RESULTS.length}
        onBack={() => router.back()}
        onHome={() => router.push('/')}
      />

      <div className="flex flex-col lg:flex-row flex-1 w-full items-start">
        <MapBlock
          results={SEARCH_RESULTS}
          hoveredId={hoveredId}
          onHover={setHoveredId}
          height={250}
          defaultZoom={13}
          className="lg:hidden h-[250px] w-full border-b border-slate-200 shrink-0 relative bg-[#e8eee4]"
        />
        <ResultsList
          query={query}
          results={SEARCH_RESULTS}
          hoveredId={hoveredId}
          onHover={setHoveredId}
        />
        <DesktopSidebar results={SEARCH_RESULTS} hoveredId={hoveredId} onHover={setHoveredId} />
      </div>
    </div>
  )
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <SearchResults />
    </Suspense>
  )
}

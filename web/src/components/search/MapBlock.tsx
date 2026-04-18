'use client'

import { Map, Overlay } from 'pigeon-maps'

import { MAP_CENTER, MAP_YOU_PIN } from '@/data/search'
import type { SearchResult } from '@/data/types'

interface MapBlockProps {
  results: SearchResult[]
  hoveredId: string
  onHover: (id: string) => void
  height?: number
  defaultZoom?: number
  showPopovers?: boolean
  className?: string
}

export function MapBlock({
  results,
  hoveredId,
  onHover,
  height,
  defaultZoom = 13,
  showPopovers = false,
  className = '',
}: MapBlockProps) {
  return (
    <div className={className}>
      <Map
        {...(height !== undefined ? { height } : {})}
        defaultCenter={MAP_CENTER}
        defaultZoom={defaultZoom}
        minZoom={10}
      >
        {/* You pin */}
        <Overlay anchor={MAP_YOU_PIN} offset={[12, 12]}>
          <div className="w-4 h-4 rounded-full bg-accent border-2 border-white shadow-md relative cursor-pointer" />
        </Overlay>

        {/* Store pins */}
        {results.map((res) => {
          const isActive = hoveredId === res.id
          return (
            <Overlay key={res.id} anchor={[res.lat, res.lng]} offset={[16, 16]}>
              <div
                className={`relative flex items-center justify-center rounded-full border-2 border-white shadow-md transition-all duration-200 cursor-pointer ${
                  isActive
                    ? showPopovers
                      ? 'w-9 h-9 bg-slate-900 scale-110 z-20'
                      : 'w-8 h-8 bg-accent scale-110 z-10'
                    : showPopovers
                      ? 'w-7 h-7 bg-accent hover:scale-110 z-10'
                      : 'w-6 h-6 bg-accent hover:scale-110'
                }`}
                onClick={() => onHover(res.id)}
                onMouseEnter={() => onHover(res.id)}
              >
                <svg viewBox="0 0 24 24" fill="white" className="w-[60%] h-[60%]">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                {showPopovers && isActive && (
                  <div className="absolute top-[-36px] left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[12px] font-semibold px-2.5 py-1 rounded-[8px] shadow-lg pointer-events-none after:content-[''] after:absolute after:w-2 after:h-2 after:bg-slate-900 after:rotate-45 after:-bottom-1 after:left-1/2 after:-translate-x-1/2">
                    {res.name}
                  </div>
                )}
              </div>
            </Overlay>
          )
        })}
      </Map>
    </div>
  )
}

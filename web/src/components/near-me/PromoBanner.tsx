'use client'

import { cn } from '@linkbeet/utils'
import { useState, useRef, useEffect } from 'react'

const BANNERS = [
  {
    id: 1,
    title: 'Exclusive Weekly Offers',
    desc: 'Unlock premium discounts at top-rated salons and spas',
    btnText: 'View Offers',
    bgColor: 'bg-[#0071e3]',
    textColor: 'text-[#0071e3]',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-24 h-24 transform -rotate-12">
        <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l9 9c.36.36.86.59 1.41.59s1.05-.23 1.41-.59l7-7c.36-.36.59-.86.59-1.41s-.23-1.05-.59-1.41zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Exclusive Weekly Offers',
    desc: 'Unlock premium discounts at top-rated salons and spas',
    btnText: 'View Offers',
    bgColor: 'bg-[#FF9800]',
    textColor: 'text-[#FF9800]',
    icon: null,
  },
  {
    id: 3,
    title: 'New Hotspots Added',
    desc: 'Check out the trendiest cafes that just opened this week',
    btnText: 'See Hotspots',
    bgColor: 'bg-[#10B981]',
    textColor: 'text-[#10B981]',
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-24 h-24">
        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
      </svg>
    ),
  },
]

export function PromoBanner() {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Handle scroll events to update pagination dots
  const handleScroll = () => {
    if (!scrollRef.current) return
    const scrollLeft = scrollRef.current.scrollLeft
    const slideWidth = scrollRef.current.offsetWidth
    const newIndex = Math.round(scrollLeft / slideWidth)
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex)
    }
  }

  // Handle pagination dot click
  const scrollToSlide = (index: number) => {
    if (!scrollRef.current) return
    const slideWidth = scrollRef.current.offsetWidth
    scrollRef.current.scrollTo({
      left: index * slideWidth,
      behavior: 'smooth',
    })
    setActiveIndex(index)
  }

  // Auto-scroll logic — 5 second intervals
  useEffect(() => {
    const timer = setInterval(() => {
      if (!scrollRef.current) return
      const isLast = activeIndex === BANNERS.length - 1
      const nextIndex = isLast ? 0 : activeIndex + 1
      scrollToSlide(nextIndex)
    }, 5000)

    return () => clearInterval(timer)
  }, [activeIndex])

  return (
    <div className="relative mb-6">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory rounded-[12px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {BANNERS.map((banner) => (
          <div
            key={banner.id}
            className={cn(
              'relative w-full shrink-0 snap-center p-6 overflow-hidden',
              banner.bgColor,
            )}
          >
            <div className="relative z-10 w-2/3 md:w-3/4">
              <h2 className="text-[20px] md:text-[22px] font-bold text-white tracking-tight mb-1">
                {banner.title}
              </h2>
              <p className="text-[13px] md:text-[14px] text-white/90 mb-4 line-clamp-2">
                {banner.desc}
              </p>
              <button
                className={cn(
                  'px-4 md:px-5 py-2 bg-white text-[13px] md:text-[14px] font-semibold rounded-full hover:bg-slate-50 transition-colors shadow-sm',
                  banner.textColor,
                )}
              >
                {banner.btnText}
              </button>
            </div>

            <div
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 opacity-[0.15] md:opacity-20 pointer-events-none"
              aria-hidden="true"
            >
              {banner.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollToSlide(idx)}
            className={cn(
              'w-[6px] h-[6px] rounded-full transition-all duration-300',
              activeIndex === idx ? 'bg-white w-[18px]' : 'bg-white/50 hover:bg-white/70',
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

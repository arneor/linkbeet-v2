'use client'

import type { Category } from '@/data/types'

interface CategoryFilterProps {
  categories: Category[]
  activeIndex: number
  onChange: (i: number) => void
}

export function CategoryFilter({ categories, activeIndex, onChange }: CategoryFilterProps) {
  return (
    <div className="flex md:flex-wrap gap-2 mb-5 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 md:mx-0 md:px-0">
      {categories.map((cat, i) => (
        <button
          key={cat.label}
          id={`category-${cat.label.toLowerCase()}`}
          onClick={() => onChange(i)}
          className={`flex items-center justify-center gap-1.5 px-4 py-2 shrink-0 snap-center text-[13px] font-medium rounded-full border transition-all duration-150 active:scale-95 ${
            i === activeIndex
              ? 'bg-accent text-white border-accent'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  )
}

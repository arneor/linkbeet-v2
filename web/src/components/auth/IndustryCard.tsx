'use client'

import { cn } from '@linkbeet/utils'

import type { Industry } from '@/data/industries'

interface IndustryCardProps {
  industry: Industry
  selected: boolean
  onSelect: (id: string) => void
}

export function IndustryCard({ industry, selected, onSelect }: IndustryCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(industry.id)}
      className={cn(
        'inline-flex items-center gap-2 h-[44px] px-4 rounded-full',
        'text-[14px] font-medium transition-all duration-150 active:scale-[0.98]',
        'border shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-accent',
        selected
          ? 'bg-accent/10 text-accent border-accent'
          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300',
      )}
    >
      <span aria-hidden="true" className="text-[16px] leading-none">
        {industry.emoji}
      </span>
      <span>{industry.label}</span>
    </button>
  )
}

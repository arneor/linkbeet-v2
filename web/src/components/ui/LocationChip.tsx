interface LocationChipProps {
  location: string
  className?: string
  showChevron?: boolean
}

export function LocationChip({ location, className = '', showChevron = false }: LocationChipProps) {
  return (
    <div className={`flex items-center gap-1.5 cursor-pointer ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0071e3"
        strokeWidth="2"
        className="w-[18px] h-[18px] shrink-0"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
      <span className="text-slate-700 font-medium">{location}</span>
      {showChevron && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-[14px] h-[14px] text-slate-400 shrink-0"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )}
    </div>
  )
}

'use client'

export const QUICK_ACTIONS = [
  {
    label: 'Top Rated',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[22px] h-[22px] text-slate-700"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    label: 'Offers',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[22px] h-[22px] text-slate-700"
      >
        <path d="m21.44 11.05-9.19 9.19a2 2 0 0 1-2.83 0L2.81 13.7a2 2 0 0 1 0-2.83l9.19-9.19a2 2 0 0 1 1.41-.58H19a2 2 0 0 1 2 2v5.59a2 2 0 0 1-.56 1.36z" />
        <line x1="7" y1="17" x2="17" y2="7" />
      </svg>
    ),
  },
  {
    label: 'New',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[22px] h-[22px] text-slate-700"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
      </svg>
    ),
  },
  {
    label: 'Open Now',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[22px] h-[22px] text-slate-700"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
]

export function QuickActions() {
  return (
    <div>
      <h3 className="text-[14px] font-semibold text-slate-900 mb-3">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {QUICK_ACTIONS.map((a) => (
          <button
            key={a.label}
            className="flex flex-col items-center justify-center gap-2 py-4 bg-white rounded-[12px] border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            {a.icon}
            <span className="text-[12px] font-medium text-slate-600">{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export function MobileQuickActions() {
  return (
    <div className="flex items-center justify-between gap-2 mb-8 mt-2 px-1">
      {QUICK_ACTIONS.map((a) => (
        <button key={a.label} className="flex flex-col items-center gap-2 group w-1/4">
          <div className="w-[48px] h-[48px] flex items-center justify-center bg-white rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 group-hover:scale-105 transition-transform">
            {a.icon}
          </div>
          <span className="text-[11px] font-medium text-slate-600 whitespace-nowrap text-center">
            {a.label}
          </span>
        </button>
      ))}
    </div>
  )
}

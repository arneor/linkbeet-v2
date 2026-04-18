'use client'

export function NearMeMobileHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        className="w-10 h-10 -ml-2 flex items-center justify-center text-slate-900 hover:bg-slate-100 rounded-full active:scale-95 transition-transform"
        onClick={() => window.history.back()}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>
      <h1 className="text-[17px] font-semibold text-slate-900 tracking-tight">Near Me</h1>
      <button className="w-10 h-10 -mr-2 flex items-center justify-center text-slate-900 hover:bg-slate-100 rounded-full active:scale-95 transition-transform">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <line x1="4" y1="14" x2="13" y2="14" />
          <line x1="17" y1="14" x2="20" y2="14" />
          <line x1="4" y1="10" x2="7" y2="10" />
          <line x1="11" y1="10" x2="20" y2="10" />
          <circle cx="15" cy="14" r="2" />
          <circle cx="9" cy="10" r="2" />
        </svg>
      </button>
    </div>
  )
}

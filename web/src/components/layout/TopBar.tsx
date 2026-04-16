'use client'

import { cn } from '@linkbeet/utils'
import React from 'react'

// ─── TopBar ───────────────────────────────────────────────────
// Colors via Tailwind named utilities — no hardcoded hex.
export interface TopBarProps {
  onMenuToggle: () => void
  userAvatar?: string
  userName?: string
  isLoggedIn?: boolean
}

export function TopBar({ onMenuToggle }: TopBarProps) {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-[48px] flex items-center justify-between px-4',
        'bg-transparent text-slate-800',
        'lg:hidden',
      )}
    >
      {/* Left: Hamburger */}
      <button
        onClick={onMenuToggle}
        className="flex items-center justify-center w-[44px] h-[44px] -ml-2 rounded-[8px] hover:bg-slate-200/50 text-slate-500 hover:text-slate-700 transition-colors duration-150"
        aria-label="Open menu"
      >
        <svg width="22" height="16" viewBox="0 0 22 16" fill="currentColor">
          <rect width="22" height="2" rx="1" />
          <rect y="7" width="16" height="2" rx="1" />
          <rect y="14" width="10" height="2" rx="1" />
        </svg>
      </button>

      {/* Logo and Right sections removed on mobile per request */}
    </header>
  )
}

'use client'

import React from 'react'
import { cn } from '@linkbeet/ui'

// ─── TopBar ───────────────────────────────────────────────────
export interface TopBarProps {
  onMenuToggle: () => void
  userAvatar?: string
  userName?: string
  isLoggedIn?: boolean
}

export function TopBar({ onMenuToggle, userAvatar, userName, isLoggedIn = false }: TopBarProps) {
  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-[48px] flex items-center justify-between px-4',
        'nav-glass text-white',
        'border-b border-white/10',
        'lg:hidden',
      )}
    >
      {/* Left: Hamburger */}
      <button
        onClick={onMenuToggle}
        className="flex items-center justify-center w-[44px] h-[44px] -ml-2 rounded-[8px] hover:bg-white/10 transition-colors duration-150"
        aria-label="Open menu"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      {/* Center: Logo */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#0071e3] rounded-[5px] flex items-center justify-center text-white font-semibold text-[10px]">
          LB
        </div>
        <span className="text-[14px] font-semibold tracking-[-0.224px]">LinkBeet</span>
      </div>

      {/* Right: Avatar or Login */}
      {isLoggedIn ? (
        <button className="flex items-center justify-center w-[44px] h-[44px] -mr-2">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName || 'User'}
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-[#0071e3] flex items-center justify-center text-white text-[10px] font-semibold">
              {userName?.[0]?.toUpperCase() || '?'}
            </div>
          )}
        </button>
      ) : (
        <a
          href="/login"
          className="text-[12px] text-[#2997ff] font-normal hover:underline"
        >
          Login
        </a>
      )}
    </header>
  )
}

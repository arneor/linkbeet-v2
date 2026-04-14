'use client'

import React from 'react'
import { cn } from '@linkbeet/ui'

// ─── Sidebar ──────────────────────────────────────────────────
export interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  currentPath: string
  userMode?: 'normal' | 'business'
  isLoggedIn?: boolean
  userName?: string
  userAvatar?: string
}

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  businessOnly?: boolean
}

const navItems: NavItem[] = [
  {
    label: 'Discover',
    href: '/discover',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    label: 'Near Me',
    href: '/near-me',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'My Bio',
    href: '/bio',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    businessOnly: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Bookmarks',
    href: '/bookmarks',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
    ),
  },
  {
    label: 'Connections',
    href: '/connections',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
]

export function Sidebar({
  isCollapsed,
  onToggle,
  currentPath,
  userMode = 'normal',
  isLoggedIn = false,
  userName,
  userAvatar,
}: SidebarProps) {
  const filteredItems = navItems.filter(
    (item) => !item.businessOnly || userMode === 'business',
  )

  return (
    <nav
      className={cn(
        'fixed left-0 top-0 h-screen z-40 flex flex-col',
        'nav-glass text-white',
        'transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-[72px]' : 'w-[260px]',
      )}
      aria-label="Main navigation"
      role="navigation"
    >
      {/* Logo */}
      <div className={cn('flex items-center h-[48px] px-4 shrink-0', !isCollapsed && 'px-5')}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#0071e3] rounded-[8px] flex items-center justify-center text-white font-semibold text-[14px]">
            LB
          </div>
          {!isCollapsed && (
            <span className="text-[17px] font-semibold tracking-[-0.374px] whitespace-nowrap overflow-hidden">
              LinkBeet
            </span>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto py-2 px-2">
        {filteredItems.map((item) => {
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/')
          return (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 h-[48px] px-3 rounded-[8px] transition-colors duration-150 group',
                isActive
                  ? 'bg-white/10 text-[#2997ff]'
                  : 'text-white/80 hover:bg-white/10 hover:text-white',
                isCollapsed && 'justify-center px-0',
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <span className={cn('shrink-0', isActive && 'text-[#2997ff]')}>
                {item.icon}
              </span>
              {!isCollapsed && (
                <span className="text-[12px] font-normal tracking-normal whitespace-nowrap overflow-hidden">
                  {item.label}
                </span>
              )}
              {isActive && !isCollapsed && (
                <div className="absolute left-0 w-[2px] h-5 bg-[#0071e3] rounded-r" />
              )}
            </a>
          )
        })}
      </div>

      {/* Bottom Section */}
      <div className="shrink-0 border-t border-white/10 p-2">
        {isLoggedIn ? (
          <div className={cn('flex items-center gap-3 px-3 py-2', isCollapsed && 'justify-center px-0')}>
            {userAvatar ? (
              <img src={userAvatar} alt={userName || 'User'} className="w-8 h-8 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#0071e3] flex items-center justify-center text-white text-[12px] font-semibold shrink-0">
                {userName?.[0]?.toUpperCase() || '?'}
              </div>
            )}
            {!isCollapsed && (
              <span className="text-[12px] text-white/80 truncate">{userName || 'User'}</span>
            )}
          </div>
        ) : (
          <a
            href="/login"
            className={cn(
              'flex items-center justify-center gap-2 h-[40px] rounded-[8px] bg-[#0071e3] text-white text-[14px] font-normal transition-colors hover:bg-[#0077ED]',
              isCollapsed && 'w-[40px] mx-auto',
            )}
          >
            {isCollapsed ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" x2="3" y1="12" y2="12" />
              </svg>
            ) : (
              'Login'
            )}
          </a>
        )}

        {/* Collapse Toggle */}
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-full h-[36px] mt-1 rounded-[8px] text-white/60 hover:bg-white/10 hover:text-white transition-colors duration-150"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn('transition-transform duration-300', isCollapsed && 'rotate-180')}
          >
            <path d="m11 17-5-5 5-5" />
            <path d="m18 17-5-5 5-5" />
          </svg>
        </button>
      </div>
    </nav>
  )
}

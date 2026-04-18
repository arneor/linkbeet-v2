'use client'

import { cn } from '@linkbeet/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

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
    label: 'Home',
    href: '/',
    icon: (
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
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'Near Me',
    href: '/near-me',
    icon: (
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
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: 'My Bio',
    href: '/bio',
    icon: (
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
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
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
    label: 'Settings',
    href: '/settings',
    icon: (
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault()
        onToggle()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onToggle])

  const filteredItems = navItems.filter((item) => !item.businessOnly || userMode === 'business')

  return (
    <nav
      className={cn(
        'fixed left-0 top-0 h-screen z-40 flex flex-col',
        'bg-slate-50/90 backdrop-blur-xl border-r border-slate-200 text-slate-800',
        'transition-[width] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
        isCollapsed ? 'w-[72px]' : 'w-[260px]',
      )}
      aria-label="Main navigation"
      role="navigation"
    >
      {/* Top Header Section */}
      <div
        className={cn(
          'flex items-center h-[64px] shrink-0',
          isCollapsed ? 'justify-center px-0' : 'justify-between px-5',
        )}
      >
        {isCollapsed ? (
          <button
            onClick={onToggle}
            className="group/logo relative flex items-center justify-center w-10 h-10 rounded-[8px] hover:bg-slate-200/50 transition-colors"
            aria-label="Expand sidebar"
          >
            <Image
              src="/black-logo.png"
              alt="LinkBeet"
              width={32}
              height={32}
              className="w-8 h-8 object-contain transition-opacity duration-200 group-hover/logo:opacity-0"
              priority
              unoptimized
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200 text-slate-500">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M9 3v18" />
                <path d="m14 9 3 3-3 3" />
              </svg>
            </div>
          </button>
        ) : (
          <>
            <div className="flex items-center">
              <Image
                src="/black-logo.png"
                alt="LinkBeet"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
                priority
                unoptimized
              />
              <span className="font-semibold text-[18px] tracking-tight ml-2.5">LinkBeet</span>
            </div>
            <div className="flex items-center gap-1.5 pl-2 pr-1">
              <button
                onClick={onToggle}
                className="flex items-center justify-center w-8 h-8 rounded-[8px] text-slate-400 hover:bg-slate-200/50 hover:text-slate-700 transition-colors"
                aria-label="Collapse sidebar"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M9 3v18" />
                  <path d="m16 15-3-3 3-3" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto py-2 px-2">
        {filteredItems.map((item) => {
          const isActive = currentPath === item.href || currentPath.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative flex items-center gap-3 h-[48px] px-3 rounded-[8px] transition-colors duration-150 group',
                isActive
                  ? 'bg-accent/10 text-accent'
                  : 'text-slate-600 hover:bg-slate-200/50 hover:text-slate-900',
                isCollapsed && 'justify-center px-0',
              )}
            >
              <span className={cn('shrink-0', isActive && 'text-accent')}>{item.icon}</span>
              {!isCollapsed && (
                <span className="text-[12px] font-normal tracking-normal whitespace-nowrap overflow-hidden">
                  {item.label}
                </span>
              )}
              {isActive && !isCollapsed && (
                <div className="absolute left-0 w-[2px] h-5 bg-accent rounded-r" />
              )}
              {/* Tooltip — only visible in collapsed state on hover */}
              {isCollapsed && (
                <span
                  className={cn(
                    'pointer-events-none absolute left-full ml-3 px-2.5 py-1.5',
                    'bg-slate-900 text-white text-[12px] font-normal rounded-[6px] whitespace-nowrap',
                    'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0',
                    'transition-all duration-150 ease-out',
                    'shadow-[0_4px_12px_rgba(0,0,0,0.15)]',
                    'z-50',
                  )}
                >
                  {item.label}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      {/* Bottom Section */}
      <div className="shrink-0 border-t border-slate-200 p-2">
        {isLoggedIn ? (
          <div
            className={cn(
              'flex items-center gap-3 px-3 py-2',
              isCollapsed && 'justify-center px-0',
            )}
          >
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt={userName || 'User'}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover shrink-0"
                unoptimized
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white text-[12px] font-semibold shrink-0">
                {userName?.[0]?.toUpperCase() || '?'}
              </div>
            )}
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-medium text-slate-900 truncate">{userName || 'Nidhin'}</span>
                <span className="text-[11px] text-slate-500 truncate">{userMode === 'business' ? 'Business Mode' : 'Normal Mode'}</span>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className={cn(
              'flex items-center justify-center gap-2 h-[44px] rounded-[8px] bg-accent text-white text-[14px] font-normal transition-colors hover:bg-accent-hover shrink-0',
              isCollapsed && 'w-[44px] h-[44px] mx-auto rounded-full',
            )}
            title={isCollapsed ? 'Login / Sign Up' : undefined}
          >
            {isCollapsed ? (
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
                <path d="M15 12H3" />
                <path d="m11 8 4 4-4 4" />
                <path d="M 7 19 A 9 9 0 1 0 7 5" />
              </svg>
            ) : (
              <span>Login</span>
            )}
          </Link>
        )}
      </div>
    </nav>
  )
}

'use client'

import { cn } from '@linkbeet/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

// ─── AppShell ─────────────────────────────────────────────────
export interface AppShellProps {
  children: React.ReactNode
  userMode?: 'normal' | 'business'
  isLoggedIn?: boolean
  userAvatar?: string
  userName?: string
}

const STORAGE_KEY = 'linkbeet-sidebar-collapsed'

export function AppShell({
  children,
  userMode = 'normal',
  isLoggedIn = false,
  userAvatar,
  userName,
}: AppShellProps) {
  const pathname = usePathname()

  // ── Sidebar collapsed state ──
  // Use ref to track if component has hydrated to prevent SSR mismatch
  const [isHydrated, setIsHydrated] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true) // SSR default

  useEffect(() => {
    // On mount (client only), read persisted value and mark hydrated
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsCollapsed(JSON.parse(stored) as boolean)
      }
    } catch {
      // Ignore
    }
    setIsHydrated(true)
  }, [])

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // ── Responsive: mobile detection ──
  const [isMobile, setIsMobile] = useState(false) // SSR default
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Close drawer on route change
  const prevPathRef = useRef(pathname)
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDrawerOpen(false)
      prevPathRef.current = pathname
    }
  }, [pathname])

  const handleToggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // Ignore
      }
      return next
    })
  }, [])

  const handleToggleDrawer = useCallback(() => {
    setIsDrawerOpen((prev) => !prev)
  }, [])

  const sidebarWidth = isCollapsed ? 72 : 260

  // Routes that get their own full-screen layout (no sidebar, no padding)
  const fullscreenRoutes = ['/search']
  const isFullscreen = fullscreenRoutes.some((r) => pathname.startsWith(r))

  if (isFullscreen) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen relative">
      {/* ── Custom Near Me Button (hidden on Near Me page) ── */}
      {pathname !== '/near-me' && (
        <Link
          href="/near-me"
          className="fixed z-60 top-[8px] md:top-6 right-4 md:right-8 group hover:scale-105 transition-all duration-300 outline-none block"
          aria-label="Near Me"
        >
          <div className="relative w-8 h-8 md:w-[42px] md:h-[42px]">
            {/* Back left card */}
            <div className="absolute inset-0 bg-slate-200 rounded-[8px] md:rounded-[10px] shadow-sm transform -rotate-10 -translate-x-[4px] md:-translate-x-[6px] overflow-hidden border-[1.5px] border-white transition-transform duration-300 group-hover:-rotate-15 group-hover:-translate-x-[6px]">
              <Image
                src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=100&auto=format&fit=crop"
                alt=""
                fill
                className="object-cover opacity-90"
              />
            </div>
            {/* Back right card */}
            <div className="absolute inset-0 bg-slate-300 rounded-[8px] md:rounded-[10px] shadow-sm transform rotate-12 translate-x-[4px] md:translate-x-[6px] translate-y-[2px] overflow-hidden border-[1.5px] border-white transition-transform duration-300 group-hover:rotate-18 group-hover:translate-x-[8px]">
              <Image
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop"
                alt=""
                fill
                className="object-cover opacity-90"
              />
            </div>
            {/* Front Center Card */}
            <div className="absolute inset-0 bg-linear-to-br from-slate-800 to-slate-900 rounded-[8px] md:rounded-[10px] shadow-md border-2 border-white flex items-center justify-center z-10 transition-transform duration-300">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-accent animate-pulse absolute top-1 right-1" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] text-white"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
            </div>
          </div>
        </Link>
      )}

      {/* Desktop: Fixed Sidebar — hide until hydrated to prevent flash */}
      {!isMobile && (
        <div className={cn(!isHydrated && 'opacity-0')} style={{ transition: 'none' }}>
          <Sidebar
            isCollapsed={isCollapsed}
            onToggle={handleToggleSidebar}
            currentPath={pathname}
            userMode={userMode}
            isLoggedIn={isLoggedIn}
            userName={userName}
            userAvatar={userAvatar}
          />
        </div>
      )}

      {/* Mobile: TopBar + Drawer Overlay */}
      {isMobile && (
        <>
          {pathname !== '/near-me' && (
            <TopBar
              onMenuToggle={handleToggleDrawer}
              userAvatar={userAvatar}
              userName={userName}
              isLoggedIn={isLoggedIn}
            />
          )}

          {/* Drawer Overlay */}
          {isDrawerOpen && (
            <>
              <div
                className="fixed inset-0 z-100 bg-black/50 animate-[fadeIn_200ms_ease-out]"
                onClick={() => setIsDrawerOpen(false)}
                aria-hidden="true"
              />
              <div className="fixed left-0 top-0 z-101 h-screen w-[260px] animate-[slideInLeft_300ms_ease-out]">
                <Sidebar
                  isCollapsed={false}
                  onToggle={() => setIsDrawerOpen(false)}
                  currentPath={pathname}
                  userMode={userMode}
                  isLoggedIn={isLoggedIn}
                  userName={userName}
                  userAvatar={userAvatar}
                />
              </div>
            </>
          )}
        </>
      )}

      {/* Main Content */}
      <main
        className={cn(
          'transition-[margin] duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]',
          isMobile && pathname !== '/near-me' ? 'pt-[48px]' : '',
        )}
        style={!isMobile ? { marginLeft: sidebarWidth } : undefined}
      >
        <div className="px-6 pt-3 pb-6">{children}</div>
      </main>
    </div>
  )
}

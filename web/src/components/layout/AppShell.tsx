'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { cn } from '@linkbeet/ui'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

// ─── AppShell ─────────────────────────────────────────────────
export interface AppShellProps {
  children: React.ReactNode
  currentPath: string
  userMode?: 'normal' | 'business'
  isLoggedIn?: boolean
  userAvatar?: string
  userName?: string
}

const STORAGE_KEY = 'linkbeet-sidebar-collapsed'

export function AppShell({
  children,
  currentPath,
  userMode = 'normal',
  isLoggedIn = false,
  userAvatar,
  userName,
}: AppShellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Load collapsed state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        setIsCollapsed(JSON.parse(stored))
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [])

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    setIsMobile(mq.matches)

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Close drawer on route change
  useEffect(() => {
    setIsDrawerOpen(false)
  }, [currentPath])

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

  return (
    <div className="min-h-screen">
      {/* Desktop: Fixed Sidebar */}
      {!isMobile && (
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={handleToggleSidebar}
          currentPath={currentPath}
          userMode={userMode}
          isLoggedIn={isLoggedIn}
          userName={userName}
          userAvatar={userAvatar}
        />
      )}

      {/* Mobile: TopBar + Drawer Overlay */}
      {isMobile && (
        <>
          <TopBar
            onMenuToggle={handleToggleDrawer}
            userAvatar={userAvatar}
            userName={userName}
            isLoggedIn={isLoggedIn}
          />

          {/* Drawer Overlay */}
          {isDrawerOpen && (
            <>
              <div
                className="fixed inset-0 z-40 bg-black/50 animate-[fadeIn_200ms_ease-out]"
                onClick={() => setIsDrawerOpen(false)}
                aria-hidden="true"
              />
              <div className="fixed left-0 top-0 z-50 h-screen w-[260px] animate-[slideInLeft_300ms_ease-out]">
                <Sidebar
                  isCollapsed={false}
                  onToggle={() => setIsDrawerOpen(false)}
                  currentPath={currentPath}
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
          'transition-all duration-300 ease-in-out',
          isMobile ? 'pt-[48px]' : '',
        )}
        style={!isMobile ? { marginLeft: sidebarWidth } : undefined}
      >
        <div className="mx-auto max-w-[980px] px-4 py-6">{children}</div>
      </main>
    </div>
  )
}

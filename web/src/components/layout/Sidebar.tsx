'use client'

import React from 'react'
import { cn } from '@linkbeet/ui'
import { 
  Plus, Search, Settings, MessageSquare, Briefcase, Zap, 
  PanelRightClose, PanelRightOpen, ArrowDownToLine, ChevronsUpDown
} from 'lucide-react'

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

export function Sidebar({
  isCollapsed,
  onToggle,
  currentPath,
  userName = 'nidhin', // Fallback for the preview
}: SidebarProps) {

  return (
    <nav
      className={cn(
        'fixed left-0 top-0 h-screen z-40 flex flex-col',
        'bg-[#1a1a1a] text-white',
        'transition-all duration-300 ease-in-out border-r border-[#2a2a2a]',
        isCollapsed ? 'w-[0px] overflow-hidden opacity-0' : 'w-[260px]', // Claude style entirely hides or we keep it collapsed differently. Let's do a soft collapse to 0 or 72px. Claude usually lets it slide completely away. We will slide to 0px if they want exact Claude, but for AppShell compatibility, let's just use 72px like before, or we make it slide away by adjusting AppShell later. Assuming our AppShell uses 72px:
        isCollapsed ? 'w-[72px]' : 'w-[280px]' 
      )}
      aria-label="Main navigation"
      role="navigation"
    >
      {/* Top Header Row */}
      <div className={cn('flex items-center justify-between h-[60px] px-4 shrink-0', isCollapsed && 'justify-center px-0')}>
        {!isCollapsed && (
          <span className="text-[22px] font-semibold tracking-tight text-white/90">
            LinkBeet
          </span>
        )}
        <button
          onClick={onToggle}
          className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-md transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
           {isCollapsed ? <PanelRightOpen size={20} /> : <PanelRightClose size={20} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 overflow-x-hidden pb-4">
        
        {/* Primary Actions */}
        <div className="flex flex-col gap-0.5 mt-2">
          <a
            href="/"
            className={cn(
              'flex items-center gap-3 h-[38px] px-2.5 rounded-lg transition-colors group text-[14px] text-white/80 hover:bg-[#2a2a2a] hover:text-white',
              isCollapsed && 'justify-center px-0',
              currentPath === '/' && 'bg-[#2a2a2a] text-white'
            )}
          >
            <Plus size={18} className="shrink-0 text-white/60 group-hover:text-white" />
            {!isCollapsed && <span>New search</span>}
          </a>
          <a
            href="/discover"
            className={cn(
              'flex items-center gap-3 h-[38px] px-2.5 rounded-lg transition-colors group text-[14px] text-white/80 hover:bg-[#2a2a2a] hover:text-white',
              isCollapsed && 'justify-center px-0',
              currentPath === '/discover' && 'bg-[#2a2a2a] text-white'
            )}
          >
            <Search size={18} className="shrink-0 text-white/60 group-hover:text-white" />
            {!isCollapsed && <span>Search</span>}
          </a>
          <a
            href="/customize"
            className={cn(
              'flex items-center gap-3 h-[38px] px-2.5 rounded-lg transition-colors group text-[14px] text-white/80 hover:bg-[#2a2a2a] hover:text-white',
              isCollapsed && 'justify-center px-0'
            )}
          >
            <Settings size={18} className="shrink-0 text-white/60 group-hover:text-white" />
            {!isCollapsed && <span>Customize</span>}
          </a>
        </div>

        {/* Secondary Navigation Blocks */}
        {!isCollapsed && (
          <div className="flex flex-col gap-0.5 mt-6 border-b border-[#2a2a2a] pb-6">
            <a
              href="/chats"
              className="flex items-center gap-3 h-[38px] px-2.5 rounded-lg transition-colors group text-[14px] text-white/70 hover:bg-[#2a2a2a] hover:text-white"
            >
              <MessageSquare size={16} className="shrink-0 text-white/50 group-hover:text-white/80" />
              <span>Chats</span>
            </a>
            <a
              href="/projects"
              className="flex items-center gap-3 h-[38px] px-2.5 rounded-lg transition-colors group text-[14px] text-white/70 hover:bg-[#2a2a2a] hover:text-white"
            >
              <Briefcase size={16} className="shrink-0 text-white/50 group-hover:text-white/80" />
              <span>Projects</span>
            </a>
            <a
              href="/artifacts"
              className="flex items-center gap-3 h-[38px] px-2.5 rounded-lg transition-colors group text-[14px] text-white/70 hover:bg-[#2a2a2a] hover:text-white"
            >
              <Zap size={16} className="shrink-0 text-white/50 group-hover:text-white/80" />
              <span>Artifacts</span>
            </a>
          </div>
        )}

        {/* Recents Section */}
        {!isCollapsed && (
          <div className="mt-4">
            <h3 className="px-2.5 text-[12px] font-medium text-white/40 mb-2">Recents</h3>
            <div className="flex flex-col gap-0.5">
              <a href="#" className="h-[34px] flex items-center px-2.5 rounded-lg text-[13px] text-white/70 hover:bg-[#2a2a2a] hover:text-white truncate">
                Scaling foundation and tech stack...
              </a>
              <a href="#" className="h-[34px] flex items-center px-2.5 rounded-lg text-[13px] text-white/70 hover:bg-[#2a2a2a] hover:text-white truncate">
                Linkbeet v2 tech stack for 1 million...
              </a>
              <a href="#" className="h-[34px] flex items-center px-2.5 rounded-lg text-[13px] text-white/70 hover:bg-[#2a2a2a] hover:text-white truncate">
                Building personal brand visibility f...
              </a>
              <a href="#" className="h-[34px] flex items-center px-2.5 rounded-lg text-[13px] text-white/70 hover:bg-[#2a2a2a] hover:text-white truncate">
                Website redesign with design syst...
              </a>
              <a href="#" className="h-[34px] flex items-center px-2.5 rounded-lg text-[13px] text-white/70 hover:bg-[#2a2a2a] hover:text-white truncate">
                Vedic birth chart analysis and life...
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Bottom User Area */}
      <div className="shrink-0 p-3 pt-0">
        <div 
          className={cn(
            "flex items-center p-2 rounded-xl transition-colors cursor-pointer hover:bg-[#2a2a2a] relative group",
            isCollapsed && "justify-center"
          )}
        >
          {/* Avatar */}
          <div className="w-[36px] h-[36px] rounded-full bg-[#E5E2DB] text-[#5C5A56] flex items-center justify-center font-medium shadow-sm shrink-0">
            {userName ? userName[0].toUpperCase() : 'U'}
          </div>

          {!isCollapsed && (
            <div className="flex-1 min-w-0 ml-3 flex flex-col justify-center">
              <div className="text-[14px] font-medium text-white/90 truncate leading-tight">
                {userName}
              </div>
              <div className="text-[12px] text-white/50 leading-tight mt-0.5">
                Free plan
              </div>
            </div>
          )}

          {!isCollapsed && (
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                <ArrowDownToLine size={16} />
              </button>
              <button className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 rounded-md transition-colors">
                <ChevronsUpDown size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

    </nav>
  )
}

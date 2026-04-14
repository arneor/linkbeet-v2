'use client'

import React, { useState } from 'react'
import { AppShell } from '@/components/layout'
import { Search, Mic, Sparkles } from 'lucide-react'

export default function DiscoveryTestDrive() {
  const [query, setQuery] = useState('')

  return (
    <AppShell currentPath="/">
      {/* 
        Force pure black background to match the exact "Google / ChatGPT Dark Mode" vibe.
        This overrides any underlying light-mode themes causing the white-out issue.
      */}
      <div className="flex flex-col w-full min-h-screen bg-[#000000] text-white relative items-center justify-center">
        
        {/* Extreme Minimalism - Content wrapper */}
        <div className="w-full max-w-3xl px-4 flex flex-col items-center pb-40">
          
          {/* Subtle Logo / Greeting */}
          <h1 className="text-4xl md:text-[56px] tracking-tight font-medium mb-10 text-white/90 select-none">
            LinkBeet
          </h1>

          {/* Google / ChatGPT style Pill Input Container */}
          <div className="relative w-full group">
            {/* 
              Fixing the "Square Border" WebKit bug: 
              Using absolute outline-none and ring-0 across the board.
              Using a massive rounded pill shape (rounded-[32px]).
            */}
            <div className="relative flex items-center w-full bg-[#18181A] hover:bg-[#202022] border border-white-[0.08] hover:border-white/20 focus-within:border-[#4B5563] focus-within:bg-[#202022] rounded-[32px] shadow-lg transition-all duration-200">
              
              <div className="pl-6 pr-3 py-4 flex items-center justify-center pointer-events-none">
                <Search className="w-[22px] h-[22px] text-white/40 group-focus-within:text-white/80 transition-colors" />
              </div>
              
              {/* Native styling stripped out to prevent any square bounds */}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent text-white text-lg md:text-xl py-5 px-1 outline-none ring-0 border-none shadow-none placeholder:text-white/30 focus:outline-none focus:ring-0 focus:border-none focus:shadow-none appearance-none"
              />

              <div className="pr-6 pl-2 py-4 flex items-center justify-center gap-4">
                <button className="text-white/40 hover:text-white transition-colors outline-none focus:outline-none focus:ring-0 appearance-none">
                  <Mic className="w-5 h-5" />
                </button>
                {/* "AI Mode" badge mirroring Google's new search bar styling */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-white/70" />
                  <span className="text-sm font-medium text-white/70">AI Mode</span>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal quick links mirroring Google's "Google offered in:" footprint */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3">
            <span className="text-sm text-white/40 mr-1 select-none">Try searching:</span>
            <button className="text-sm text-[#8ab4f8] hover:underline outline-none focus:outline-none focus:ring-0 appearance-none">
              nearby coffee shops
            </button>
            <button className="text-sm text-[#8ab4f8] hover:underline outline-none focus:outline-none focus:ring-0 appearance-none">
              local barbers
            </button>
            <button className="text-sm text-[#8ab4f8] hover:underline outline-none focus:outline-none focus:ring-0 appearance-none">
              plumbers open now
            </button>
          </div>

        </div>

        {/* 
          Removed the "Recent Discoveries" block entirely as requested 
          for absolute minimalist purity. 
        */}

      </div>
    </AppShell>
  )
}

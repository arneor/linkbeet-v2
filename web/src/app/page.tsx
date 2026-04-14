'use client'

import React, { useState, useEffect } from 'react'
import { AppShell } from '@/components/layout'
import { Search, MapPin, Sparkles, Mic, ArrowRight } from 'lucide-react'


export default function DiscoveryTestDrive() {
  const [greeting, setGreeting] = useState('Good evening')
  const [isFocused, setIsFocused] = useState(false)
  const [query, setQuery] = useState('')

  // Determine greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  return (
    <AppShell currentPath="/">
      {/* 
        The entire page acts as the conversational interface payload.
        We drop the "marketing" look for a pure, tool-driven spatial prompt interface. 
      */}
      <div className="flex flex-col w-full min-h-[90dvh] relative">

        {/* Main Interaction Zone (ChatGPT / Perplexity Paradigm) */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 md:px-8 max-w-4xl mx-auto w-full pb-32 pt-20">

          {/* Conversational Greeting */}
          <div className="w-full flex flex-col items-center text-center animate-[fadeInUp_0.8s_ease-out_both]">
            {/* Minimal Agent Status */}
            <div className="flex items-center gap-2 mb-6 px-3 py-1 bg-[#1d1d1f] rounded-full border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono text-white/60 tracking-wider uppercase">LinkBeet Spatial AI</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-2">
              {greeting}, Nidhin.
            </h1>
            <p className="text-lg md:text-xl text-white/50 font-normal tracking-tight">
              What are you looking for near you?
            </p>
          </div>

          {/* Deep Chat-Style Input Container */}
          <div className="w-full mt-10 relative z-20 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
            <div
              className={`
                relative w-full rounded-[24px] bg-[#1d1d1f] border transition-all duration-300 overflow-hidden flex flex-col justify-center
                ${isFocused ? 'border-[#0071e3]/50 shadow-[0_0_40px_-10px_rgba(0,113,227,0.3)]' : 'border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]'}
              `}
            >
              <div className="absolute top-[18px] left-5 pointer-events-none">
                <Search className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-[#0071e3]' : 'text-white/40'}`} />
              </div>

              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask to find a cafe, book a salon, or hire a creator..."
                className="w-full bg-transparent text-white text-[17px] md:text-lg pl-14 pr-[100px] py-[18px] min-h-[60px] max-h-[200px] resize-none outline-none placeholder:text-white/30 font-normal tracking-tight"
                rows={1}
              />

              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button
                  className="flex items-center justify-center w-[36px] h-[36px] rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Mic className="w-[18px] h-[18px]" />
                </button>
                <button
                  className={`
                    flex items-center justify-center w-[36px] h-[36px] rounded-full transition-all duration-300
                    ${query.length > 0 ? 'bg-[#0071e3] text-white hover:bg-[#0077ED] scale-100' : 'bg-white/5 text-white/30 border border-white/10 scale-95 hover:bg-white/10'}
                  `}
                >
                  <ArrowRight className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>
          </div>

          {/* Prompt Suggestions (Asymmetric arrangement for organic feel) */}
          <div className="w-full mt-8 flex flex-wrap justify-center gap-3 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-sm text-white/70 flex items-center gap-2 active:scale-95">
              <MapPin className="w-4 h-4 text-emerald-400" /> Open barbershops near me
            </button>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-sm text-white/70 flex items-center gap-2 active:scale-95">
              <Sparkles className="w-4 h-4 text-purple-400" /> Top-rated specialty coffee
            </button>
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-sm text-white/70 flex items-center gap-2 active:scale-95 md:flex">
              <Search className="w-4 h-4 text-blue-400" /> Photographers for an event
            </button>
          </div>
        </div>

        {/* Ambient background glow tracking the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0071e3] opacity-[0.07] blur-[150px] pointer-events-none rounded-full z-0" />



      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `
      }} />
    </AppShell>
  )
}

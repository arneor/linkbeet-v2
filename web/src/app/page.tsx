'use client'

import React, { useState, useEffect } from 'react'
import { AppShell } from '@/components/layout'
import { Search, MapPin, Sparkles, Mic, ArrowRight, SlidersHorizontal } from 'lucide-react'

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
      <div className="flex flex-col w-full h-full relative">
        {/* Main Interaction Zone (Light Mode AI Chat Paradigm) */}
        <div className="flex-1 flex flex-col justify-center items-center px-4 md:px-8 max-w-3xl mx-auto w-full pt-[10vh] pb-32">
          
          {/* Conversational Greeting */}
          <div className="w-full flex flex-col items-center text-center animate-[fadeInUp_0.8s_ease-out_both]">
            {/* Minimal Agent Status */}
            <div className="flex items-center gap-2 mb-8 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 shadow-sm">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[11px] font-mono font-medium text-slate-500 tracking-wider uppercase">LinkBeet Spatial AI</span>
            </div>

            <h1 className="text-3xl md:text-[44px] font-medium tracking-tight text-slate-900 mb-3">
              {greeting}, Nidhin.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-normal tracking-tight">
              What are you exploring today?
            </p>
          </div>

          {/* Deep Chat-Style Input Container */}
          <div className="w-full mt-10 relative z-20 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
            <div 
              className={`
                relative w-full rounded-[24px] bg-white border transition-all duration-300 overflow-hidden flex flex-col justify-center
                ${isFocused ? 'border-[#0071e3]/40 shadow-[0_4px_30px_rgba(0,113,227,0.15)] ring-4 ring-[#0071e3]/5' : 'border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)]'}
              `}
            >
              <div className="absolute top-[22px] left-5 pointer-events-none">
                <Search className={`w-[22px] h-[22px] transition-colors duration-300 ${isFocused ? 'text-[#0071e3]' : 'text-slate-400'}`} />
              </div>
              
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask to find a cafe, book a salon, or hire a creator..."
                className="w-full bg-transparent text-slate-900 text-[17px] md:text-xl pl-14 pr-[100px] py-[20px] min-h-[140px] max-h-[300px] resize-none outline-none placeholder:text-slate-300 font-normal tracking-tight leading-relaxed"
              />

              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <button 
                  className="flex items-center justify-center w-[40px] h-[40px] rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Mic className="w-[20px] h-[20px]" />
                </button>
                <button 
                  className={`
                    flex items-center justify-center w-[40px] h-[40px] rounded-[20px] transition-all duration-300
                    ${query.length > 0 ? 'bg-[#0071e3] text-white hover:bg-[#0077ED] scale-100 shadow-md' : 'bg-slate-50 text-slate-300 border border-slate-200 scale-95 hover:bg-slate-100'}
                  `}
                >
                  <ArrowRight className="w-[20px] h-[20px]" />
                </button>
              </div>
            </div>
            
            {/* Filter Buttons row precisely below the input */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              <button className="px-3 py-1.5 flex items-center gap-2 text-[13px] font-medium text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm active:scale-95">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
              </button>
              <span className="w-px h-4 bg-slate-200 mx-1" />
              <button className="px-4 py-1.5 text-[13px] font-medium text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm active:scale-95">Restaurants</button>
              <button className="px-4 py-1.5 text-[13px] font-medium text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm active:scale-95">Salons & Spas</button>
              <button className="px-4 py-1.5 text-[13px] font-medium text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition-colors shadow-sm active:scale-95">Creators</button>
              <button className="px-4 py-1.5 text-[13px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full hover:bg-emerald-100 transition-colors shadow-sm active:scale-95">Open Now</button>
            </div>
          </div>

          {/* Floating Prompt Suggestions */}
          <div className="w-full mt-10 flex flex-wrap justify-center gap-3 animate-[fadeInUp_0.8s_ease-out_0.2s_both]">
            <button className="px-4 py-2.5 bg-white border border-slate-200 shadow-sm rounded-2xl hover:bg-slate-50 transition-all text-[14px] font-medium text-slate-600 flex items-center gap-2 active:scale-95">
              <MapPin className="w-[18px] h-[18px] text-emerald-500" /> Open barbershops near me
            </button>
            <button className="px-4 py-2.5 bg-white border border-slate-200 shadow-sm rounded-2xl hover:bg-slate-50 transition-all text-[14px] font-medium text-slate-600 flex items-center gap-2 active:scale-95">
              <Sparkles className="w-[18px] h-[18px] text-purple-500" /> Top-rated specialty coffee
            </button>
            <button className="px-4 py-2.5 bg-white border border-slate-200 shadow-sm rounded-2xl hover:bg-slate-50 transition-all text-[14px] font-medium text-slate-600 flex items-center gap-2 active:scale-95 hidden md:flex">
              <Search className="w-[18px] h-[18px] text-[#0071e3]" /> Photographers for an event
            </button>
          </div>
        </div>

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

'use client'

import React, { useState, useEffect } from 'react'
import { AppShell } from '@/components/layout'
import { Card, Avatar, Badge } from '@linkbeet/ui'
import { Search, MapPin, Sparkles, Mic, ArrowRight } from 'lucide-react'

// Authentic, organic dummy data obeying "Jane Doe Effect" rule
const MOCK_PROFILES = [
  {
    id: 1,
    name: 'Aria Software Solutions',
    industry: 'Enterprise',
    dist: '1.2 km',
    logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=128&h=128&fit=crop',
    rating: '4.92',
    reviews: 142,
  },
  {
    id: 2,
    name: 'Kova Coffee Roasters',
    industry: 'Cafe',
    dist: '0.4 km',
    logo: null,
    rating: '4.78',
    reviews: 89,
  },
  {
    id: 3,
    name: 'Aura Aesthetics Studio',
    industry: 'Saloon',
    dist: '2.1 km',
    logo: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=128&h=128&fit=crop',
    rating: '4.85',
    reviews: 312,
  },
]

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
          <div className="w-full mt-12 relative z-20 animate-[fadeInUp_0.8s_ease-out_0.1s_both]">
            <div 
              className={`
                relative w-full rounded-3xl bg-[#1d1d1f] border transition-all duration-300
                ${isFocused ? 'border-[#0071e3]/50 shadow-[0_0_40px_-10px_rgba(0,113,227,0.3)]' : 'border-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]'}
              `}
            >
              <div className="absolute top-5 left-6 pointer-events-none">
                <Search className={`w-6 h-6 transition-colors duration-300 ${isFocused ? 'text-[#0071e3]' : 'text-white/40'}`} />
              </div>
              
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask to find a cafe, book a salon, or hire a creator..."
                className="w-full bg-transparent text-white text-lg md:text-xl px-16 py-6 min-h-[72px] max-h-[200px] resize-none outline-none placeholder:text-white/30"
                rows={1}
              />

              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
                <button 
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                    ${query.length > 0 ? 'bg-[#0071e3] text-white hover:bg-[#0077ED] scale-100' : 'bg-white/5 text-white/30 border border-white/10 scale-95'}
                  `}
                >
                  <ArrowRight className="w-5 h-5" />
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
            <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all text-sm text-white/70 flex items-center gap-2 active:scale-95 hidden md:flex">
              <Search className="w-4 h-4 text-blue-400" /> Photographers for an event
            </button>
          </div>
        </div>

        {/* Ambient background glow tracking the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0071e3] opacity-[0.07] blur-[150px] pointer-events-none rounded-full z-0" />

        {/* Discovery Feed (Pushed to bottom, minimal footprint until search) */}
        <div className="w-full mt-auto bg-[#f5f5f7] rounded-t-[3rem] px-6 py-12 border-t border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.1)] relative z-10">
          <div className="max-w-4xl mx-auto w-full">
            <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-6 flex items-center gap-2">
              Recent Discoveries in your area
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
              {MOCK_PROFILES.map((profile, i) => (
                <Card
                  key={profile.id}
                  variant="light"
                  style={{ animationDelay: `${(i * 100) + 400}ms` }}
                  className="group p-5 flex flex-col gap-4 cursor-pointer rounded-3xl border border-slate-200 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 animate-[fadeInUp_0.5s_ease-out_both]"
                >
                  <div className="flex items-start justify-between">
                    <Avatar
                      size="lg"
                      name={profile.name}
                      src={profile.logo || undefined}
                      className="w-12 h-12 ring-1 ring-slate-200/50"
                    />
                    <Badge variant="default" className="bg-slate-100 text-slate-600 font-mono text-[10px] uppercase shadow-none border-none">
                      {profile.dist}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-slate-900 tracking-tight group-hover:text-[#0071e3] transition-colors truncate">
                      {profile.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-[#F59E0B]">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        {profile.rating}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span>{profile.industry}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
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

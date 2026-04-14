'use client'

import React from 'react'
import { AppShell } from '@/components/layout'
import { Input, Button, Card, Avatar, Badge } from '@linkbeet/ui'
import { ChevronRight, Search, MapPin, Sparkles } from 'lucide-react'

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
  {
    id: 4,
    name: 'Lumina Creative Co.',
    industry: 'Creator',
    dist: '5.0 km',
    logo: null,
    rating: '5.00',
    reviews: 12,
  },
]

export default function DiscoveryTestDrive() {
  return (
    <AppShell currentPath="/">
      {/* Container with top max-width but asymmetrical inner layout */}
      <div className="flex flex-col gap-6 md:gap-12 pb-24">
        {/* HERO SECTION - Asymmetric, Pure Black (#000000), Liquid Glass Refraction */}
        <section className="section-dark rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center gap-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden min-h-[70dvh]">
          {/* Subtle glow effect */}
          <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-[#0071e3] opacity-20 blur-[120px] pointer-events-none rounded-full" />

          {/* Left Content (Anti-Center Bias) */}
          <div className="flex-1 flex flex-col items-start text-left z-10 w-full">
            <Badge
              variant="interactive"
              className="mb-8 px-4 py-1.5 bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl text-white/90 font-medium"
            >
              <Sparkles className="w-4 h-4 mr-2 inline text-[#0071e3]" /> LinkBeet v2 Architecture
            </Badge>

            {/* Display Typography */}
            <h1 className="text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tighter max-w-2xl mb-8">
              Find exactly what you need. <br />
              <span className="text-[#0071e3]">Near you.</span>
            </h1>

            <p className="text-lg md:text-xl font-normal leading-relaxed text-white/60 max-w-[55ch] mb-12">
              A meticulously crafted digital touchpoint. Leveraging fluid typography, absolute optical tracking, and purposeful pure-black aesthetics to override generic design bias.
            </p>

            <div className="w-full max-w-[500px] flex flex-col gap-5">
              <div className="relative group w-full">
                {/* Liquid Glass Input */}
                <Input
                  variant="search"
                  placeholder="Search businesses, creators..."
                  className="h-16 pl-12 pr-32 text-lg bg-white/5 border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] text-white placeholder:text-white/40 focus-visible:outline-[#0071e3] focus-visible:bg-white/10 transition-all duration-300 rounded-2xl"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-[#0071e3] transition-colors" />
                <Button
                  variant="primaryBlue"
                  size="sm"
                  className="absolute right-2 top-2 bottom-2 rounded-xl px-6 font-semibold active:scale-[0.98] active:-translate-y-[1px] transition-all"
                >
                  Search
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-white/30 uppercase tracking-widest">
                  Try:
                </span>
                <Button
                  variant="ghost"
                  className="h-8 text-xs text-white/60 hover:text-white px-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10"
                >
                  Specialty Coffee
                </Button>
                <Button
                  variant="ghost"
                  className="h-8 text-xs text-white/60 hover:text-white px-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10"
                >
                  Barbershop
                </Button>
                <Button
                  variant="ghost"
                  className="h-8 text-xs text-white/60 hover:text-white px-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-transparent hover:border-white/10"
                >
                  Boutique
                </Button>
              </div>
            </div>
          </div>

          {/* Right Visual / Asymmetric Space */}
          <div className="hidden lg:flex flex-1 relative w-full h-[500px] justify-center items-center pointer-events-none">
            {/* Staggered floating elements simulating a Bento grid */}
            <div className="absolute top-20 right-10 w-72 h-40 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-2xl shadow-2xl skew-y-3 transform hover:rotate-0 transition-transform duration-700 p-6 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]" />
              <div>
                <div className="w-2/3 h-2 rounded-full bg-white/20" />
                <div className="w-1/3 h-2 rounded-full bg-white/20 mt-3" />
              </div>
            </div>
            <div className="absolute bottom-20 left-10 w-64 h-56 bg-[#0071e3]/10 border border-[#0071e3]/30 rounded-3xl backdrop-blur-2xl shadow-[0_20px_40px_-5px_rgba(0,113,227,0.3)] -skew-y-3 transform hover:rotate-0 transition-transform duration-700 delay-150 p-6 flex flex-col justify-end">
              <div className="w-full h-2 rounded-full bg-[#0071e3]/50" />
              <div className="w-3/4 h-2 rounded-full bg-[#0071e3]/50 mt-3" />
            </div>
          </div>
        </section>

        {/* FEED SECTION - Bento 2.0 Paradigm, Light Background */}
        <section className="section-light rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] bg-white border border-slate-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-slate-900 mb-2">
                Trending Nearby
              </h2>
              <p className="text-base text-slate-500 max-w-[50ch] flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#0071e3]" /> Based on your current coordinates
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-[#0071e3] font-medium group flex items-center gap-1 hover:bg-[#0071e3]/5 active:scale-[0.98] active:-translate-y-[1px] transition-all"
            >
              View all results{' '}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
            {MOCK_PROFILES.map((profile, i) => (
              <Card
                key={profile.id}
                variant="light"
                // Using staggered animation delays for visual cascade
                style={{ animationDelay: `${i * 100}ms` }}
                className="group p-6 flex flex-row items-center gap-5 cursor-pointer rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.06)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 animate-[fadeInUp_0.5s_ease-out_both]"
              >
                <div className="relative">
                  <Avatar
                    size="xl"
                    name={profile.name}
                    src={profile.logo || undefined}
                    className="w-16 h-16 shrink-0 ring-1 ring-slate-200/50 shadow-sm"
                  />
                  {/* Micro-interaction status dot indicating "Active" */}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-lg font-semibold text-slate-900 tracking-tight truncate group-hover:text-[#0071e3] transition-colors">
                      {profile.name}
                    </h3>
                    <Badge
                      variant="default" // Might be visually overridden by the class but structure stays
                      className="shrink-0 bg-slate-100 text-slate-600 border-none font-mono text-xs shadow-none"
                    >
                      {profile.dist}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                    <span className="flex items-center gap-1 font-medium text-slate-700">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                        className="text-[#F59E0B]"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      {profile.rating}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500">{profile.industry}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-400 font-mono text-xs">
                      {profile.reviews} reviews
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Tailwind specific keyframes for CSS stagger effect */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `
      }} />
    </AppShell>
  )
}

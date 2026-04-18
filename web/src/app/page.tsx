'use client'

import { LogoBlock, HeroSearch } from '@/components/home'

export default function DiscoveryPage() {
  return (
    <div className="flex flex-col items-center justify-start pt-[6vh] md:pt-0 md:justify-center w-full min-h-[calc(100dvh-100px)] px-1 md:px-0">
      <LogoBlock />
      <HeroSearch />
    </div>
  )
}

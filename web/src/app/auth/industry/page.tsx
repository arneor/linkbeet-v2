'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { AuthHeading, AuthShell, IndustryCard } from '@/components/auth'
import { INDUSTRIES } from '@/data/industries'

export default function IndustryPage() {
  const router = useRouter()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const handleContinue = () => {
    if (!selectedId) return
    router.push('/')
  }

  const handleSkip = () => {
    router.push('/')
  }

  return (
    <AuthShell showBack>
      <AuthHeading title="What's your industry?" subtitle="Select one to tailor your experience" />

      <div role="radiogroup" aria-label="Industry" className="flex flex-wrap justify-center gap-3">
        {INDUSTRIES.map((industry) => (
          <IndustryCard
            key={industry.id}
            industry={industry}
            selected={selectedId === industry.id}
            onSelect={setSelectedId}
          />
        ))}
      </div>

      <div className="mt-12 md:mt-14 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={handleSkip}
          className="h-[44px] px-6 rounded-[8px] border border-slate-200 bg-white text-slate-700 text-[14px] font-medium hover:bg-slate-50 transition-colors"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedId}
          className="h-[44px] px-6 rounded-[8px] bg-accent text-white text-[14px] font-medium hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          Continue
        </button>
      </div>
    </AuthShell>
  )
}

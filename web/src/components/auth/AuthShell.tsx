'use client'

import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface AuthShellProps {
  children: React.ReactNode
  showBack?: boolean
}

export function AuthShell({ children, showBack = false }: AuthShellProps) {
  const router = useRouter()

  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <header className="flex items-center justify-between px-4 md:px-8 h-[64px] md:h-[72px] shrink-0">
        <Link
          href="/"
          aria-label="LinkBeet home"
          className="flex items-center gap-2 rounded-[8px] outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <Image
            src="/black-logo.png"
            alt=""
            width={28}
            height={28}
            className="w-[26px] h-[26px] object-contain"
            priority
            unoptimized
          />
          <span className="text-[18px] md:text-[20px] font-medium tracking-tight text-slate-900 leading-none">
            LinkBeet
          </span>
        </Link>

        {showBack && (
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1.5 text-[14px] text-slate-600 hover:text-slate-900 rounded-[8px] px-2 py-1.5 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center justify-start md:justify-center px-4 md:px-8 pb-10">
        <div className="w-full max-w-[880px] animate-[fadeInUp_0.6s_ease-out_both]">{children}</div>
      </main>
    </div>
  )
}

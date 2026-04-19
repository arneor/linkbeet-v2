'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { AuthHeading, AuthShell, AuthTextField, SocialButton } from '@/components/auth'

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | undefined>(undefined)

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) {
      setError('Enter your email to continue')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Enter a valid email address')
      return
    }
    setError(undefined)
    router.push('/auth/industry')
  }

  return (
    <AuthShell>
      <AuthHeading
        title="Log in"
        subtitle={
          <>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="text-accent hover:underline font-medium">
              Sign Up
            </Link>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-10 md:gap-0 items-start">
        <form onSubmit={handleContinue} className="w-full md:pr-12 flex flex-col gap-8">
          <AuthTextField
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError(undefined)
            }}
            error={error}
          />
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-[13px] text-slate-600 hover:text-slate-900 underline underline-offset-2"
            >
              Forgot Email?
            </button>
          </div>
          <button
            type="submit"
            className="self-start h-[44px] px-6 rounded-full border border-accent text-accent font-medium text-[15px] hover:bg-accent/5 transition-colors active:scale-[0.98] inline-flex items-center gap-2"
          >
            Continue with Email
            <span aria-hidden="true">›</span>
          </button>
        </form>

        <div className="hidden md:flex flex-col items-center px-8">
          <div className="w-px flex-1 bg-slate-200" />
          <span className="my-3 text-[13px] text-slate-500">or</span>
          <div className="w-px flex-1 bg-slate-200" />
        </div>

        <div className="md:hidden relative text-center">
          <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
          <span className="relative inline-block bg-white px-3 text-[13px] text-slate-500">or</span>
        </div>

        <div className="w-full md:pl-12 flex flex-col gap-3">
          <SocialButton provider="google" />
          <SocialButton provider="facebook" />
          <SocialButton provider="apple" />

        </div>
      </div>

      <AuthFooter />
    </AuthShell>
  )
}

function AuthFooter() {
  return (
    <footer className="mt-16 md:mt-20 text-center text-[12px] text-slate-500">
      <p className="space-x-4">
        <Link href="#" className="underline underline-offset-2 hover:text-slate-700">
          Terms of Use
        </Link>
        <Link href="#" className="underline underline-offset-2 hover:text-slate-700">
          Privacy Policy
        </Link>
      </p>
    </footer>
  )
}

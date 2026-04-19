'use client'

import { cn } from '@linkbeet/utils'

export type SocialProvider = 'google' | 'facebook' | 'apple'

interface SocialButtonProps {
  provider: SocialProvider
  onClick?: () => void
  disabled?: boolean
}

const LABEL: Record<SocialProvider, string> = {
  google: 'Continue with Google',
  facebook: 'Continue with Facebook',
  apple: 'Continue with Apple',
}

const VARIANT: Record<SocialProvider, string> = {
  google: 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50',
  facebook: 'bg-[#1877F2] border border-[#1877F2] text-white hover:bg-[#166FE0]',
  apple: 'bg-white border border-slate-200 text-slate-900 hover:bg-slate-50',
}

export function SocialButton({ provider, onClick, disabled }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'w-full h-[48px] rounded-[8px] inline-flex items-center gap-3 px-4 text-[15px] font-medium',
        'transition-colors disabled:opacity-60 disabled:cursor-not-allowed',
        VARIANT[provider],
      )}
    >
      <span className="w-6 h-6 inline-flex items-center justify-center shrink-0">
        <ProviderIcon provider={provider} />
      </span>
      <span className="flex-1 text-center pr-6">{LABEL[provider]}</span>
    </button>
  )
}

function ProviderIcon({ provider }: { provider: SocialProvider }) {
  if (provider === 'google') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.84A10.99 10.99 0 0 0 12 23Z"
        />
        <path
          fill="#FBBC05"
          d="M5.85 14.1a6.6 6.6 0 0 1 0-4.2V7.07H2.18a10.99 10.99 0 0 0 0 9.86l3.67-2.83Z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.2 1.64l3.15-3.15C17.45 2.08 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.67 2.83C6.71 7.31 9.14 5.38 12 5.38Z"
        />
      </svg>
    )
  }
  if (provider === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" aria-hidden="true">
        <path
          fill="currentColor"
          d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z"
        />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.37 12.74c-.03-2.79 2.28-4.13 2.39-4.2-1.3-1.9-3.33-2.16-4.05-2.19-1.72-.17-3.37 1.01-4.24 1.01-.88 0-2.22-.99-3.66-.96-1.88.03-3.63 1.1-4.6 2.79-1.97 3.41-.5 8.45 1.4 11.22.93 1.34 2.03 2.85 3.47 2.8 1.4-.06 1.93-.9 3.62-.9 1.69 0 2.16.9 3.64.87 1.5-.03 2.45-1.37 3.36-2.71 1.06-1.56 1.5-3.06 1.53-3.14-.03-.01-2.93-1.13-2.96-4.49ZM13.73 4.7c.76-.93 1.28-2.21 1.14-3.49-1.1.05-2.43.74-3.22 1.66-.7.81-1.32 2.12-1.15 3.37 1.23.1 2.49-.62 3.23-1.54Z"
      />
    </svg>
  )
}

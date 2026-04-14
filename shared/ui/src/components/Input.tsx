import React from 'react'
import { cn } from '../lib/utils'

// ─── Input ────────────────────────────────────────────────────
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: 'default' | 'search'
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, leftIcon, rightIcon, variant = 'default', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-[14px] font-semibold leading-[1.29] tracking-[-0.224px] text-[#1d1d1f]"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.48)]">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-[#fafafc] rounded-[11px] border border-[rgba(0,0,0,0.04)] px-[14px] py-[8px]',
              'text-[17px] leading-[1.47] tracking-[-0.374px] text-[#1d1d1f]',
              'placeholder:text-[rgba(0,0,0,0.48)]',
              'focus-visible:outline-2 focus-visible:outline-[#0071e3] focus-visible:outline-offset-2',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-colors duration-150',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-[#EF4444] focus-visible:outline-[#EF4444]',
              variant === 'search' && 'pl-10',
              className,
            )}
            {...props}
          />
          {variant === 'search' && !leftIcon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.48)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
          )}
          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.48)]">
              {rightIcon}
            </span>
          )}
        </div>
        {error && (
          <p className="text-[14px] leading-[1.29] tracking-[-0.224px] text-[#EF4444]">{error}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

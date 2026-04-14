import React from 'react'
import { cn } from '../lib/utils'

// ─── Button ───────────────────────────────────────────────────
export type ButtonVariant =
  | 'primaryBlue'
  | 'primaryDark'
  | 'pillLink'
  | 'filter'
  | 'mediaControl'
  | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const buttonVariantClasses: Record<ButtonVariant, string> = {
  primaryBlue:
    'bg-[#0071e3] text-white hover:bg-[#0077ED] active:bg-[#0068D1] rounded-[8px] px-[15px] py-[8px]',
  primaryDark:
    'bg-[#1d1d1f] text-white hover:bg-[#2d2d2f] active:bg-[#0d0d0f] rounded-[8px] px-[15px] py-[8px]',
  pillLink:
    'bg-transparent text-[#0066cc] border border-[#0066cc] rounded-[980px] px-[15px] py-[8px] hover:underline',
  filter:
    'bg-[#fafafc] text-[rgba(0,0,0,0.8)] border-[3px] border-[rgba(0,0,0,0.04)] rounded-[11px] px-[14px] py-0',
  mediaControl:
    'bg-[rgba(210,210,215,0.64)] text-[rgba(0,0,0,0.48)] rounded-full active:scale-90 transition-transform',
  ghost: 'bg-transparent hover:bg-black/5 active:bg-black/10',
}

const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'text-[17px]',
  lg: 'px-6 py-3 text-lg',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primaryBlue',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-normal transition-colors duration-150',
          'focus-visible:outline-2 focus-visible:outline-[#0071e3] focus-visible:outline-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          buttonVariantClasses[variant],
          buttonSizeClasses[size],
          className,
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  },
)

Button.displayName = 'Button'

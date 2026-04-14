import React from 'react'
import { cn } from '../lib/utils'

// ─── Badge ────────────────────────────────────────────────────
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'interactive' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
}

const badgeVariantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-[#f5f5f7] text-[#1d1d1f]',
  interactive: 'bg-[#0071e3] text-white',
  success: 'bg-[#D1FAE5] text-[#065F46]',
  warning: 'bg-[#FEF3C7] text-[#92400E]',
  error: 'bg-[#FEE2E2] text-[#991B1B]',
}

const badgeSizeClasses: Record<NonNullable<BadgeProps['size']>, string> = {
  sm: 'text-[10px] px-1.5 py-0.5',
  md: 'text-[12px] px-2 py-0.5',
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center font-semibold rounded-[5px] leading-none',
          badgeVariantClasses[variant],
          badgeSizeClasses[size],
          className,
        )}
        {...props}
      />
    )
  },
)

Badge.displayName = 'Badge'

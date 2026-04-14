import React from 'react'
import { cn } from '../lib/utils'

// ─── LoadingState ─────────────────────────────────────────────
export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'spinner' | 'skeleton' | 'dots'
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const spinnerSizeMap: Record<NonNullable<LoadingStateProps['size']>, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-10 h-10',
}

function Spinner({ size = 'md' }: { size?: LoadingStateProps['size'] }) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-[#f5f5f7] border-t-[#0071e3]',
        spinnerSizeMap[size],
      )}
      role="status"
      aria-label="Loading"
    />
  )
}

function Skeleton() {
  return (
    <div className="w-full max-w-[280px] space-y-3">
      <div className="h-4 w-full rounded-[5px] bg-[#f5f5f7] animate-pulse" />
      <div className="h-4 w-4/5 rounded-[5px] bg-[#f5f5f7] animate-pulse" />
      <div className="h-4 w-3/5 rounded-[5px] bg-[#f5f5f7] animate-pulse" />
    </div>
  )
}

function Dots() {
  return (
    <div className="flex items-center gap-1.5" role="status" aria-label="Loading">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-[#0071e3] animate-bounce"
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  )
}

export const LoadingState = React.forwardRef<HTMLDivElement, LoadingStateProps>(
  ({ className, variant = 'spinner', size = 'md', label, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center gap-3 py-8', className)}
        {...props}
      >
        {variant === 'spinner' && <Spinner size={size} />}
        {variant === 'skeleton' && <Skeleton />}
        {variant === 'dots' && <Dots />}
        {label && (
          <p className="text-[14px] leading-[1.29] tracking-[-0.224px] text-[rgba(0,0,0,0.48)]">
            {label}
          </p>
        )}
      </div>
    )
  },
)

LoadingState.displayName = 'LoadingState'

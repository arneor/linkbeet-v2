import React from 'react'
import { cn } from '../lib/utils'

// ─── EmptyState ───────────────────────────────────────────────
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: React.ReactNode
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col items-center justify-center py-12 px-6 text-center', className)}
        {...props}
      >
        {icon && (
          <div className="mb-4 text-[rgba(0,0,0,0.48)]" style={{ fontSize: 48 }}>
            {icon}
          </div>
        )}
        <h3 className="text-[21px] font-semibold leading-[1.19] tracking-[0.231px] text-[#1d1d1f] mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-[17px] leading-[1.47] tracking-[-0.374px] text-[rgba(0,0,0,0.48)] max-w-[400px]">
            {description}
          </p>
        )}
        {action && <div className="mt-6">{action}</div>}
      </div>
    )
  },
)

EmptyState.displayName = 'EmptyState'

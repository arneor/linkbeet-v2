import React from 'react'
import { cn } from '../lib/utils'

// ─── Card ─────────────────────────────────────────────────────
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark' | 'elevated' | 'ghost'
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'light', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[8px] p-6',
          {
            'bg-[#f5f5f7]': variant === 'light',
            'bg-[#272729] text-white': variant === 'dark',
            'bg-white shadow-[3px_5px_30px_rgba(0,0,0,0.22)]': variant === 'elevated',
            'bg-transparent': variant === 'ghost',
          },
          className,
        )}
        {...props}
      />
    )
  },
)
Card.displayName = 'Card'

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props} />
  ),
)
CardHeader.displayName = 'CardHeader'

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'font-bold text-[21px] leading-[1.19] tracking-[0.231px]',
        className,
      )}
      {...props}
    />
  ),
)
CardTitle.displayName = 'CardTitle'

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('', className)} {...props} />,
)
CardContent.displayName = 'CardContent'

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center pt-4', className)} {...props} />
  ),
)
CardFooter.displayName = 'CardFooter'

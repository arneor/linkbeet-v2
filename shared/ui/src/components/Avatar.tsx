import React from 'react'
import { cn } from '../lib/utils'

// ─── Avatar ───────────────────────────────────────────────────
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const avatarSizeMap: Record<NonNullable<AvatarProps['size']>, number> = {
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
}

const avatarFontSizeMap: Record<NonNullable<AvatarProps['size']>, string> = {
  sm: 'text-[12px]',
  md: 'text-[14px]',
  lg: 'text-[21px]',
  xl: 'text-[28px]',
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
  }
  return (parts[0]?.[0] ?? '?').toUpperCase()
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, size = 'md', ...props }, ref) => {
    const dimension = avatarSizeMap[size]

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0',
          className,
        )}
        style={{ width: dimension, height: dimension }}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="w-full h-full object-cover"
          />
        ) : name ? (
          <div
            className={cn(
              'w-full h-full flex items-center justify-center bg-[#0071e3] text-white font-semibold',
              avatarFontSizeMap[size],
            )}
          >
            {getInitials(name)}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#f5f5f7] text-[rgba(0,0,0,0.48)]">
            <svg
              width={dimension * 0.5}
              height={dimension * 0.5}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        )}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'

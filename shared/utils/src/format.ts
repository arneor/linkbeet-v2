// Format numbers
export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('en-IN', options).format(value)
}

// Format compact numbers (1.2K, 3.4M)
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

// Format currency (INR default)
export function formatCurrency(amount: number, currency = 'INR', locale = 'en-IN'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Format date
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...options,
  }).format(new Date(date))
}

// Format relative time (2 hours ago, 3 days ago)
export function formatRelativeTime(date: string | Date): string {
  const now = new Date()
  const target = new Date(date)
  const diffMs = now.getTime() - target.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffDays / 365)

  if (diffSecs < 60) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 30) return `${diffDays}d ago`
  if (diffMonths < 12) return `${diffMonths}mo ago`
  return `${diffYears}y ago`
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

// Capitalize first letter
export function capitalize(text: string): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

// Title case
export function toTitleCase(text: string): string {
  return text
    .split(' ')
    .map((word) => capitalize(word))
    .join(' ')
}

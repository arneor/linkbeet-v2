import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS class names, resolving conflicts correctly.
 * Migrated from @linkbeet/ui — web-only utility (no Flutter equivalent).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

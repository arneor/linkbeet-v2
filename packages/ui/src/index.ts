import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with conflict resolution.
 * Combines clsx and tailwind-merge for a powerful class utility.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ─── Component Exports ────────────────────────────────────────────────────────
// Add your shared UI components here as the library grows.
// Example: export { Button } from './components/button';
// Example: export { Input } from './components/input';
// Example: export { Card, CardContent, CardHeader } from './components/card';

// ─── Re-exports ───────────────────────────────────────────────────────────────
export { clsx };
export { twMerge };

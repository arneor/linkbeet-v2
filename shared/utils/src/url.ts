// Build profile URL
export function buildProfileUrl(username: string, baseUrl = 'https://linkbeet.com'): string {
  return `${baseUrl}/${username}`
}

// Extract username from URL
export function extractUsernameFromUrl(url: string): string | null {
  try {
    const parsed = new URL(url)
    const parts = parsed.pathname.split('/').filter(Boolean)
    return parts[0] ?? null
  } catch {
    return null
  }
}

// Check if valid URL
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Add https if missing
export function normalizeUrl(url: string): string {
  if (!url) return url
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return `https://${url}`
}

// Get domain from URL
export function getDomain(url: string): string | null {
  try {
    return new URL(normalizeUrl(url)).hostname
  } catch {
    return null
  }
}

// Build query string from object
export function buildQueryString(
  params: Record<string, string | number | boolean | undefined>,
): string {
  const filtered = Object.entries(params)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
  return filtered.length > 0 ? `?${filtered.join('&')}` : ''
}

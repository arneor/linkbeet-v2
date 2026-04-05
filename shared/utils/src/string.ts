// Generate slug from text
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Generate random string
export function randomString(length = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// Generate username from email
export function usernameFromEmail(email: string): string {
  return email.split('@')[0]?.replace(/[^a-zA-Z0-9]/g, '') ?? ''
}

// Check if valid username
// (lowercase, alphanumeric, underscore, 3-30 chars)
export function isValidUsername(username: string): boolean {
  return /^[a-z0-9_]{3,30}$/.test(username)
}

// Mask email (j***@gmail.com)
export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return email
  const masked = local.charAt(0) + '***'
  return `${masked}@${domain}`
}

// Mask phone (+91 98***1234)
export function maskPhone(phone: string): string {
  if (phone.length < 6) return phone
  return phone.slice(0, -6) + '***' + phone.slice(-3)
}

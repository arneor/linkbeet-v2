/**
 * JWT access token payload shape.
 * Stored inside the token and injected via @CurrentUser().
 */
export interface JwtPayload {
  /** account id (UUID) */
  sub: string
  /** auth_user id */
  userId: string
  /** account mode */
  mode: 'normal' | 'business'
  /** issued at */
  iat?: number
  /** expires at */
  exp?: number
}

import { SetMetadata } from '@nestjs/common'

export const IS_PUBLIC_KEY = 'isPublic'

/**
 * @Public() — marks a route as publicly accessible (skips JwtAuthGuard).
 * Use on controllers or individual route handlers.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true)

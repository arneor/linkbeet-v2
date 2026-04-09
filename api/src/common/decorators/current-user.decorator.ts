import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { FastifyRequest } from 'fastify'

/**
 * @CurrentUser() — injects the authenticated user from request.user.
 * Populated by JwtAuthGuard.
 */
export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<FastifyRequest & { user?: unknown }>()
  return request.user
})

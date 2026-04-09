import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'

import { JwtPayload } from '../types/jwt-payload.type'

/**
 * BusinessModeGuard — returns 403 with reason: business_mode_required
 * when a Normal mode user attempts a Business-gated action.
 *
 * Applied per-controller or per-route on any business-only endpoint.
 */
@Injectable()
export class BusinessModeGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const request = context.switchToHttp().getRequest<any>()
    const user: JwtPayload | undefined = request.user

    if (!user || user.mode !== 'business') {
      throw new ForbiddenException({
        reason: 'business_mode_required',
        message: 'This action requires Business mode. Unlock it in Settings.',
      })
    }
    return true
  }
}

import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'

/**
 * AuthService — Better Auth, JWT issue/refresh/revoke, OTP, OAuth callbacks,
 * anonymous session creation.
 */
@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
}

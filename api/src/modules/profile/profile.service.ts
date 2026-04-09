import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'

/**
 * ProfileService — slug uniqueness, bio layout CRUD, theme CRUD,
 * link ordering, video embed URL validation, QR code generation.
 */
@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}
}

import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'

/**
 * SupportService — ticket CRUD, status updates.
 */
@Injectable()
export class SupportService {
  constructor(private readonly prisma: PrismaService) {}
}

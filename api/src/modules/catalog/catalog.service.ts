import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'

/**
 * CatalogService — list / collection CRUD, aggregate representations.
 */
@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}
}

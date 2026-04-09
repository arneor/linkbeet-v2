import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'

/**
 * ConnectionsService — connection request CRUD, mutual accept logic,
 * retrieving connection lists.
 */
@Injectable()
export class ConnectionsService {
  constructor(private readonly prisma: PrismaService) {}
}

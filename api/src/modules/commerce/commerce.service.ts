import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { PaymentsService } from '../payments/payments.service'

/**
 * CommerceService — Product CRUD, order lifecycle, cart management.
 */
@Injectable()
export class CommerceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly payments: PaymentsService,
  ) {}
}

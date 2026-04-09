import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'
import { PaymentsService } from '../payments/payments.service'

/**
 * BookingService — Service CRUD, slot availability logic,
 * booking state machine.
 */
@Injectable()
export class BookingService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly payments: PaymentsService,
  ) {}
}

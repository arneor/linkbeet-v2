import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { PrismaService } from '../../prisma/prisma.service'

/**
 * PaymentsService — Interface with Razorpay, handles split payments,
 * validates webhook signatures.
 */
@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}
}

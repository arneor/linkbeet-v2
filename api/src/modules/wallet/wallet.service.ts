import { Injectable } from '@nestjs/common'

import { PrismaService } from '../../prisma/prisma.service'

/**
 * WalletService — reads ledger for user balance, logs transactions.
 */
@Injectable()
export class WalletService {
  constructor(private readonly prisma: PrismaService) {}
}

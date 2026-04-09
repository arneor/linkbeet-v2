import { Module } from '@nestjs/common'

import { WalletController } from './wallet.controller'
import { WalletService } from './wallet.service'

/**
 * WalletModule — Internal ledger, transaction history,
 * balance fetching (from successful payment events).
 */
@Module({
  controllers: [WalletController],
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}

import { Module } from '@nestjs/common'

import { PaymentsModule } from '../payments/payments.module'

import { CommerceController } from './commerce.controller'
import { CommerceService } from './commerce.service'

/**
 * CommerceModule — Product catalogue items, cart, checkout,
 * order state machine, and payout triggers.
 */
@Module({
  imports: [PaymentsModule],
  controllers: [CommerceController],
  providers: [CommerceService],
  exports: [CommerceService],
})
export class CommerceModule {}

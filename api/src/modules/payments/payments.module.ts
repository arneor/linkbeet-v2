import { Module } from '@nestjs/common'

import { PaymentsController } from './payments.controller'
import { PaymentsService } from './payments.service'

/**
 * PaymentsModule — Razorpay integration, intent creation,
 * webhook handling, payout processing, platform fee split.
 */
@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService], // Exported for Commerce/Booking
})
export class PaymentsModule {}

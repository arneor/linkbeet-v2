import { Module } from '@nestjs/common'

import { PaymentsModule } from '../payments/payments.module'

import { BookingController } from './booking.controller'
import { BookingService } from './booking.service'

/**
 * BookingModule — Service catalogue, availability slots,
 * booking state machine, calendar integration.
 */
@Module({
  imports: [PaymentsModule],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService],
})
export class BookingModule {}

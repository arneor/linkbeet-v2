import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** BookingController — /api/v1/bookings */
@ApiTags('bookings')
@Controller('bookings')
export class BookingController {}

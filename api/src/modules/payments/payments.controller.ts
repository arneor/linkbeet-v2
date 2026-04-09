import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** PaymentsController — /api/v1/payments (mainly webhooks) */
@ApiTags('payments')
@Controller('payments')
export class PaymentsController {}

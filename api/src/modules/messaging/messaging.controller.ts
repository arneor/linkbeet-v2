import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** MessagingController — /api/v1/messaging */
@ApiTags('messaging')
@Controller('messaging')
export class MessagingController {}

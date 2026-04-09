import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** SupportController — /api/v1/support */
@ApiTags('support')
@Controller('support')
export class SupportController {}

import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** CommerceController — /api/v1/commerce */
@ApiTags('commerce')
@Controller('commerce')
export class CommerceController {}

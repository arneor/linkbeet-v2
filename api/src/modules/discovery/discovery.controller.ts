import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** DiscoveryController — /api/v1/discovery */
@ApiTags('discovery')
@Controller('discovery')
export class DiscoveryController {}

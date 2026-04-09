import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** AnalyticsController — /api/v1/analytics */
@ApiTags('analytics')
@Controller('analytics')
export class AnalyticsController {}

import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** GamificationController — /api/v1/gamification */
@ApiTags('gamification')
@Controller('gamification')
export class GamificationController {}

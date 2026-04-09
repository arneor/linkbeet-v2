import { Module } from '@nestjs/common'

import { GamificationController } from './gamification.controller'
import { GamificationService } from './gamification.service'

/**
 * GamificationModule — Badges, leaderboards, reward points,
 * and unlocking levels based on app usage.
 */
@Module({
  controllers: [GamificationController],
  providers: [GamificationService],
  exports: [GamificationService],
})
export class GamificationModule {}

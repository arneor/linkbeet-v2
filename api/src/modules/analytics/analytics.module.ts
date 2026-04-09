import { Module } from '@nestjs/common'

import { AnalyticsController } from './analytics.controller'
import { AnalyticsService } from './analytics.service'

/**
 * AnalyticsModule — Ingests sync/async events (views, clicks, orders),
 * serves aggregated metrics to clients.
 */
@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}

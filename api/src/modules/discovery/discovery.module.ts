import { Module } from '@nestjs/common'

import { DiscoveryController } from './discovery.controller'
import { DiscoveryService } from './discovery.service'

/**
 * DiscoveryModule — Geo search (PostGIS), text search (Meilisearch),
 * Discover feed, Near Me list, and user bookmarks.
 */
@Module({
  controllers: [DiscoveryController],
  providers: [DiscoveryService],
  exports: [DiscoveryService],
})
export class DiscoveryModule {}

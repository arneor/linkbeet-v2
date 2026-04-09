import { Module } from '@nestjs/common'

import { ConnectionsController } from './connections.controller'
import { ConnectionsService } from './connections.service'

/**
 * ConnectionsModule — Mutual connection graph, request/accept/decline flow,
 * and CRM lead sync outbox.
 */
@Module({
  controllers: [ConnectionsController],
  providers: [ConnectionsService],
  exports: [ConnectionsService],
})
export class ConnectionsModule {}

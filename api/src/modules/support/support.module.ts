import { Module } from '@nestjs/common'

import { SupportController } from './support.controller'
import { SupportService } from './support.service'

/**
 * SupportModule — Ticketing system, FAQ retrieval, and admin communication.
 */
@Module({
  controllers: [SupportController],
  providers: [SupportService],
  exports: [SupportService],
})
export class SupportModule {}

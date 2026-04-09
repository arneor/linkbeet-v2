import { Module } from '@nestjs/common'

import { CatalogController } from './catalog.controller'
import { CatalogService } from './catalog.service'

/**
 * CatalogModule — Curation (Lists/Collections), dynamic content rendering,
 * and mapping entities for Discovery.
 */
@Module({
  controllers: [CatalogController],
  providers: [CatalogService],
  exports: [CatalogService],
})
export class CatalogModule {}

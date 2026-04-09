import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** CatalogController — /api/v1/catalog */
@ApiTags('catalog')
@Controller('catalog')
export class CatalogController {}

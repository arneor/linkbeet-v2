import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** ConnectionsController — /api/v1/connections */
@ApiTags('connections')
@Controller('connections')
export class ConnectionsController {}

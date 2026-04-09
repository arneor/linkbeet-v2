import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** MediaController — /api/v1/media */
@ApiTags('media')
@Controller('media')
export class MediaController {}

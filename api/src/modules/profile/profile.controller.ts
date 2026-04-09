import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** ProfileController — /api/v1/profiles */
@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {}

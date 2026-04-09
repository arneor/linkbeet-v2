import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** AuthController — /api/v1/auth */
@ApiTags('auth')
@Controller('auth')
export class AuthController {}

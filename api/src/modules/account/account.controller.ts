import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** AccountController — /api/v1/accounts */
@ApiTags('accounts')
@Controller('accounts')
export class AccountController {}

import { Controller } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

/** WalletController — /api/v1/wallet */
@ApiTags('wallet')
@Controller('wallet')
export class WalletController {}

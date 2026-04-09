import { Module } from '@nestjs/common'

import { AccountController } from './account.controller'
import { AccountService } from './account.service'

/**
 * AccountModule — Mode management (normal→business one-time unlock),
 * industry tag, default_landing_screen preference.
 */
@Module({
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}

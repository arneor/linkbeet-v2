import { Module } from '@nestjs/common'

import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

/**
 * ProfileModule — Bio page layout, themes, custom link ordering,
 * social media connections, external video embeds (YouTube/Instagram/TikTok),
 * QR code generation, slug management, profile share.
 */
@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}

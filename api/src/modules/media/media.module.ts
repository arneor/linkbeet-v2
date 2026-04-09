import { Module } from '@nestjs/common'

import { MediaController } from './media.controller'
import { MediaService } from './media.service'

/**
 * MediaModule — Upload handling to Cloudflare R2, image transformation
 * (blurhash, resizing), and serving authenticated/public media assets.
 */
@Module({
  controllers: [MediaController],
  providers: [MediaService],
  exports: [MediaService], // Often exported if components self-upload (e.g. Catalog module needing an image upload directly, though better to upload then link URL)
})
export class MediaModule {}

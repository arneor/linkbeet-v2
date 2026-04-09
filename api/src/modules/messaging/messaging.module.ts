import { Module } from '@nestjs/common'

import { MessagingController } from './messaging.controller'
import { MessagingService } from './messaging.service'

/**
 * MessagingModule — Direct messaging (Firebase Realtime DB integration),
 * push notifications via FCM, and email triggers via Cloudflare/SendGrid.
 */
@Module({
  controllers: [MessagingController],
  providers: [MessagingService],
  exports: [MessagingService],
})
export class MessagingModule {}

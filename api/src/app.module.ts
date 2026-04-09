/* eslint-disable import/order */
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import configs from './config'

// Core App Modules
import { AccountModule } from './modules/account/account.module'
import { AnalyticsModule } from './modules/analytics/analytics.module'
import { AuthModule } from './modules/auth/auth.module'
import { BookingModule } from './modules/booking/booking.module'
import { CatalogModule } from './modules/catalog/catalog.module'
import { CommerceModule } from './modules/commerce/commerce.module'
import { ConnectionsModule } from './modules/connections/connections.module'
import { DiscoveryModule } from './modules/discovery/discovery.module'
import { GamificationModule } from './modules/gamification/gamification.module'
import { MediaModule } from './modules/media/media.module'
import { MessagingModule } from './modules/messaging/messaging.module'
import { PaymentsModule } from './modules/payments/payments.module'
import { ProfileModule } from './modules/profile/profile.module'
import { SupportModule } from './modules/support/support.module'
import { WalletModule } from './modules/wallet/wallet.module'
import { PrismaModule } from './prisma/prisma.module'
import { RedisModule } from './redis/redis.module'

@Module({
  imports: [
    // Core Infrastructure
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    EventEmitterModule.forRoot({
      global: true,
      wildcard: true,
      delimiter: '.',
    }),
    PrismaModule,
    RedisModule,

    // Feature Modules
    AuthModule,
    AccountModule,
    ProfileModule,
    ConnectionsModule,
    DiscoveryModule,
    CommerceModule,
    BookingModule,
    PaymentsModule,
    WalletModule,
    AnalyticsModule,
    CatalogModule,
    MessagingModule,
    GamificationModule,
    MediaModule,
    SupportModule,
  ],
})
export class AppModule {}

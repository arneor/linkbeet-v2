import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerModule } from 'nestjs-pino'

import { loggerConfig } from './logger/logger.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.APP_ENV || 'development'}`,
    }),
    LoggerModule.forRoot(loggerConfig),
  ],
})
export class AppModule {}

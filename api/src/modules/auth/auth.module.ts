import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

/**
 * AuthModule — Better Auth integration, JWT, OTP, Google OAuth, Apple Sign-In,
 * anonymous guest sessions, access/refresh token lifecycle.
 */
@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const expiresIn = config.get<string>('jwt.accessExpiresIn') || '15m'
        return {
          secret: config.get<string>('jwt.secret'),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          signOptions: { expiresIn: expiresIn as any },
        }
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

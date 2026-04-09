import { registerAs } from '@nestjs/config'

export const appConfig = registerAs('app', () => ({
  env: process.env.APP_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  apiPrefix: process.env.API_PREFIX || 'api/v1',
  swaggerPassword: process.env.SWAGGER_PASSWORD || 'linkbeet-staging',
}))

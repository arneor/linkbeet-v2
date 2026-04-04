import './instrument'
import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as basicAuth from 'express-basic-auth'
import { Logger as PinoLogger } from 'nestjs-pino'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const appEnv = process.env.APP_ENV || 'development'
  const port = process.env.PORT || 3001

  app.useLogger(app.get(PinoLogger))
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.enableCors()
  app.setGlobalPrefix('api/v1')

  // Swagger: enabled in development and staging, disabled in production
  if (appEnv !== 'production') {
    // Password protect in staging
    if (appEnv === 'staging') {
      app.use(
        '/api/docs',
        basicAuth({
          users: { admin: process.env.SWAGGER_PASSWORD || 'linkbeet-staging' },
          challenge: true,
        }),
      )
    }

    const config = new DocumentBuilder()
      .setTitle('Auth Service')
      .setDescription('Linkbeet Auth Service microservice API')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('auth')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    })
  }

  await app.listen(port)
  if (appEnv !== 'production') {
    const logger = new Logger('Bootstrap')
    logger.log(`🚀 Auth Service running on http://localhost:${port} | ENV: ${appEnv}`)
    logger.log(`Swagger docs: http://localhost:${port}/api/docs`)
  }
}

bootstrap()

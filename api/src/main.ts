import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory, Reflector } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception.filter'
import { JwtAuthGuard } from './common/guards/jwt-auth.guard'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ trustProxy: true }),
    { bufferLogs: true },
  )

  const configService = app.get(ConfigService)
  const port = configService.get<number>('app.port', 3000)
  const env = configService.get<string>('app.env', 'development')

  // Global prefixes and versioning
  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })

  // CORS
  app.enableCors({
    origin: '*', // TODO: configure properly via configService.get('app.frontendUrl')
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  })

  // Global Pipes, Filters, Interceptors, Guards
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new LoggingInterceptor())

  // Note: For Better Auth to work well alongside custom JwtAuthGuard,
  // you might need to exclude the BetterAuth endpoints from the global guard
  // or apply the guard per-controller instead of globally. For now, globally applied:
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new JwtAuthGuard(reflector))

  // Swagger setup (only in dev/staging)
  if (env !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('LinkBeet v2 API (Monolith)')
      .setDescription('The consolidated LinkBeet v2 API documentation')
      .setVersion('2.0.0')
      .addBearerAuth()
      .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)
  }

  // Graceful shutdown hooks
  app.enableShutdownHooks()

  await app.listen(port, '0.0.0.0')
  Logger.log(`🚀 LinkBeet API running on: http://localhost:${port}/api/v1`, 'Bootstrap')
  if (env !== 'production') {
    Logger.log(`📚 Swagger documentation at: http://localhost:${port}/docs`, 'Bootstrap')
  }
}
bootstrap()

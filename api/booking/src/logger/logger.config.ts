import { Params } from 'nestjs-pino'

const appEnv = process.env.APP_ENV || 'development'

export const loggerConfig: Params = {
  pinoHttp: {
    level: appEnv === 'production' ? 'warn' : appEnv === 'staging' ? 'info' : 'debug',

    // Pretty print in development only
    transport:
      appEnv === 'development'
        ? {
            target: 'pino-pretty',
            options: {
              colorize: true,
              singleLine: false,
              translateTime: 'SYS:standard',
            },
          }
        : undefined,

    // JSON format in staging/production for Loki
    formatters:
      appEnv !== 'development'
        ? {
            level: (label: string) => ({ level: label }),
            bindings: () => ({
              service: process.env.npm_package_name,
              env: appEnv,
            }),
          }
        : undefined,

    // Redact sensitive fields from logs
    redact: {
      paths: [
        'req.headers.authorization',
        'req.body.password',
        'req.body.token',
        'req.body.creditCard',
      ],
      remove: true,
    },

    // Add request id to every log
    genReqId: (req: any) => req.headers['x-request-id'] || crypto.randomUUID(),
  },
}

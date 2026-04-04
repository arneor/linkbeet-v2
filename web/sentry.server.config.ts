import * as Sentry from '@sentry/nextjs'

const appEnv = process.env.APP_ENV

if (appEnv !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: appEnv,
    tracesSampleRate: appEnv === 'production' ? 0.2 : 1.0,
    debug: false,
    enabled: true,
  })
}

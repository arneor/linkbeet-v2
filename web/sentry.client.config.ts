import * as Sentry from '@sentry/nextjs'

const appEnv = process.env.NEXT_PUBLIC_APP_ENV

// Disabled in development
if (appEnv !== 'development') {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: appEnv,
    // Lower sample rate in staging vs production
    tracesSampleRate: appEnv === 'production' ? 0.2 : 1.0,
    debug: false,
    enabled: true,
  })
}

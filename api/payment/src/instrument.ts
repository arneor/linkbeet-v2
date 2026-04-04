import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

const appEnv = process.env.APP_ENV || 'development'

// Disabled in development
if (appEnv !== 'development') {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: appEnv,
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: appEnv === 'production' ? 0.2 : 1.0,
    profilesSampleRate: appEnv === 'production' ? 0.1 : 1.0,
  })
}

export { Sentry }

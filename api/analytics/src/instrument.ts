const appEnv = process.env.APP_ENV || 'development'

// Sentry will be configured here in future
export const instrumentationEnabled = appEnv !== 'development'

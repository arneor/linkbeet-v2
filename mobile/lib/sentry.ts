import * as Sentry from '@sentry/react-native'
import Constants from 'expo-constants'

const appEnv = Constants.expoConfig?.extra?.APP_ENV

export const initSentry = () => {
  if (appEnv === 'development') return

  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    environment: appEnv,
    tracesSampleRate: appEnv === 'production' ? 0.2 : 1.0,
    debug: false,
    enabled: true,
  })
}

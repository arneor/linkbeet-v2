export { appConfig } from './app.config'
export { databaseConfig } from './database.config'
export { redisConfig } from './redis.config'
export { jwtConfig } from './jwt.config'
export { meilisearchConfig } from './meilisearch.config'
export { razorpayConfig } from './razorpay.config'
export { storageConfig } from './storage.config'
export { firebaseConfig } from './firebase.config'
export * from './better-auth.config'
export * from './imgproxy.config'

import { appConfig } from './app.config'
import { databaseConfig } from './database.config'
import { firebaseConfig } from './firebase.config'
import { jwtConfig } from './jwt.config'
import { meilisearchConfig } from './meilisearch.config'
import { razorpayConfig } from './razorpay.config'
import { redisConfig } from './redis.config'
import { storageConfig } from './storage.config'

export default [
  appConfig,
  databaseConfig,
  redisConfig,
  jwtConfig,
  meilisearchConfig,
  razorpayConfig,
  storageConfig,
  firebaseConfig,
]

import { betterAuth } from 'better-auth'
import { toNextJsHandler } from 'better-auth/next-js'
import { headers } from 'next/headers'

export const authInstance = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || 'dummy-secret-for-build-purposes-only',
  // This will be configured with a proper database adapter during implementation
  database: {
    db: {} as unknown as Record<string, unknown>,
    type: 'postgres',
  },
})

export const handlers = toNextJsHandler(authInstance)

export const auth = async () => {
  return await authInstance.api.getSession({
    headers: await headers(),
  })
}

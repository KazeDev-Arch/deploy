import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { tanstackStartCookies } from 'better-auth/tanstack-start'
import { env } from '../env.js'
import { prisma } from '../db.js'

export const auth = betterAuth({
  baseURL: env.SERVER_URL ?? 'http://localhost:3000',
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: (env.GOOGLE_CLIENT_ID ?? ''),
      clientSecret: (env.GOOGLE_CLIENT_SECRET ?? ''),
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 // 1 day (every 1 day the session expiration is updated)
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'CLIENT',
      },
    },
  },
  plugins: [tanstackStartCookies()],
})

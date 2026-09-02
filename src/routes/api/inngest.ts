import { serve } from 'inngest/edge'
import { inngest } from '#/inngest/client.ts'
import { createFileRoute } from '@tanstack/react-router'
import { helloWorld } from '#/inngest/functions.ts'
import { sendOtpEmail } from '#/inngest/functions/otp-email.ts'

const handler = serve({
  client: inngest,
  functions: [
    helloWorld,
    sendOtpEmail,
  ],
})

export const Route = createFileRoute('/api/inngest')({
  server: {
    handlers: {
      GET: async ({ request }) => handler(request),
      POST: async ({ request }) => handler(request),
      PUT: async ({ request }) => handler(request),
    },
  },
})

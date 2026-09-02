import { Resend } from 'resend'

import { inngest } from '../client.ts'
import { otpVerificationEmail } from '../emails/otp-verification.ts'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Deploy <noreply@deploy.app>'

export const sendOtpEmail = inngest.createFunction(
  {
    id: 'send-otp-email',
    triggers: [{ event: 'auth/otp.send' }],
  },
  async ({ event }) => {
    const { email, name, code, expiresInMinutes } = event.data

    if (!process.env.RESEND_API_KEY) {
      console.warn('[otp-email] RESEND_API_KEY not set — skipping email send')
      return { email, sent: false, reason: 'no_api_key' }
    }

    const html = otpVerificationEmail({ name, code, expiresInMinutes })

    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Votre code de vérification Deploy',
      html,
    })

    return { email, sent: true }
  },
)

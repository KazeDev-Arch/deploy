import { Resend } from 'resend'

import { inngest } from '../client.ts'
import { otpVerificationEmail } from '../emails/otp-verification.ts'

/** Lazy Resend client — creates on first use, avoids crash at import when RESEND_API_KEY is missing. */
let resend: Resend | null = null
function getResend(): Resend {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Deploy <onboarding@resend.dev>'

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

    await getResend().emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Votre code de vérification Deploy',
      html,
    })

    return { email, sent: true }
  },
)

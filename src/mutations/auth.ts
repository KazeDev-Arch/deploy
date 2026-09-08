import { createServerFn } from '@tanstack/react-start'
import { hashPassword } from 'better-auth/crypto'

import { prisma } from '#/db.ts'
import { inngest } from '#/inngest/client.ts'
import {
  signupSchema,
  verifyOtpSchema,
  resendOtpSchema,
} from '#/schemas/auth.ts'

// ───────────────────────────────
// Helpers
// ───────────────────────────────

function generateId(): string {
  const timestamp = Date.now().toString(36)
  const random = Math.random().toString(36).substring(2, 10)
  return `${timestamp}${random}`
}

const OTP_EXPIRY_MINUTES = 10
const OTP_LENGTH = 6

function generateOtp(): string {
  const digits = '0123456789'
  let code = ''
  for (let i = 0; i < OTP_LENGTH; i++) {
    code += digits[Math.floor(Math.random() * 10)]
  }
  return code
}

function otpIdentifier(email: string): string {
  return `otp:${email}`
}

// ───────────────────────────────
// Signup
// ───────────────────────────────

export const signup = createServerFn({ method: 'POST' })
  .validator(signupSchema)
  .handler(async ({ data }) => {
    const { name, email, password } = data

    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      throw new Error('Un compte existe déjà avec cette adresse email')
    }

    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: { name, email, emailVerified: false },
    })

    await prisma.account.create({
      data: {
        id: generateId(),
        userId: user.id,
        accountId: user.email,
        providerId: 'credential',
        password: hashedPassword,
        issuer: 'credential',
      },
    })

    const code = generateOtp()
    const identifier = otpIdentifier(email)
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)

    await prisma.verification.deleteMany({ where: { identifier } })
    await prisma.verification.create({
      data: { id: generateId(), identifier, value: code, expiresAt },
    })

    await inngest.send({
      name: 'auth/otp.send',
      data: { email, name, code, expiresInMinutes: OTP_EXPIRY_MINUTES },
    })

    return { email }
  })

// ───────────────────────────────
// Verify OTP
// ───────────────────────────────

export const verifyOtp = createServerFn({ method: 'POST' })
  .validator(verifyOtpSchema)
  .handler(async ({ data }) => {
    const { email, code } = data
    const identifier = otpIdentifier(email)

    const verification = await prisma.verification.findFirst({
      where: { identifier, value: code },
    })

    if (!verification) {
      throw new Error('Code de vérification invalide')
    }

    if (new Date() > verification.expiresAt) {
      await prisma.verification.delete({ where: { id: verification.id } })
      throw new Error('Le code a expiré. Demandez un nouveau code.')
    }

    await prisma.user.update({
      where: { email },
      data: { emailVerified: true },
    })

    await prisma.verification.delete({ where: { id: verification.id } })

    return { success: true }
  })

// ───────────────────────────────
// Resend OTP
// ───────────────────────────────

export const resendOtp = createServerFn({ method: 'POST' })
  .validator(resendOtpSchema)
  .handler(async ({ data }) => {
    const { email } = data

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new Error('Aucun compte trouvé avec cette adresse email')
    }

    if (user.emailVerified) {
      throw new Error('Ce compte est déjà vérifié')
    }

    const identifier = otpIdentifier(email)
    await prisma.verification.deleteMany({ where: { identifier } })

    const code = generateOtp()
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)

    await prisma.verification.create({
      data: { id: generateId(), identifier, value: code, expiresAt },
    })

    await inngest.send({
      name: 'auth/otp.send',
      data: {
        email,
        name: user.name ?? 'Utilisateur',
        code,
        expiresInMinutes: OTP_EXPIRY_MINUTES,
      },
    })

    return { success: true }
  })

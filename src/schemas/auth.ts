import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

export type LoginInput = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
})

export type SignupInput = z.infer<typeof signupSchema>

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, 'Le code doit contenir 6 chiffres'),
})

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>

export const resendOtpSchema = z.object({
  email: z.string().email('Adresse email invalide'),
})

export type ResendOtpInput = z.infer<typeof resendOtpSchema>

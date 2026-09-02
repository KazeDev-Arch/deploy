import { useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { toast } from 'sonner'

import { authClient } from '#/lib/auth-client.ts'
import {
  signup as signupFn,
  verifyOtp as verifyOtpFn,
  resendOtp as resendOtpFn,
} from '#/mutations/auth.ts'

// ───────────────────────────────
// Signup
// ───────────────────────────────

export function useSignupMutation() {
  const navigate = useNavigate()
  const signupServerFn = useServerFn(signupFn)

  return useMutation({
    mutationFn: signupServerFn,
    onSuccess: (_data, variables) => {
      toast.success('Compte créé ! Vérifiez votre email.')
      void navigate({
        to: '/auth/verify-otp',
        search: { email: variables.data.email },
      })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Une erreur est survenue lors de l\'inscription.')
    },
  })
}

// ───────────────────────────────
// Login (Better Auth client)
// ───────────────────────────────

export function useLoginMutation() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const result = await authClient.signIn.email(credentials)
      if (result.error) {
        throw new Error(result.error.message || 'Email ou mot de passe incorrect')
      }
      return result
    },
    onSuccess: () => {
      toast.success('Connexion réussie !')
      void navigate({ to: '/' })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Une erreur est survenue lors de la connexion.')
    },
  })
}

// ───────────────────────────────
// Google sign-in
// ───────────────────────────────

export function useGoogleSignInMutation() {
  return useMutation({
    mutationFn: async () => {
      await authClient.signIn.social({ provider: 'google' })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Une erreur est survenue avec Google.')
    },
  })
}

// ───────────────────────────────
// Verify OTP
// ───────────────────────────────

export function useVerifyOtpMutation() {
  const navigate = useNavigate()
  const verifyOtpServerFn = useServerFn(verifyOtpFn)

  return useMutation({
    mutationFn: verifyOtpServerFn,
    onSuccess: () => {
      toast.success('Compte vérifié ! Redirection…')
      setTimeout(() => {
        void navigate({ to: '/auth/login' })
      }, 2000)
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Code invalide.')
    },
  })
}

// ───────────────────────────────
// Resend OTP
// ───────────────────────────────

export function useResendOtpMutation() {
  const resendOtpServerFn = useServerFn(resendOtpFn)

  return useMutation({
    mutationFn: resendOtpServerFn,
    onSuccess: () => {
      toast.success('Nouveau code envoyé !')
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de l\'envoi du code.')
    },
  })
}

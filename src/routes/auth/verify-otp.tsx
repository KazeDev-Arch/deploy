import { useState } from 'react'
import {
  createFileRoute,
  Link,
  useSearch,
} from '@tanstack/react-router'
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react'

import { AuthShell } from '#/components/auth/auth-shell.tsx'
import { OtpCountdown } from '#/components/auth/otp-countdown.tsx'
import { Button } from '#/components/ui/button.tsx'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '#/components/ui/input-otp.tsx'
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from '#/hooks/auth.hooks.ts'

export const Route = createFileRoute('/auth/verify-otp')({
  component: VerifyOtp,
  validateSearch: (search: Record<string, unknown>) => ({
    email: (search.email as string) ?? '',
  }),
})

function VerifyOtp() {
  const { email } = useSearch({ from: '/auth/verify-otp' })
  const [code, setCode] = useState('')

  const verifyMutation = useVerifyOtpMutation()
  const resendMutation = useResendOtpMutation()

  function handleVerify() {
    if (code.length !== 6) return
    verifyMutation.mutate({ data: { email, code } })
  }

  function handleResend() {
    setCode('')
    resendMutation.mutate({ data: { email } })
  }

  if (verifyMutation.isSuccess) {
    return (
      <AuthShell
        title="Compte vérifié !"
        description="Votre compte a été activé avec succès."
      >
        <div className="flex flex-col items-center gap-4">
          <CheckCircle className="size-12 text-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            Redirection vers la page de connexion…
          </p>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      title="Vérifiez votre email"
      description={`Un code de vérification a été envoyé à ${email}. Entrez-le ci-dessous pour activer votre compte.`}
      footer={
        <Link
          to="/auth/signup"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-4" />
          Retour à l'inscription
        </Link>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-muted p-3">
            <Mail className="size-6 text-muted-foreground" />
          </div>
        </div>

        <div className="flex justify-center">
          <InputOTP maxLength={6} value={code} onChange={setCode}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={handleVerify}
          className="w-full"
          disabled={verifyMutation.isPending || code.length !== 6}
        >
          {verifyMutation.isPending ? 'Vérification…' : 'Vérifier le code'}
        </Button>

        <OtpCountdown
          expiresInMinutes={10}
          onResend={handleResend}
          isResending={resendMutation.isPending}
        />
      </div>
    </AuthShell>
  )
}

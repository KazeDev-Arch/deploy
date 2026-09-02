import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Mail } from 'lucide-react'

import {
  AuthField,
  AuthFieldGroup,
  AuthShell,
} from '#/components/auth/auth-shell.tsx'
import { Button } from '#/components/ui/button.tsx'

export const Route = createFileRoute('/auth/forgot-password')({
  component: ForgotPassword,
})

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [isSent, setIsSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    // TODO: Replace with real forgot-password mutation
    setTimeout(() => {
      setIsSent(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <AuthShell
      title="Mot de passe oublié"
      description="Entrez votre email et nous vous enverrons un lien de réinitialisation."
      footer={
        <p className="text-sm text-muted-foreground">
          Vous vous souvenez ?{' '}
          <Link
            to="/auth/login"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Se connecter
          </Link>
        </p>
      }
    >
      {isSent ? (
        <div className="flex flex-col items-center gap-4">
          <Mail className="size-12 text-muted-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            Si un compte existe avec l'adresse <strong>{email}</strong>, vous
            recevrez un email de réinitialisation.
          </p>
        </div>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <AuthFieldGroup>
            <AuthField
              id="email"
              label="Email"
              type="email"
              placeholder="vous@email.com"
              autoComplete="email"
              required
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </AuthFieldGroup>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Envoi…' : 'Envoyer le lien'}
          </Button>
        </form>
      )}
    </AuthShell>
  )
}

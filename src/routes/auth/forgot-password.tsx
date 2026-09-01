import { createFileRoute, Link } from '@tanstack/react-router'
import { Mail } from 'lucide-react'

import { AuthField, AuthShell } from '../../components/auth/auth-shell.tsx'
import { Button } from '../../components/ui/button.tsx'

export const Route = createFileRoute('/auth/forgot-password')({
  component: ForgotPassword,
})

function ForgotPassword() {
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
      <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
        <AuthField
          id="email"
          label="Email"
          type="email"
          placeholder="vous@email.com"
          autoComplete="email"
          required
          icon={Mail}
        />
        <Button type="submit" className="w-full">
          Envoyer le lien
        </Button>
      </form>
    </AuthShell>
  )
}

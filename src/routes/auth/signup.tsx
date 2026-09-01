import { createFileRoute, Link } from '@tanstack/react-router'
import { Lock, Mail } from 'lucide-react'

import { AuthField, AuthShell } from '../../components/auth/auth-shell.tsx'
import { Button } from '../../components/ui/button.tsx'

export const Route = createFileRoute('/auth/signup')({ component: Signup })

function Signup() {
  return (
    <AuthShell
      title="Créer un compte"
      description="Rejoignez Deploy et accédez à tous les articles."
      footer={
        <p className="text-sm text-muted-foreground">
          Déjà un compte ?{' '}
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
        <AuthField
          id="password"
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
          icon={Lock}
        />
        <Button type="submit" className="w-full">
          Créer un compte
        </Button>
      </form>
    </AuthShell>
  )
}

import { createFileRoute, Link } from '@tanstack/react-router'
import { Lock, Mail } from 'lucide-react'

import { AuthField, AuthShell } from '../components/auth/auth-shell'
import { Button } from '../components/ui/button'

export const Route = createFileRoute('/login')({ component: Login })

function Login() {
  return (
    <AuthShell
      title="Se connecter"
      description="Bon retour parmi nous. Renseignez vos identifiants."
      footer={
        <p className="text-sm text-muted-foreground">
          Pas encore de compte ?{' '}
          <Link
            to="/signup"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Créer un compte
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
          autoComplete="current-password"
          required
          icon={Lock}
          labelAction={
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          }
        />
        <Button type="submit" className="w-full">
          Se connecter
        </Button>
      </form>
    </AuthShell>
  )
}

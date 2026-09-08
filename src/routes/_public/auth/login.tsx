import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Lock, Mail } from 'lucide-react'

import {
  AuthDivider,
  AuthField,
  AuthFieldGroup,
  AuthShell,
} from '#/components/auth/auth-shell.tsx'
import { GoogleButton } from '#/components/auth/google-button.tsx'
import { Button } from '#/components/ui/button.tsx'
import {
  useLoginMutation,
  useGoogleSignInMutation,
} from '#/hooks/auth.hooks.ts'

export const Route = createFileRoute('/_public/auth/login')({
  component: Login,
})

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginMutation = useLoginMutation()
  const googleMutation = useGoogleSignInMutation()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    loginMutation.mutate({ email, password })
  }

  return (
    <AuthShell
      title="Se connecter"
      description="Bon retour parmi nous. Renseignez vos identifiants."
      footer={
        <p className="text-sm text-muted-foreground">
          Pas encore de compte ?{' '}
          <Link
            to="/auth/signup"
            className="font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Créer un compte
          </Link>
        </p>
      }
    >
      <AuthFieldGroup>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
          <AuthField
            id="password"
            label="Mot de passe"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            required
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            labelAction={
              <Link
                to="/auth/forgot-password"
                className="text-xs font-medium text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            }
          />
          <Button
            type="submit"
            className="w-full"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Connexion…' : 'Se connecter'}
          </Button>
        </form>

        <AuthDivider />

        <GoogleButton
          onClick={() => googleMutation.mutate()}
          disabled={googleMutation.isPending}
        />
      </AuthFieldGroup>
    </AuthShell>
  )
}

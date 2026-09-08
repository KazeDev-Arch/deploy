import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Lock, Mail, User } from 'lucide-react'

import {
  AuthDivider,
  AuthField,
  AuthFieldGroup,
  AuthShell,
} from '#/components/auth/auth-shell.tsx'
import { GoogleButton } from '#/components/auth/google-button.tsx'
import { Button } from '#/components/ui/button.tsx'
import {
  useSignupMutation,
  useGoogleSignInMutation,
} from '#/hooks/auth.hooks.ts'

export const Route = createFileRoute('/_public/auth/signup')({
  component: Signup,
})

function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signupMutation = useSignupMutation()
  const googleMutation = useGoogleSignInMutation()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    signupMutation.mutate({ data: { name, email, password } })
  }

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
      <AuthFieldGroup>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <AuthField
            id="name"
            label="Nom"
            type="text"
            placeholder="Votre nom"
            autoComplete="name"
            required
            icon={User}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            autoComplete="new-password"
            required
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? 'Création…' : 'Créer un compte'}
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

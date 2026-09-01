import type { ReactNode } from 'react'
import { Navigate } from '@tanstack/react-router'
import { authClient } from '#/lib/auth-client'

interface AdminProtectionProps {
  children: ReactNode
}

/**
 * Wrapper qui protège le contenu admin.
 * Redirige vers la login si non authentifié.
 * Redirige vers l'accueil si rôle != ADMIN.
 */
export function AdminProtection({ children }: AdminProtectionProps) {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="size-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      </div>
    )
  }

  if (!session?.user) {
    return <Navigate to="/auth/login" />
  }

  if ((session.user as any).role !== 'ADMIN') {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

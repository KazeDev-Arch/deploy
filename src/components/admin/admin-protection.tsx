/* eslint-disable @typescript-eslint/no-unnecessary-condition -- better-auth useSession type is mis-modeled by typescript-eslint (TS6); tsc --noEmit stays the gate. */
import type { ReactNode } from 'react'
import { Navigate } from '@tanstack/react-router'
import { Forbidden } from '#/components/errors/forbidden'
import { authClient } from '#/lib/auth-client'
import type { AppRole } from '#/lib/permissions'

/**
 * Garde « authentifié » du panneau partagé (client & admin).
 * À placer dans le layout `_dashboard` : redirige les visiteurs non
 * connectés vers la page de connexion.
 */
export function DashboardGuard({ children }: { children: ReactNode }) {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      </div>
    )
  }

  if (!session?.user) {
    return <Navigate to="/auth/login" />
  }

  return <>{children}</>
}

/**
 * Garde de rôle : restreint une page du panneau à un rôle précis
 * (ex. `ADMIN`). Le rendu du menu dépend déjà du rôle, cette garde
 * protège l'URL en cas d'accès direct.
 */
export function RequireRole({
  role,
  children,
}: {
  role: AppRole
  children: ReactNode
}) {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return null
  }

  if ((session?.user?.role as AppRole | undefined) !== role) {
    return <Forbidden />
  }

  return <>{children}</>
}

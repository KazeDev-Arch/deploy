import { getRequest } from '@tanstack/react-start/server'

import { auth } from '#/lib/auth'
import { canAccess } from '#/lib/permissions'
import type { Action, AppRole, Resource } from '#/lib/permissions'

/**
 * Résout la session Better Auth depuis les headers de la requête courante.
 * Server-only : à importer uniquement depuis les handlers de server functions.
 */
async function requireSession() {
  return auth.api.getSession({
    headers: getRequest().headers,
  })
}

/**
 * Vérifie qu'un utilisateur connecté peut effectuer `action` sur `resource`.
 * Lève une erreur en cas d'absence de session ou de permission insuffisante.
 * Retourne l'utilisateur (pour récupérer `id` = `authorId`, etc.).
 */
export async function authorize(resource: Resource, action: Action) {
  const authSession = await requireSession()
  const user = authSession?.user
  const role = user?.role as AppRole | undefined

  if (!user || !role) {
    throw new Error('Authentification requise')
  }

  if (!canAccess(role, resource, action)) {
    throw new Error('Accès non autorisé')
  }

  return user
}

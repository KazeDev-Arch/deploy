import { createAccessControl } from 'better-auth/plugins/access'

/**
 * Catalogue unique des ressources et actions de la plateforme.
 * Toute nouvelle capacité (écran, server function) doit passer par ici :
 * - les rôles better-auth (ci-dessous) pour l'enforcement serveur ;
 * - `canAccess` (pur) pour filtrer l'UI (menus, boutons, routes).
 */
const statement = {
  article: ['create', 'read', 'update', 'delete'],
  user: ['read', 'update', 'ban'],
  comment: ['read', 'moderate', 'delete'],
  subscription: ['read'],
  payment: ['read'],
  settings: ['read', 'update'],
} as const

export type Resource = keyof typeof statement
export type Action = (typeof statement)[Resource][number]

/**
 * Rôle stocké sur `User.role` (enum Prisma `Role` : ADMIN | CLIENT).
 * `ADMIN` = auteur/éditeur/gestionnaire du site ; `CLIENT` = lecteur.
 */
export type AppRole = 'ADMIN' | 'CLIENT'

export const DEFAULT_ROLE: AppRole = 'CLIENT'

export const ac = createAccessControl(statement)

export const adminRole = ac.newRole({
  article: ['create', 'read', 'update', 'delete'],
  user: ['read', 'update', 'ban'],
  comment: ['read', 'moderate', 'delete'],
  subscription: ['read'],
  payment: ['read'],
  settings: ['read', 'update'],
})

export const clientRole = ac.newRole({
  article: ['read'],
})

/** Mappage AppRole → rôle better-auth (pour `.authorize()` côté serveur). */
export const ROLE_TO_ACCESS_ROLE = {
  ADMIN: adminRole,
  CLIENT: clientRole,
} as const

// ─────────────────────────────────────────────
// Helper pur (client & serveur)
// ─────────────────────────────────────────────

const ROLE_PERMISSIONS: Record<
  AppRole,
  Partial<Record<Resource, readonly Action[]>>
> = {
  ADMIN: adminRole.statements,
  CLIENT: clientRole.statements,
}

/**
 * Vérifie si un rôle peut effectuer une action sur une ressource.
 * Pur (aucune dépendance runtime better-auth) : utilisable pour filtrer
 * les menus côté client ET pour garder les routes côté serveur.
 *
 * @example canAccess('ADMIN', 'article', 'create') // true
 * @example canAccess('CLIENT', 'payment', 'read')  // false
 */
export function canAccess(
  role: AppRole | null | undefined,
  resource: Resource,
  action: Action,
): boolean {
  if (!role) return false
  const allowedActions = ROLE_PERMISSIONS[role][resource]
  return allowedActions ? allowedActions.includes(action) : false
}

/**
 * Utilitaires pour le contrôle d'accès admin.
 * À utiliser dans les composants avec `authClient.useSession()`.
 */

export function checkAdminAccess(userRole?: string | null): boolean {
  return userRole === 'ADMIN'
}


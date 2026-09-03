import { createFileRoute, Outlet } from '@tanstack/react-router'

import { AdminLayout, DashboardGuard } from '#/components/admin'

export const Route = createFileRoute('/_dashboard')({
  component: DashboardLayout,
})

/**
 * Layout du panneau partagé (client & admin), hors Header/Footer public.
 * Authentification obligatoire ; le contenu lui-même est filtré par rôle
 * (menus) et les pages sensibles portent leur propre garde (`RequireRole`).
 */
function DashboardLayout() {
  return (
    <DashboardGuard>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </DashboardGuard>
  )
}

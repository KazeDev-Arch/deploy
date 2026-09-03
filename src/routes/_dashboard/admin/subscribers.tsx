import { createFileRoute } from '@tanstack/react-router'
import { Users } from 'lucide-react'

import { PageHeader, RequireRole } from '#/components/admin'
import { Card } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/admin/subscribers')({
  component: AdminSubscribers,
})

function AdminSubscribers() {
  return (
    <RequireRole role="ADMIN">
      <PageHeader
        title="Abonnés"
        description="Comptes lecteurs, statut d'abonnement et gestion des accès."
      />

      <Card className="flex flex-col items-center gap-4 p-12 text-center">
        <div className="grid size-10 place-items-center rounded-md bg-muted">
          <Users className="size-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Annuaire à venir</p>
          <p className="text-sm text-muted-foreground">
            Recherche par lecteur (profil, abonnement actif/expiré),
            bannissement et gestion des accès premium.
          </p>
        </div>
      </Card>
    </RequireRole>
  )
}

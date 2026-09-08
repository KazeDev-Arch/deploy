import { createFileRoute } from '@tanstack/react-router'
import { CreditCard } from 'lucide-react'

import { PageHeader, RequireRole } from '#/components/admin'
import { Card } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/admin/payments')({
  component: AdminPayments,
})

function AdminPayments() {
  return (
    <RequireRole role="ADMIN">
      <PageHeader
        title="Paiements"
        description="Transactions K-Pay : historique, statuts et remboursements."
      />

      <Card className="flex flex-col items-center gap-4 p-12 text-center">
        <div className="grid size-10 place-items-center rounded-md bg-muted">
          <CreditCard className="size-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Historique à venir</p>
          <p className="text-sm text-muted-foreground">
            Suivi des paiements (en attente, réussis, échoués, remboursés) via
            l'intégration K-Pay, devise XAF.
          </p>
        </div>
      </Card>
    </RequireRole>
  )
}

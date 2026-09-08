import { createFileRoute } from '@tanstack/react-router'
import { MessageSquare } from 'lucide-react'

import { PageHeader, RequireRole } from '#/components/admin'
import { Card } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/admin/comments')({
  component: AdminComments,
})

function AdminComments() {
  return (
    <RequireRole role="ADMIN">
      <PageHeader
        title="Commentaires"
        description="Modération des commentaires des lecteurs sur les articles."
      />

      <Card className="flex flex-col items-center gap-4 p-12 text-center">
        <div className="grid size-10 place-items-center rounded-md bg-muted">
          <MessageSquare className="size-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Modération à venir</p>
          <p className="text-sm text-muted-foreground">
            Validation, masquage et suppression des commentaires, avec accès
            rapide à l'article concerné.
          </p>
        </div>
      </Card>
    </RequireRole>
  )
}

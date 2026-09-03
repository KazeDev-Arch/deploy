import { createFileRoute } from '@tanstack/react-router'
import { FileText, Plus } from 'lucide-react'

import { PageHeader, RequireRole } from '#/components/admin'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'

export const Route = createFileRoute('/_dashboard/admin/articles')({
  component: AdminArticles,
})

function AdminArticles() {
  return (
    <RequireRole role="ADMIN">
      <PageHeader
        title="Articles"
        description="Rédigez, mettez à jour et publiez les articles de la rédaction (brouillon → publié)."
      >
        <Button size="sm" data-icon="inline-start">
          <Plus />
          Nouvel article
        </Button>
      </PageHeader>

      <Card className="flex flex-col items-center gap-4 p-12 text-center">
        <div className="grid size-10 place-items-center rounded-md bg-muted">
          <FileText className="size-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-medium">Aucun article pour le moment</p>
          <p className="text-sm text-muted-foreground">
            Les articles que vous créez apparaîtront ici, avec leur statut
            (brouillon / publié) et leur accès (gratuit / premium).
          </p>
        </div>
      </Card>

      {/* TODO: table de gestion — TanStack Table + mutations article. */}
      <p className="text-xs text-muted-foreground">
        La liste complète (recherche, filtres, pagination) arrivera avec le CRUD
        des articles.
      </p>
    </RequireRole>
  )
}

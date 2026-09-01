import { createFileRoute } from '@tanstack/react-router'
import { Card } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { AdminLayout, AdminProtection } from '#/components/admin'
import { Plus } from 'lucide-react'

export const Route = createFileRoute('/admin/articles')({
  component: AdminArticles,
})

function AdminArticles() {
  return (
    <AdminProtection>
      <AdminLayout title="Gestion des Articles">
        <div className="space-y-6">
          {/* Header with action button */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Articles</h1>
            <Button
              size="sm"
              data-icon="inline-start"
            >
              <Plus className="size-4" />
              Nouvel article
            </Button>
          </div>

          {/* Articles list placeholder */}
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Aucun article trouvé.
            </p>
            <p className="text-sm text-muted-foreground">
              Les articles que vous créez apparaîtront ici.
            </p>
          </Card>

          {/* TODO: Table with articles list */}
          <div className="text-xs text-muted-foreground border-t border-border pt-4">
            <p>Table de gestion des articles à venir — utiliser TanStack Table v9</p>
          </div>
        </div>
      </AdminLayout>
    </AdminProtection>
  )
}


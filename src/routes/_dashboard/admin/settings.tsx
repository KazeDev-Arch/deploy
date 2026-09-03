import { createFileRoute } from '@tanstack/react-router'

import { PageHeader, RequireRole } from '#/components/admin'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { Textarea } from '#/components/ui/textarea'

export const Route = createFileRoute('/_dashboard/admin/settings')({
  component: AdminSettings,
})

function AdminSettings() {
  return (
    <RequireRole role="ADMIN">
      <PageHeader
        title="Réglages"
        description="Configuration générale du site (identité, réseaux, paiement)."
      />

      <div className="max-w-2xl">
        <Card className="p-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold">Informations générales</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <Label htmlFor="site-name">Nom du site</Label>
                <Input id="site-name" defaultValue="Deploy" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="site-email">Email de contact</Label>
                <Input
                  id="site-email"
                  type="email"
                  placeholder="hello@deploy.blog"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="site-description">Description</Label>
              <Textarea
                id="site-description"
                rows={3}
                defaultValue="Tech, design & ingénierie. Des articles indépendants, sans publicité, financés par leurs lecteurs."
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold">Sécurité</h2>
            <p className="text-sm text-muted-foreground">
              Gérez ici les accès (rôles et permissions de{' '}
              <code className="text-xs">src/lib/permissions.ts</code>) et les
              paramètres sensibles.
            </p>
          </div>
        </Card>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline">Annuler</Button>
          <Button>Enregistrer</Button>
        </div>
      </div>
    </RequireRole>
  )
}

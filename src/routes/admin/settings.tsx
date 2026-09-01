import { createFileRoute } from '@tanstack/react-router'
import { Card } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { AdminLayout, AdminProtection } from '#/components/admin'

export const Route = createFileRoute('/admin/settings')({
  component: AdminSettings,
})

function AdminSettings() {
  return (
    <AdminProtection>
      <AdminLayout title="Paramètres">
        <div className="space-y-6 max-w-2xl">
          {/* General settings section */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Paramètres généraux</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">
                  Nom du site
                </label>
                <input
                  type="text"
                  placeholder="Deploy"
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Plateforme de blog..."
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  rows={3}
                />
              </div>
            </div>
          </Card>

          {/* Security section */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">Sécurité</h2>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Gérez les paramètres de sécurité et les permissions ici.
              </p>
            </div>
          </Card>

          {/* Save button */}
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline">Annuler</Button>
            <Button>Enregistrer</Button>
          </div>
        </div>
      </AdminLayout>
    </AdminProtection>
  )
}


import { createFileRoute } from '@tanstack/react-router'
import { Card } from '#/components/ui/card'
import { AdminLayout, AdminProtection } from '#/components/admin'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  return (
    <AdminProtection>
      <AdminLayout title="Dashboard">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Stats cards */}
          {[
            { label: 'Articles totaux', value: '12' },
            { label: 'Abonnés actifs', value: '234' },
            { label: 'Revenus (XAF)', value: '1,250,000' },
            { label: 'Commentaires', value: '45' },
          ].map((stat) => (
            <Card
              key={stat.label}
              className="p-6 space-y-2"
            >
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </Card>
          ))}
        </div>

        {/* Placeholder content */}
        <div className="mt-12">
          <Card className="p-8 text-center">
            <h2 className="text-lg font-semibold mb-2">Welcome to Admin Dashboard</h2>
            <p className="text-muted-foreground">
              Use the sidebar to navigate to articles, users, and settings.
            </p>
          </Card>
        </div>
      </AdminLayout>
    </AdminProtection>
  )
}


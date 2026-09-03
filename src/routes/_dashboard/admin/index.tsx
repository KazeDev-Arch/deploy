import { createFileRoute, Link } from '@tanstack/react-router'
import { Plus, Sparkles } from 'lucide-react'

import { PageHeader } from '#/components/admin'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Card } from '#/components/ui/card'
import { authClient } from '#/lib/auth-client'
import { DEFAULT_ROLE } from '#/lib/permissions'
import type { AppRole } from '#/lib/permissions'

export const Route = createFileRoute('/_dashboard/admin/')({
  component: AdminDashboard,
})

const ADMIN_STATS = [
  { label: 'Articles publiés', value: '12' },
  { label: 'Brouillons', value: '3' },
  { label: 'Abonnés actifs', value: '234' },
  { label: 'Revenus (XAF)', value: '1 250 000' },
]

function AdminOverview() {
  return (
    <>
      <PageHeader
        title="Tableau de bord"
        description="Vue d'ensemble du site : publications, abonnés et revenus."
      >
        <Button size="sm" asChild data-icon="inline-start">
          <Link to="/admin/articles">
            <Plus />
            Nouvel article
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {ADMIN_STATS.map((stat) => (
          <Card key={stat.label} className="flex flex-col gap-2 p-5">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-8 text-center">
        <h2 className="text-lg font-semibold">Bienvenue dans votre espace</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Les statistiques proviendront de Prisma (posts, abonnements,
          paiements, commentaires) — branchez les loaders pour remplacer ces
          valeurs d'exemple.
        </p>
      </Card>
    </>
  )
}

function ClientOverview() {
  const { data: session } = authClient.useSession()
  const user = session?.user

  return (
    <>
      <PageHeader
        title="Tableau de bord"
        description="Bienvenue sur votre espace lecteur."
      />

      <Card className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-muted-foreground" />
            <h2 className="font-semibold">Votre abonnement</h2>
          </div>
          <Badge variant="secondary" className="w-fit">
            Aucun abonnement actif
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Abonnez-vous pour débloquer les articles premium et soutenir la
          rédaction. Le flux de souscription K-Pay sera branché ici.
        </p>
        <div>
          <Button asChild>
            <Link to="/">Voir les offres</Link>
          </Button>
        </div>
      </Card>

      <Card className="flex flex-col gap-2 p-6">
        <h2 className="font-semibold">Vos informations</h2>
        <p className="text-sm text-muted-foreground">
          {user?.name ? `${user.name} — ` : ''}
          {user?.email}
        </p>
        <p className="text-sm text-muted-foreground">
          La gestion du profil et l'historique des paiements arriveront ici.
        </p>
      </Card>
    </>
  )
}

function AdminDashboard() {
  const { data: session } = authClient.useSession()
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- typescript-eslint mis-models better-auth useSession nullability; tsc stays the gate.
  const role = (session?.user?.role ?? DEFAULT_ROLE) as AppRole

  if (role === 'ADMIN') {
    return <AdminOverview />
  }

  return <ClientOverview />
}

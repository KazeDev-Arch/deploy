import { Link } from '@tanstack/react-router'
import { Lock } from 'lucide-react'

import { Button } from '#/components/ui/button'

/** Page 403 — rendue quand un utilisateur connecté n'a pas le rôle requis. */
export function Forbidden() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-xl border py-16 text-center">
      <div className="grid size-14 place-items-center rounded-full bg-muted">
        <Lock className="size-7 text-muted-foreground" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Erreur 403
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-foreground">
        Accès refusé
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        Vous n’avez pas la permission d’accéder à cette page.
      </p>
      <Button asChild variant="outline">
        <Link to="/admin">Retour au tableau de bord</Link>
      </Button>
    </div>
  )
}

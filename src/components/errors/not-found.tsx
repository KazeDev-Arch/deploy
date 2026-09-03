import { Link } from '@tanstack/react-router'
import { FileQuestion } from 'lucide-react'

import { Button } from '#/components/ui/button'

/** Page 404 — rendue pour toute route inexistante (router `defaultNotFoundComponent`). */
export function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="grid size-14 place-items-center rounded-full bg-muted">
        <FileQuestion className="size-7 text-muted-foreground" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Erreur 404
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Page introuvable
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        La page que vous cherchez n’existe pas ou a été déplacée.
      </p>
      <Button asChild>
        <Link to="/">Retour à l’accueil</Link>
      </Button>
    </main>
  )
}

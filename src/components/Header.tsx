import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { authClient } from '#/lib/auth-client'


const NAV = [
  { label: 'À la une', href: '#a-la-une' },
  { label: 'Articles', href: '#articles' },
  { label: 'S’abonner', href: '#abonnement' },
]

export default function Header() {
  const { data: session } = authClient.useSession()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-lg">
      <nav className="page-wrap flex items-center gap-8 py-3.5">
        <Link to="/" className="inline-flex items-center gap-2.5 no-underline">
          <span className="grid size-6 shrink-0 place-items-center rounded-[3px] bg-foreground">
            <span className="h-1.5 w-1.5 rounded-[1px] bg-background" />
          </span>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Deploy
          </span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground no-underline transition hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {!session?.user ? (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              <Link to="/auth/login">Se connecter</Link>
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              <Link to="/admin">Tableau de bord</Link>
            </Button>
          )}
          <Button size="sm" asChild>
            <a href="#abonnement">S’abonner</a>
          </Button>
        </div>
      </nav>
    </header>
  )
}

import { Link } from '@tanstack/react-router'
import { Bell, ExternalLink, Inbox } from 'lucide-react'

import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Separator } from '#/components/ui/separator'
import { SidebarTrigger } from '#/components/ui/sidebar'

/**
 * Barre supérieure du panneau : trigger de la sidebar, retour au site
 * et cloche de notifications. Placeholder — brancher sur une vraie
 * source de notifications quand le backend existera.
 */
export function AdminNavbar() {
  const notifications: { id: string; title: string }[] = []

  return (
    <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <SidebarTrigger className="-ml-1" />

      <Separator
        orientation="vertical"
        className="mr-1 data-[orientation=vertical]:h-4"
      />

      <div className="ml-auto flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-muted-foreground"
        >
          <Link to="/">
            <ExternalLink />
            <span className="hidden sm:inline">Voir le site</span>
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
            >
              <Bell />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                <Inbox className="size-8 text-muted-foreground/60" />
                <p className="text-sm text-muted-foreground">
                  Aucune notification pour le moment.
                </p>
              </div>
            ) : (
              <DropdownMenuGroup>
                {notifications.map((notification) => (
                  <div key={notification.id} className="px-2 py-1.5 text-sm">
                    {notification.title}
                  </div>
                ))}
              </DropdownMenuGroup>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

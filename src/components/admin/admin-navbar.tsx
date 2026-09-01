import { Button } from '#/components/ui/button'
import { Menu } from 'lucide-react'

interface AdminNavbarProps {
  onMenuClick?: () => void
  title?: string
}

export function AdminNavbar({ onMenuClick, title }: AdminNavbarProps) {
  return (
    <nav className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="flex h-14 items-center justify-between px-4 gap-4">
        {/* Menu toggle (mobile) */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={onMenuClick}
          data-icon="inline-start"
        >
          <Menu className="size-4" />
        </Button>

        {/* Page title */}
        {title && (
          <div className="flex-1">
            <h1 className="text-sm font-semibold">{title}</h1>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* User menu placeholder */}
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-muted" />
        </div>
      </div>
    </nav>
  )
}


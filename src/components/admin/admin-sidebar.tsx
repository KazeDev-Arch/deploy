import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { Link, useLocation } from '@tanstack/react-router'
import { X } from 'lucide-react'

export const ADMIN_MENU_ITEMS = [
  {
    label: 'Dashboard',
    href: '/admin',
  },
  {
    label: 'Articles',
    href: '/admin/articles',
  },
  {
    label: 'Paramètres',
    href: '/admin/settings',
  },
]

interface AdminSidebarProps {
  open?: boolean
  onClose?: () => void
}

export function AdminSidebar({ open = true, onClose }: AdminSidebarProps) {
  const location = useLocation()
  const isActive = (href: string) => location.pathname === href

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-14 z-40 h-[calc(100vh-3.5rem)] w-64 border-r border-border bg-background transition-transform duration-200 md:relative md:top-0 md:h-screen md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col gap-4 p-4 h-full">
          {/* Close button (mobile only) */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden self-end"
            onClick={onClose}
            data-icon="inline-end"
          >
            <X className="size-4" />
          </Button>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {ADMIN_MENU_ITEMS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={cn(
                  'px-3 py-2 text-sm rounded-md transition-colors',
                  isActive(item.href)
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'hover:bg-muted text-foreground'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Footer section (optional) */}
          <div className="border-t border-border pt-4 text-xs text-muted-foreground">
            <p>Deploy v1.0</p>
          </div>
        </div>
      </aside>
    </>
  )
}


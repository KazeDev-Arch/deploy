import type { ReactNode } from 'react'

import { SidebarInset, SidebarProvider } from '#/components/ui/sidebar'

import { AdminNavbar } from './admin-navbar'
import { AdminSidebar } from './admin-sidebar'

interface AdminLayoutProps {
  children: ReactNode
}

/**
 * Coquille du panneau partagé (client & admin) : Sidebar shadcn à gauche,
 * Navbar + contenu dans le `SidebarInset`. Composée par le layout de route
 * `_dashboard` pour rester montée entre les navigations.
 */
export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <AdminNavbar />
        <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

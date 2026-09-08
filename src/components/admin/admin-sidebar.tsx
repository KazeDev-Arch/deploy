import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import {
  ChevronsUpDown,
  CreditCard,
  Globe,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Newspaper,
  Settings,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '#/components/ui/sidebar'
import { authClient } from '#/lib/auth-client'
import { canAccess, DEFAULT_ROLE } from '#/lib/permissions'
import type { Action, AppRole, Resource } from '#/lib/permissions'

interface Permission {
  resource: Resource
  action: Action
}

interface DashboardMenuItem {
  title: string
  href: string
  icon: LucideIcon
  /** Requise pour voir l'entrée. Absente = visible pour tout rôle connecté. */
  permission?: Permission
}

interface DashboardMenuGroup {
  label?: string
  items: DashboardMenuItem[]
}

/**
 * Menu unique du panneau partagé client/admin. Les entrées sensibles
 * déclarent la permission qui les contrôle ; le filtrage se fait avec
 * `canAccess` (voir `#/lib/permissions`).
 */
const DASHBOARD_MENU: DashboardMenuGroup[] = [
  {
    items: [
      { title: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Administration',
    items: [
      {
        title: 'Articles',
        href: '/admin/articles',
        icon: Newspaper,
        permission: { resource: 'article', action: 'read' },
      },
      {
        title: 'Commentaires',
        href: '/admin/comments',
        icon: MessageSquare,
        permission: { resource: 'comment', action: 'read' },
      },
      {
        title: 'Abonnés',
        href: '/admin/subscribers',
        icon: Users,
        permission: { resource: 'user', action: 'read' },
      },
      {
        title: 'Paiements',
        href: '/admin/payments',
        icon: CreditCard,
        permission: { resource: 'payment', action: 'read' },
      },
      {
        title: 'Réglages',
        href: '/admin/settings',
        icon: Settings,
        permission: { resource: 'settings', action: 'read' },
      },
    ],
  },
]

function getMenuForRole(
  role: AppRole | null | undefined,
): DashboardMenuGroup[] {
  return DASHBOARD_MENU.map((group) => ({
    label: group.label,
    items: group.items.filter((item) => {
      if (!item.permission) return true
      return canAccess(role, item.permission.resource, item.permission.action)
    }),
  })).filter((group) => group.items.length > 0)
}

function getInitials(
  name: string | null | undefined,
  email: string | null | undefined,
) {
  if (name) {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join('')
  }
  return email?.[0]?.toUpperCase() ?? '?'
}

const ROLE_LABELS: Record<AppRole, string> = {
  ADMIN: 'Administrateur',
  CLIENT: 'Lecteur',
}

function DashboardBrand() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link to="/admin" aria-label="Deploy — Tableau de bord">
            <div className="grid size-8 shrink-0 place-items-center rounded-md bg-foreground text-background">
              <span className="size-2 rounded-[2px] bg-background" />
            </div>
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate font-semibold">Deploy</span>
              <span className="truncate text-xs text-sidebar-foreground/60">
                Espace membres
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function AdminSidebar() {
  const { data: session } = authClient.useSession()
  const location = useLocation()
  const role = (session?.user.role ?? DEFAULT_ROLE) as AppRole
  const groups = getMenuForRole(role)

  const isActive = (href: string) =>
    location.pathname === href ||
    (href !== '/admin' && location.pathname.startsWith(`${href}/`))

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <DashboardBrand />
      </SidebarHeader>

      <SidebarContent>
        {groups.map((group, index) => (
          <SidebarGroup key={group.label ?? `group-${index}`}>
            {group.label && (
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      tooltip={item.title}
                    >
                      <Link to={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <AdminUserMenu />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

function AdminUserMenu() {
  const navigate = useNavigate()
  const { data: session } = authClient.useSession()
  const user = session?.user
  const role = (user?.role ?? DEFAULT_ROLE) as AppRole

  const handleSignOut = async () => {
    await authClient.signOut()
    toast.success('Déconnexion réussie.')
    void navigate({ to: '/auth/login' })
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                {user?.image ? <AvatarImage src={user.image} alt="" /> : null}
                <AvatarFallback className="rounded-lg">
                  {getInitials(user?.name, user?.email)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user?.name ?? 'Utilisateur'}
                </span>
                <span className="truncate text-xs text-sidebar-foreground/60">
                  {user?.email ?? ''}
                </span>
              </div>
              <ChevronsUpDown />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="top"
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
          >
            <DropdownMenuLabel className="flex items-center justify-between gap-2 p-2">
              <span className="text-xs text-muted-foreground">Mon compte</span>
              <Badge
                variant="secondary"
                className="text-[10px] uppercase tracking-wide"
              >
                {ROLE_LABELS[role]}
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to="/">
                  <Globe />
                  Voir le site
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={handleSignOut}>
              <LogOut />
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

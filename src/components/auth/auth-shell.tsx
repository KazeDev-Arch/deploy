import type { ComponentProps, ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface AuthShellProps {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthShell({
  title,
  description,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="page-wrap flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16">
      <Link to="/" className="mb-8 inline-flex items-center gap-2.5 no-underline">
        <span className="grid size-6 shrink-0 place-items-center rounded-[3px] bg-foreground">
          <span className="h-1.5 w-1.5 rounded-[1px] bg-background" />
        </span>
        <span className="text-xl font-bold tracking-tight text-foreground">
          Deploy
        </span>
      </Link>

      <Card className="w-full max-w-sm rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer ? (
          <CardFooter className="justify-center">{footer}</CardFooter>
        ) : null}
      </Card>
    </main>
  )
}

interface AuthFieldGroupProps {
  children: ReactNode
}

export function AuthFieldGroup({ children }: AuthFieldGroupProps) {
  return <div className="flex flex-col gap-4">{children}</div>
}

interface AuthFieldProps extends ComponentProps<typeof Input> {
  id: string
  label: string
  icon?: LucideIcon
  labelAction?: ReactNode
  error?: string
}

export function AuthField({
  id,
  label,
  icon: Icon,
  labelAction,
  error,
  ...props
}: AuthFieldProps) {
  return (
    <div className="flex flex-col gap-2" data-invalid={error ? '' : undefined}>
      <div className="flex items-center justify-between gap-2">
        <Label htmlFor={id}>{label}</Label>
        {labelAction}
      </div>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        )}
        <Input
          id={id}
          className={Icon ? 'pl-9' : ''}
          aria-invalid={error ? true : undefined}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}

interface AuthDividerProps {
  label?: string
}

export function AuthDivider({ label = 'ou' }: AuthDividerProps) {
  return (
    <div className="relative flex items-center gap-3">
      <div className="h-px flex-1 bg-border" />
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

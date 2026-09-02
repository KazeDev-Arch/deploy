import { createAccessControl } from 'better-auth/plugins/access'

const statement = {
  article: ['create', 'read', 'update', 'delete'],
  user: ['create', 'read', 'update', 'ban'],
} as const

export const ac = createAccessControl(statement)

export const adminRole = ac.newRole({
  article: ['create', 'read', 'update', 'delete'],
  user: ['create', 'read', 'update', 'ban'],
})

export const userRole = ac.newRole({
  article: ['read']
})
import type { LucideIcon } from "lucide-vue-next"

export interface Auth {
  user: User
  session: Pick<Session, "id">
}

export interface BreadcrumbItem {
  title: string
  href: string
}

export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon
  isActive?: boolean
}

export interface Flash {
  alert?: string
  notice?: string
}

export type AppPageProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
  auth: Auth
  flash: Flash
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  verified: boolean
  created_at: string
  updated_at: string
}

export type BreadcrumbItemType = BreadcrumbItem

export interface Session {
  id: string
  user_agent: string
  ip_address: string
  created_at: string
}

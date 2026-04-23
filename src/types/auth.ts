export type UserRole = 'Admin' | 'Viewer'

export interface User {
  id: string
  username: string
  password: string
  role: UserRole
  displayName: string
}

export interface AuthSession {
  userId: string
  role: UserRole
  displayName: string
}

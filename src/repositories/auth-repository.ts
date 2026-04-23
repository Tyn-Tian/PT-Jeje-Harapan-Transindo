import { mockUsers } from '../data/mock-data'
import type { AuthSession, User } from '../types/auth'

const SESSION_KEY = 'auth_session'

export const findUserByCredentials = (username: string, password: string): User | undefined => {
  return mockUsers.find(u => u.username === username && u.password === password)
}

export const saveSession = (session: AuthSession): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export const getSession = (): AuthSession | null => {
  const session = localStorage.getItem(SESSION_KEY)
  if (!session) return null
  try {
    return JSON.parse(session) as AuthSession
  } catch {
    return null
  }
}

export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY)
}

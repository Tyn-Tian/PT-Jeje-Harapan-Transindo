import * as authRepository from '../repositories/auth-repository'
import type { AuthSession } from '../types/auth'

export const login = (username: string, password: string): AuthSession => {
  if (!username || !password) {
    throw new Error('Username dan password wajib diisi')
  }

  const user = authRepository.findUserByCredentials(username, password)
  if (!user) {
    throw new Error('Username atau password salah')
  }

  const session: AuthSession = {
    userId: user.id,
    role: user.role,
    displayName: user.displayName
  }

  authRepository.saveSession(session)
  return session
}

export const logout = (): void => {
  authRepository.clearSession()
}

export const getCurrentSession = (): AuthSession | null => {
  return authRepository.getSession()
}

export const isAuthenticated = (): boolean => {
  return !!getCurrentSession()
}

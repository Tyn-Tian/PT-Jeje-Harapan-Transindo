import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as authService from '../auth-service'

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('should login successfully with valid credentials', () => {
    const session = authService.login('admin', 'admin123')
    expect(session).toBeDefined()
    expect(session.role).toBe('Admin')
    expect(authService.isAuthenticated()).toBe(true)
  })

  it('should throw error if username or password is empty', () => {
    expect(() => authService.login('', 'admin123')).toThrow('Username dan password wajib diisi')
    expect(() => authService.login('admin', '')).toThrow('Username dan password wajib diisi')
  })

  it('should throw error if credentials are wrong', () => {
    expect(() => authService.login('admin', 'wrong')).toThrow('Username atau password salah')
  })

  it('should logout and clear session', () => {
    authService.login('admin', 'admin123')
    authService.logout()
    expect(authService.isAuthenticated()).toBe(false)
    expect(authService.getCurrentSession()).toBeNull()
  })
})

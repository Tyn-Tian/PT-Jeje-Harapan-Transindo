import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth-store'
import * as authService from '../../services/auth-service'

describe('AuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should have initial state', () => {
    const store = useAuthStore()
    expect(store.currentSession).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })

  it('should login successfully', async () => {
    const store = useAuthStore()
    const result = await store.login('admin', 'admin123')
    
    expect(result).toBe(true)
    expect(store.currentSession).not.toBeNull()
    expect(store.isAdmin).toBe(true)
    expect(store.isAuthenticated).toBe(true)
  })

  it('should handle login error', async () => {
    const store = useAuthStore()
    const result = await store.login('admin', 'wrong')
    
    expect(result).toBe(false)
    expect(store.currentSession).toBeNull()
    expect(store.errorMessage).toBe('Username atau password salah')
  })

  it('should logout', async () => {
    const store = useAuthStore()
    await store.login('admin', 'admin123')
    store.logout()
    
    expect(store.currentSession).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })

  it('should restore session', () => {
    const store = useAuthStore()
    authService.login('viewer', 'viewer123')
    
    store.restoreSession()
    expect(store.currentSession).not.toBeNull()
    expect(store.isViewer).toBe(true)
  })
})

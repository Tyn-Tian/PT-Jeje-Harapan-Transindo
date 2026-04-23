import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as authRepository from '../auth-repository'

describe('AuthRepository', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should find user by valid credentials', () => {
    const user = authRepository.findUserByCredentials('admin', 'admin123')
    expect(user).toBeDefined()
    expect(user?.username).toBe('admin')
  })

  it('should return undefined for wrong password', () => {
    const user = authRepository.findUserByCredentials('admin', 'wrong')
    expect(user).toBeUndefined()
  })

  it('should return undefined for non-existent user', () => {
    const user = authRepository.findUserByCredentials('ghost', 'ghost123')
    expect(user).toBeUndefined()
  })

  it('should save and get session', () => {
    const session = { userId: 'USR-001', role: 'Admin' as const, displayName: 'Admin' }
    authRepository.saveSession(session)
    
    const retrieved = authRepository.getSession()
    expect(retrieved).toEqual(session)
  })

  it('should return null if no session exists', () => {
    expect(authRepository.getSession()).toBeNull()
  })

  it('should clear session', () => {
    const session = { userId: 'USR-001', role: 'Admin' as const, displayName: 'Admin' }
    authRepository.saveSession(session)
    authRepository.clearSession()
    
    expect(authRepository.getSession()).toBeNull()
  })
})

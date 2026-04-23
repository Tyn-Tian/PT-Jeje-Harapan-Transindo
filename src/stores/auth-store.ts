import { defineStore } from 'pinia'
import * as authService from '../services/auth-service'
import type { AuthSession } from '../types/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentSession: null as AuthSession | null,
    isLoading: false,
    errorMessage: null as string | null
  }),

  getters: {
    isAuthenticated: (state) => !!state.currentSession,
    isAdmin: (state) => state.currentSession?.role === 'Admin',
    isViewer: (state) => state.currentSession?.role === 'Viewer',
    displayName: (state) => state.currentSession?.displayName || null
  },

  actions: {
    async login(username: string, password: string) {
      this.isLoading = true
      this.errorMessage = null
      try {
        const session = authService.login(username, password)
        this.currentSession = session
        return true
      } catch (error) {
        this.errorMessage = error instanceof Error ? error.message : 'Terjadi kesalahan saat login'
        return false
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      authService.logout()
      this.currentSession = null
      this.errorMessage = null
    },

    restoreSession() {
      const session = authService.getCurrentSession()
      if (session) {
        this.currentSession = session
      }
    }
  }
})

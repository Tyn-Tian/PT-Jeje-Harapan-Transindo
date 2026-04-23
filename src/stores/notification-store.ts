import { defineStore } from 'pinia'

export interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  duration: number
}

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [] as Notification[]
  }),

  actions: {
    push(message: string, type: 'success' | 'error' | 'info' = 'info', duration: number = 3000) {
      const id = Date.now().toString() + Math.random().toString(36).substring(2, 9)
      
      this.notifications.push({ id, message, type, duration })

      if (duration > 0) {
        setTimeout(() => {
          this.dismiss(id)
        }, duration)
      }

      return id
    },

    dismiss(id: string) {
      const index = this.notifications.findIndex(n => n.id === id)
      if (index !== -1) {
        this.notifications.splice(index, 1)
      }
    }
  }
})

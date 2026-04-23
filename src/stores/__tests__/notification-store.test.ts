import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useNotificationStore } from '../notification-store'

describe('Notification Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  it('pushes a notification', () => {
    const store = useNotificationStore()
    store.push('Hello', 'success')
    expect(store.notifications).toHaveLength(1)
    expect(store.notifications[0].message).toBe('Hello')
    expect(store.notifications[0].type).toBe('success')
  })

  it('dismisses a notification', () => {
    const store = useNotificationStore()
    const id = store.push('Hello')
    store.dismiss(id)
    expect(store.notifications).toHaveLength(0)
  })

  it('auto-dismisses notification after duration', () => {
    const store = useNotificationStore()
    store.push('Hello', 'success', 3000)
    expect(store.notifications).toHaveLength(1)
    
    vi.advanceTimersByTime(3000)
    expect(store.notifications).toHaveLength(0)
  })
})

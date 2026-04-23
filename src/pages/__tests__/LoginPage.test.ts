import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import LoginPage from '../LoginPage.vue'
import { useAuthStore } from '../../stores/auth-store'

// Mock useRouter
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

describe('LoginPage', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('renders correctly', () => {
    const wrapper = mount(LoginPage)
    expect(wrapper.text()).toContain('Shipment Tracker')
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('shows validation errors when fields are empty', async () => {
    const wrapper = mount(LoginPage)
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(wrapper.text()).toContain('Username wajib diisi')
    expect(wrapper.text()).toContain('Password wajib diisi')
  })

  it('calls store login action with valid input', async () => {
    const wrapper = mount(LoginPage)
    const store = useAuthStore()
    const loginSpy = vi.spyOn(store, 'login')

    await wrapper.find('#username').setValue('admin')
    await wrapper.find('#password').setValue('admin123')
    await wrapper.find('form').trigger('submit.prevent')

    expect(loginSpy).toHaveBeenCalledWith('admin', 'admin123')
  })

  it('redirects to shipments on successful login', async () => {
    const wrapper = mount(LoginPage)
    const store = useAuthStore()
    vi.spyOn(store, 'login').mockResolvedValue(true)

    await wrapper.find('#username').setValue('admin')
    await wrapper.find('#password').setValue('admin123')
    await wrapper.find('form').trigger('submit.prevent')

    expect(mockPush).toHaveBeenCalledWith('/shipments')
  })

  it('displays error message from store', async () => {
    const wrapper = mount(LoginPage)
    const store = useAuthStore()
    store.errorMessage = 'Invalid credentials'
    
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('Invalid credentials')
  })
})

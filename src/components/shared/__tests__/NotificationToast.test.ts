import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import NotificationToast from '../NotificationToast.vue'

describe('NotificationToast', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders message when visible', () => {
    const wrapper = mount(NotificationToast, {
      props: { message: 'Success!', visible: true, type: 'success' }
    })
    expect(wrapper.text()).toContain('Success!')
    // Since it's inside a Transition, we find the div directly
    const div = wrapper.find('div')
    expect(div.exists()).toBe(true)
    expect(div.classes()).toContain('bg-green-50')
  })

  it('does not render when not visible', () => {
    const wrapper = mount(NotificationToast, {
      props: { message: 'Success!', visible: false }
    })
    expect(wrapper.find('div').exists()).toBe(false)
  })

  it('emits close event after 3 seconds', async () => {
    const wrapper = mount(NotificationToast, {
      props: { message: 'Success!', visible: true }
    })
    
    vi.advanceTimersByTime(3000)
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(NotificationToast, {
      props: { message: 'Success!', visible: true }
    })
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})

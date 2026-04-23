import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NotificationToast from '../NotificationToast.vue'

describe('NotificationToast', () => {
  it('renders message and type correctly', () => {
    const wrapper = mount(NotificationToast, {
      props: { message: 'Success!', type: 'success' }
    })
    expect(wrapper.text()).toContain('Success!')
    expect(wrapper.classes()).toContain('bg-green-50')
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(NotificationToast, {
      props: { message: 'Success!' }
    })
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})

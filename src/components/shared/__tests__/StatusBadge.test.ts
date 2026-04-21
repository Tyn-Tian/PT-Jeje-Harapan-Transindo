import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusBadge from '../StatusBadge.vue'

describe('StatusBadge', () => {
  it('renders Assigned status correctly', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'Assigned' }
    })
    expect(wrapper.text()).toContain('Assigned')
    expect(wrapper.classes()).toContain('bg-green-50')
    expect(wrapper.find('.bg-green-600').exists()).toBe(true)
  })

  it('renders Not Assigned status correctly', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'Not Assigned' }
    })
    expect(wrapper.text()).toContain('Not Assigned')
    expect(wrapper.classes()).toContain('bg-amber-50')
    expect(wrapper.find('.bg-amber-600').exists()).toBe(true)
  })
})

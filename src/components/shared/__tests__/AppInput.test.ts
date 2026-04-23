import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppInput from '../AppInput.vue'

describe('AppInput', () => {
  it('renders label when provided', () => {
    const wrapper = mount(AppInput, {
      props: { label: 'Username', modelValue: '' }
    })
    expect(wrapper.find('label').text()).toBe('Username')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' }
    })
    const input = wrapper.find('input')
    await input.setValue('test')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test'])
  })

  it('shows error message and applies error classes', () => {
    const wrapper = mount(AppInput, {
      props: { error: 'Required field', modelValue: '' }
    })
    expect(wrapper.find('p').text()).toBe('Required field')
    expect(wrapper.find('input').classes()).toContain('border-red-600')
  })

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(AppInput, {
      props: { disabled: true, modelValue: '' }
    })
    expect(wrapper.find('input').element.disabled).toBe(true)
  })

  it('renders prefix slot content', () => {
    const wrapper = mount(AppInput, {
      props: { modelValue: '' },
      slots: {
        prefix: '<span class="icon">🔍</span>'
      }
    })
    expect(wrapper.find('.icon').exists()).toBe(true)
    expect(wrapper.find('input').classes()).toContain('pl-9')
  })
})

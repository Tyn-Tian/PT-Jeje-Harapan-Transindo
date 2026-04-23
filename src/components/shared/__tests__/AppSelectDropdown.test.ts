import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppSelectDropdown from '../AppSelectDropdown.vue'

describe('AppSelectDropdown', () => {
  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]

  it('renders all options', () => {
    const wrapper = mount(AppSelectDropdown, {
      props: { options, modelValue: '' }
    })
    const htmlOptions = wrapper.findAll('option')
    expect(htmlOptions).toHaveLength(3) // placeholder + 2 options
    expect(htmlOptions[1].text()).toBe('Option 1')
  })

  it('emits update:modelValue on change', async () => {
    const wrapper = mount(AppSelectDropdown, {
      props: { options, modelValue: '' }
    })
    const select = wrapper.find('select')
    await select.setValue('2')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2'])
  })

  it('shows error message', () => {
    const wrapper = mount(AppSelectDropdown, {
      props: { error: 'Error!', options, modelValue: '' }
    })
    expect(wrapper.find('p').text()).toBe('Error!')
  })
})

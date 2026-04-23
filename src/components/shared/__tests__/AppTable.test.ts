import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTable from '../AppTable.vue'

describe('AppTable', () => {
  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' }
  ]
  const rows = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' }
  ]

  it('renders correct number of columns and rows', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows }
    })
    expect(wrapper.findAll('th')).toHaveLength(2)
    expect(wrapper.findAll('tbody tr')).toHaveLength(2)
  })

  it('renders cell slot content', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows },
      slots: {
        'cell-name': '<template #default="{ value }">User: {{ value }}</template>'
      }
    })
    expect(wrapper.find('tbody tr td:nth-child(2)').text()).toBe('User: Alice')
  })

  it('shows loading skeleton when loading is true', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows: [], loading: true }
    })
    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
    expect(wrapper.find('tbody').exists()).toBe(false)
  })

  it('shows empty message when rows are empty', () => {
    const wrapper = mount(AppTable, {
      props: { columns, rows: [], emptyMessage: 'Empty' }
    })
    expect(wrapper.text()).toContain('Empty')
  })
})

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ShipmentListPage from '../ShipmentListPage.vue'

const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush
  })
}))

import { useShipmentStore } from '../../stores/shipment-store'

describe('ShipmentListPage', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    
    const store = useShipmentStore()
    vi.spyOn(store, 'loadShipments').mockResolvedValue()
    vi.spyOn(store, 'loadTransporters').mockResolvedValue()
  })

  it('renders loading state correctly', async () => {
    const store = useShipmentStore()
    store.isLoading = true
    const wrapper = mount(ShipmentListPage)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
  })

  it('navigates to detail on button click', async () => {
    const store = useShipmentStore()
    store.shipments = [{ id: 'S-001', origin: 'A', destination: 'B', status: 'Not Assigned', vehicleType: 'T', assignedTransporterId: null }]
    store.isLoading = false
    
    const wrapper = mount(ShipmentListPage)
    await wrapper.vm.$nextTick()
    
    const btn = wrapper.find('button')
    await btn.trigger('click')
    
    expect(mockPush).toHaveBeenCalledWith('/shipments/S-001')
  })

  it('updates store search keyword on input', async () => {
    const store = useShipmentStore()
    const wrapper = mount(ShipmentListPage)
    
    const input = wrapper.find('input')
    await input.setValue('Bandung')
    
    expect(store.searchKeyword).toBe('Bandung')
  })

  it('renders correct number of items based on pagination', async () => {
    const store = useShipmentStore()
    store.shipments = Array.from({ length: 15 }, (_, i) => ({ 
      id: `S-${i+1}`, origin: 'A', destination: 'B', status: 'Not Assigned', vehicleType: 'T', assignedTransporterId: null 
    }))
    store.pageSize = 10
    store.currentPage = 1
    
    const wrapper = mount(ShipmentListPage)
    await wrapper.vm.$nextTick()
    
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(10)
  })

  it('changes page when pagination button is clicked', async () => {
    const store = useShipmentStore()
    
    store.shipments = Array.from({ length: 15 }, (_, i) => ({ 
      id: `S-${i+1}`, origin: 'A', destination: 'B', status: 'Not Assigned', vehicleType: 'T', assignedTransporterId: null 
    }))
    store.pageSize = 10
    store.currentPage = 1
    
    const wrapper = mount(ShipmentListPage)
    await wrapper.vm.$nextTick()
    
    const buttons = wrapper.findAll('button')
    const nextButton = buttons.find(b => b.text().includes('Next'))
    
    expect(nextButton).toBeDefined()
    await nextButton?.trigger('click')
    
    expect(store.currentPage).toBe(2)
  })
})

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
})

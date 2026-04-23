import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ShipmentDetailPage from '../ShipmentDetailPage.vue'
import * as storeModule from '../../stores/shipment-store'
import { useAuthStore } from '../../stores/auth-store'

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: 'S-001' }
  }),
  useRouter: () => ({
    push: vi.fn()
  })
}))

describe('ShipmentDetailPage', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const authStore = useAuthStore()
    authStore.currentSession = { userId: '1', role: 'Admin', displayName: 'Test Admin' }
  })

  it('shows validation error when assignment is submitted empty', async () => {
    const store = storeModule.useShipmentStore()
    store.selectedShipment = { id: 'S-001', origin: 'A', destination: 'B', status: 'Not Assigned', vehicleType: 'T', assignedTransporterId: null }
    
    const wrapper = mount(ShipmentDetailPage)
    await wrapper.vm.$nextTick()
    
    await (wrapper.vm as any).handleAssign()
    
    expect(wrapper.text()).toContain('Pilih transporter terlebih dahulu')
  })

  it('calls store action when valid transporter is selected', async () => {
    const store = storeModule.useShipmentStore()
    store.selectedShipment = { id: 'S-001', origin: 'A', destination: 'B', status: 'Not Assigned', vehicleType: 'T', assignedTransporterId: null }
    store.transporters = [{ id: 'T-1', name: 'Transporter 1', phone: '123' }]
    
    const assignSpy = vi.spyOn(store, 'assignTransporter').mockImplementation(async () => {})
    
    const wrapper = mount(ShipmentDetailPage)
    await wrapper.vm.$nextTick()
    
    // Set v-model value directly
    ;(wrapper.vm as any).selectedTransporterId = 'T-1'
    
    await (wrapper.vm as any).handleAssign()
    
    expect(assignSpy).toHaveBeenCalledWith('S-001', 'T-1')
  })
})

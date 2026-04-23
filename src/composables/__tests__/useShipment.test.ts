import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShipment } from '../useShipment'
import { useShipmentStore } from '../../stores/shipment-store'

describe('useShipment Composable', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('provides reactive access to store state', () => {
    const store = useShipmentStore()
    const { shipments } = useShipment()
    
    expect(shipments.value).toEqual([])
    store.shipments = [{ id: '1' } as any]
    expect(shipments.value).toHaveLength(1)
  })

  it('wraps store actions', () => {
    const store = useShipmentStore()
    const spy = vi.spyOn(store, 'loadShipments').mockResolvedValue()
    const { loadShipments } = useShipment()
    
    loadShipments()
    expect(spy).toHaveBeenCalled()
  })

  it('provides helper methods like getTransporterById', () => {
    const store = useShipmentStore()
    store.transporters = [{ id: 'T1', name: 'Trans 1', phone: '08123456789' }]
    const { getTransporterById } = useShipment()
    
    const t = getTransporterById('T1')
    expect(t?.name).toBe('Trans 1')
  })
})

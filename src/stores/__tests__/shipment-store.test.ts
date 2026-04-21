import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useShipmentStore } from '../shipment-store'
import * as shipmentService from '../../services/shipment-service'

vi.mock('../../services/shipment-service', () => ({
  fetchAllShipments: vi.fn(() => [{ id: 'S-1', status: 'Not Assigned' }]),
  fetchAllTransporters: vi.fn(() => [{ id: 'T-1', name: 'Transporter 1' }]),
  fetchShipmentById: vi.fn((id) => ({ id, status: 'Not Assigned' })),
  assignTransporter: vi.fn((sid, tid) => ({ id: sid, status: 'Assigned', assignedTransporterId: tid }))
}))

describe('Shipment Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('loads shipments correctly', async () => {
    const store = useShipmentStore()
    await store.loadShipments()
    expect(store.shipments.length).toBe(1)
    expect(store.isLoading).toBe(false)
  })

  it('selects a shipment', () => {
    const store = useShipmentStore()
    store.selectShipment('S-1')
    expect(store.selectedShipment?.id).toBe('S-1')
  })

  it('assigns transporter successfully', async () => {
    const store = useShipmentStore()
    store.shipments = [{ id: 'S-1', status: 'Not Assigned', origin: 'A', destination: 'B', vehicleType: 'T', assignedTransporterId: null }]
    await store.assignTransporter('S-1', 'T-1')
    
    expect(store.successMessage).toBe('Transporter berhasil ditugaskan')
    expect(store.shipments[0].status).toBe('Assigned')
  })

  it('handles assignment error', async () => {
    const store = useShipmentStore()
    vi.mocked(shipmentService.assignTransporter).mockImplementationOnce(() => {
      throw new Error('Test Error')
    })
    
    await store.assignTransporter('S-1', 'T-1')
    expect(store.errorMessage).toBe('Test Error')
  })
})

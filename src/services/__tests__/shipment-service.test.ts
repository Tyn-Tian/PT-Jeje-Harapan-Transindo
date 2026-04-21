import { describe, it, expect } from 'vitest'
import * as service from '../shipment-service'

describe('Shipment Service', () => {
  it('should fetch all shipments', () => {
    const shipments = service.fetchAllShipments()
    expect(shipments).toBeDefined()
    expect(Array.isArray(shipments)).toBe(true)
  })

  it('should fetch shipment by ID', () => {
    const shipment = service.fetchShipmentById('S-001')
    expect(shipment?.id).toBe('S-001')
  })

  it('should return undefined for non-existent shipment', () => {
    const shipment = service.fetchShipmentById('NON-EXISTENT')
    expect(shipment).toBeUndefined()
  })

  describe('assignTransporter', () => {
    it('should assign a transporter and change status to Assigned', () => {
      const shipmentId = 'S-002'
      const transporterId = 'T-003'
      
      const result = service.assignTransporter(shipmentId, transporterId)
      
      expect(result.status).toBe('Assigned')
      expect(result.assignedTransporterId).toBe(transporterId)
    })

    it('should throw error if shipmentId is empty', () => {
      expect(() => service.assignTransporter('', 'T-001')).toThrow('Invalid input')
    })

    it('should throw error if transporterId is empty', () => {
      expect(() => service.assignTransporter('S-001', '')).toThrow('Invalid input')
    })

    it('should throw error if shipment is not found', () => {
      expect(() => service.assignTransporter('NOT-FOUND', 'T-001')).toThrow('Shipment not found')
    })
  })
})

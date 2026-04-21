import { describe, it, expect } from 'vitest'
import * as repo from '../shipment-repository'
import { mockShipments } from '../../data/mock-data'

describe('Shipment Repository', () => {
  it('should return all shipments', () => {
    const shipments = repo.getAllShipments()
    expect(shipments.length).toBe(mockShipments.length)
  })

  it('should return a shipment by ID', () => {
    const shipment = repo.getShipmentById('S-001')
    expect(shipment).toBeDefined()
    expect(shipment?.id).toBe('S-001')
  })

  it('should return undefined for invalid ID', () => {
    const shipment = repo.getShipmentById('INVALID')
    expect(shipment).toBeUndefined()
  })

  it('should update a shipment', () => {
    const original = repo.getShipmentById('S-002')!
    const updated = { ...original, origin: 'Updated City' }
    
    const result = repo.updateShipment(updated)
    expect(result.origin).toBe('Updated City')
    
    const fetched = repo.getShipmentById('S-002')
    expect(fetched?.origin).toBe('Updated City')
  })
})

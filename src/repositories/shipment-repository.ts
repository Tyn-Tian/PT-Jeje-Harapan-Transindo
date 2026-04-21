import type { Shipment } from '../types/shipment'
import { mockShipments } from '../data/mock-data'

export const getAllShipments = (): Shipment[] => {
  return [...mockShipments]
}

export const getShipmentById = (id: string): Shipment | undefined => {
  return mockShipments.find(s => s.id === id)
}

export const updateShipment = (updated: Shipment): Shipment => {
  const index = mockShipments.findIndex(s => s.id === updated.id)
  if (index !== -1) {
    mockShipments[index] = { ...updated }
    return mockShipments[index]
  }
  throw new Error('Shipment not found for update')
}

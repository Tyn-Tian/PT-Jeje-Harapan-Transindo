import * as shipmentRepo from '../repositories/shipment-repository'
import * as transporterRepo from '../repositories/transporter-repository'
import type { Shipment, Transporter } from '../types/shipment'

export const fetchAllShipments = (): Shipment[] => {
  return shipmentRepo.getAllShipments()
}

export const fetchShipmentById = (id: string): Shipment | undefined => {
  return shipmentRepo.getShipmentById(id)
}

export const fetchAllTransporters = (): Transporter[] => {
  return transporterRepo.getAllTransporters()
}

export const assignTransporter = (shipmentId: string, transporterId: string): Shipment => {
  if (!shipmentId || !transporterId) {
    throw new Error('Invalid input')
  }

  const shipment = shipmentRepo.getShipmentById(shipmentId)
  if (!shipment) {
    throw new Error('Shipment not found')
  }

  const transporter = transporterRepo.getAllTransporters().find(t => t.id === transporterId)
  if (!transporter) {
    throw new Error('Transporter not found')
  }

  const updatedShipment: Shipment = {
    ...shipment,
    assignedTransporterId: transporterId,
    status: 'Assigned'
  }

  return shipmentRepo.updateShipment(updatedShipment)
}

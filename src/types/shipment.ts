export type ShipmentStatus = 'Assigned' | 'Not Assigned'

export interface Shipment {
  id: string
  origin: string
  destination: string
  vehicleType: string
  status: ShipmentStatus
  assignedTransporterId: string | null
}

export interface Transporter {
  id: string
  name: string
  phone: string
}

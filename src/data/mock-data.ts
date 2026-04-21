import type { Shipment, Transporter } from '../types/shipment'

export const mockShipments: Shipment[] = [
  {
    id: 'S-001',
    origin: 'Jakarta',
    destination: 'Surabaya',
    vehicleType: 'Truk Kontainer',
    status: 'Assigned',
    assignedTransporterId: 'T-001'
  },
  {
    id: 'S-002',
    origin: 'Bandung',
    destination: 'Medan',
    vehicleType: 'Truk Bak Terbuka',
    status: 'Not Assigned',
    assignedTransporterId: null
  },
  {
    id: 'S-003',
    origin: 'Semarang',
    destination: 'Jakarta',
    vehicleType: 'Van',
    status: 'Not Assigned',
    assignedTransporterId: null
  },
  {
    id: 'S-004',
    origin: 'Bali',
    destination: 'Surabaya',
    vehicleType: 'Pick-up',
    status: 'Assigned',
    assignedTransporterId: 'T-002'
  },
  {
    id: 'S-005',
    origin: 'Medan',
    destination: 'Jakarta',
    vehicleType: 'Truk Kontainer',
    status: 'Not Assigned',
    assignedTransporterId: null
  },
  {
    id: 'S-006',
    origin: 'Surabaya',
    destination: 'Bandung',
    vehicleType: 'Truk Bak Terbuka',
    status: 'Not Assigned',
    assignedTransporterId: null
  }
]

export const mockTransporters: Transporter[] = [
  { id: 'T-001', name: 'Budi Santoso', phone: '081234567890' },
  { id: 'T-002', name: 'Andi Wijaya', phone: '082123456789' },
  { id: 'T-003', name: 'Siti Aminah', phone: '083123456789' },
  { id: 'T-004', name: 'Eko Prasetyo', phone: '085123456789' }
]

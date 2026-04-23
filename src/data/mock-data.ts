import type { Shipment, Transporter } from '../types/shipment'
import type { User } from '../types/auth'

export const mockShipments: Shipment[] = [
  { id: 'S-001', origin: 'Jakarta', destination: 'Surabaya', vehicleType: 'Truk Kontainer', status: 'Assigned', assignedTransporterId: 'T-001' },
  { id: 'S-002', origin: 'Bandung', destination: 'Medan', vehicleType: 'Truk Bak Terbuka', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-003', origin: 'Semarang', destination: 'Jakarta', vehicleType: 'Van', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-004', origin: 'Bali', destination: 'Surabaya', vehicleType: 'Pick-up', status: 'Assigned', assignedTransporterId: 'T-002' },
  { id: 'S-005', origin: 'Medan', destination: 'Jakarta', vehicleType: 'Truk Kontainer', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-006', origin: 'Surabaya', destination: 'Bandung', vehicleType: 'Truk Bak Terbuka', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-007', origin: 'Makassar', destination: 'Jakarta', vehicleType: 'Truk Kontainer', status: 'Assigned', assignedTransporterId: 'T-003' },
  { id: 'S-008', origin: 'Yogyakarta', destination: 'Semarang', vehicleType: 'Van', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-009', origin: 'Palembang', destination: 'Jakarta', vehicleType: 'Truk Kontainer', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-010', origin: 'Balikpapan', destination: 'Surabaya', vehicleType: 'Pick-up', status: 'Assigned', assignedTransporterId: 'T-004' },
  { id: 'S-011', origin: 'Jakarta', destination: 'Bandung', vehicleType: 'Motor Kurir', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-012', origin: 'Bandung', destination: 'Yogyakarta', vehicleType: 'Van', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-013', origin: 'Surabaya', destination: 'Bali', vehicleType: 'Truk Bak Terbuka', status: 'Assigned', assignedTransporterId: 'T-001' },
  { id: 'S-014', origin: 'Medan', destination: 'Palembang', vehicleType: 'Truk Kontainer', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-015', origin: 'Semarang', destination: 'Surabaya', vehicleType: 'Pick-up', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-016', origin: 'Makassar', destination: 'Bali', vehicleType: 'Van', status: 'Assigned', assignedTransporterId: 'T-002' },
  { id: 'S-017', origin: 'Bali', destination: 'Lombok', vehicleType: 'Motor Kurir', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-018', origin: 'Yogyakarta', destination: 'Jakarta', vehicleType: 'Truk Bak Terbuka', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-019', origin: 'Jakarta', destination: 'Semarang', vehicleType: 'Truk Kontainer', status: 'Assigned', assignedTransporterId: 'T-003' },
  { id: 'S-020', origin: 'Surabaya', destination: 'Makassar', vehicleType: 'Van', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-021', origin: 'Bandung', destination: 'Jakarta', vehicleType: 'Pick-up', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-022', origin: 'Medan', destination: 'Banda Aceh', vehicleType: 'Truk Bak Terbuka', status: 'Assigned', assignedTransporterId: 'T-004' },
  { id: 'S-023', origin: 'Semarang', destination: 'Bandung', vehicleType: 'Van', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-024', origin: 'Palembang', destination: 'Lampung', vehicleType: 'Motor Kurir', status: 'Not Assigned', assignedTransporterId: null },
  { id: 'S-025', origin: 'Balikpapan', destination: 'Samarinda', vehicleType: 'Pick-up', status: 'Assigned', assignedTransporterId: 'T-001' }
]

export const mockTransporters: Transporter[] = [
  { id: 'T-001', name: 'Budi Santoso', phone: '081234567890' },
  { id: 'T-002', name: 'Andi Wijaya', phone: '082123456789' },
  { id: 'T-003', name: 'Siti Aminah', phone: '083123456789' },
  { id: 'T-004', name: 'Eko Prasetyo', phone: '085123456789' }
]

export const mockUsers: User[] = [
  { id: 'USR-001', username: 'admin', password: 'admin123', role: 'Admin', displayName: 'Administrator' },
  { id: 'USR-002', username: 'viewer', password: 'viewer123', role: 'Viewer', displayName: 'Viewer User' },
]

import { describe, it, expect } from 'vitest'
import { filterShipments, paginateShipments, getTotalPages, getPageNumbers } from '../pagination-service'
import type { Shipment, Transporter } from '../../types/shipment'

describe('PaginationService', () => {
  const mockShipments: Shipment[] = [
    { id: 'S-1', origin: 'Jakarta', destination: 'Surabaya', vehicleType: 'Truk', status: 'Assigned', assignedTransporterId: 'T-1' },
    { id: 'S-2', origin: 'Bandung', destination: 'Medan', vehicleType: 'Van', status: 'Not Assigned', assignedTransporterId: null },
    { id: 'S-3', origin: 'Surabaya', destination: 'Bali', vehicleType: 'Pick-up', status: 'Assigned', assignedTransporterId: 'T-2' }
  ]

  const mockTransporters: Transporter[] = [
    { id: 'T-1', name: 'Budi Santoso', phone: '123' },
    { id: 'T-2', name: 'Andi Wijaya', phone: '456' }
  ]

  describe('filterShipments', () => {
    it('returns all shipments when keyword is empty', () => {
      const result = filterShipments(mockShipments, mockTransporters, '')
      expect(result).toHaveLength(3)
    })

    it('filters by origin (case-insensitive)', () => {
      const result = filterShipments(mockShipments, mockTransporters, 'jakarta')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('S-1')
    })

    it('filters by destination', () => {
      const result = filterShipments(mockShipments, mockTransporters, 'Medan')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('S-2')
    })

    it('filters by transporter name', () => {
      const result = filterShipments(mockShipments, mockTransporters, 'Andi')
      expect(result).toHaveLength(1)
      expect(result[0].id).toBe('S-3')
    })

    it('returns empty array if no match found', () => {
      const result = filterShipments(mockShipments, mockTransporters, 'Ghost')
      expect(result).toHaveLength(0)
    })
  })

  describe('paginateShipments', () => {
    const manyShipments = Array.from({ length: 25 }, (_, i) => ({ id: `S-${i}` } as Shipment))

    it('returns first page items', () => {
      const result = paginateShipments(manyShipments, 1, 10)
      expect(result).toHaveLength(10)
      expect(result[0].id).toBe('S-0')
      expect(result[9].id).toBe('S-9')
    })

    it('returns last page items', () => {
      const result = paginateShipments(manyShipments, 3, 10)
      expect(result).toHaveLength(5)
      expect(result[0].id).toBe('S-20')
    })

    it('returns empty array if page is out of bounds', () => {
      const result = paginateShipments(manyShipments, 4, 10)
      expect(result).toHaveLength(0)
    })
  })

  describe('getTotalPages', () => {
    it('calculates total pages correctly', () => {
      expect(getTotalPages(25, 10)).toBe(3)
      expect(getTotalPages(10, 10)).toBe(1)
      expect(getTotalPages(0, 10)).toBe(1)
      expect(getTotalPages(11, 10)).toBe(2)
    })
  })

  describe('getPageNumbers', () => {
    it('returns simple range for few pages', () => {
      expect(getPageNumbers(1, 3)).toEqual([1, 2, 3])
    })

    it('returns windowed range for many pages', () => {
      expect(getPageNumbers(1, 10)).toEqual([1, 2, 3, 4, 5])
      expect(getPageNumbers(5, 10)).toEqual([3, 4, 5, 6, 7])
      expect(getPageNumbers(10, 10)).toEqual([6, 7, 8, 9, 10])
    })
  })
})

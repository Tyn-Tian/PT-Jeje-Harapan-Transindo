import type { Shipment, Transporter } from '../types/shipment'

export const filterShipments = (
  shipments: Shipment[],
  transporters: Transporter[],
  keyword: string
): Shipment[] => {
  const cleanKeyword = keyword.trim().toLowerCase()
  if (!cleanKeyword) return [...shipments]

  return shipments.filter((s) => {
    const originMatch = s.origin.toLowerCase().includes(cleanKeyword)
    const destMatch = s.destination.toLowerCase().includes(cleanKeyword)
    
    let transporterMatch = false
    if (s.assignedTransporterId) {
      const transporter = transporters.find((t) => t.id === s.assignedTransporterId)
      if (transporter) {
        transporterMatch = transporter.name.toLowerCase().includes(cleanKeyword)
      }
    }

    return originMatch || destMatch || transporterMatch
  })
}

export const paginateShipments = (
  shipments: Shipment[],
  page: number,
  pageSize: number
): Shipment[] => {
  const startIndex = (page - 1) * pageSize
  return shipments.slice(startIndex, startIndex + pageSize)
}

export const getTotalPages = (totalItems: number, pageSize: number): number => {
  return Math.max(1, Math.ceil(totalItems / pageSize))
}

export const getPageNumbers = (currentPage: number, totalPages: number): number[] => {
  const maxPagesToShow = 5
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
  let endPage = startPage + maxPagesToShow - 1

  if (endPage > totalPages) {
    endPage = totalPages
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }

  const pages: number[] = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
}

import { defineStore } from 'pinia'
import type { Shipment, Transporter } from '../types/shipment'
import * as shipmentService from '../services/shipment-service'
import * as paginationService from '../services/pagination-service'
import { MockWebSocket } from '../services/mock-websocket'
import { useNotificationStore } from './notification-store'

let wsInstance: MockWebSocket | null = null

export const useShipmentStore = defineStore('shipment', {
  state: () => ({
    shipments: [] as Shipment[],
    selectedShipment: null as Shipment | null,
    transporters: [] as Transporter[],
    isLoading: false,
    isRealtimeConnected: false,
    searchKeyword: '',
    currentPage: 1,
    pageSize: 10
  }),

  getters: {
    assignedShipments: (state) => state.shipments.filter(s => s.status === 'Assigned'),
    unassignedShipments: (state) => state.shipments.filter(s => s.status === 'Not Assigned'),
    getTransporterById: (state) => (id: string) => state.transporters.find(t => t.id === id),
    
    filteredShipments: (state) => {
      return paginationService.filterShipments(state.shipments, state.transporters, state.searchKeyword)
    },
    paginatedShipments(): Shipment[] {
      return paginationService.paginateShipments(
        this.filteredShipments,
        this.currentPage,
        this.pageSize
      )
    },
    totalPages(): number {
      return paginationService.getTotalPages(this.filteredShipments.length, this.pageSize)
    },
    pageNumbers(): number[] {
      return paginationService.getPageNumbers(this.currentPage, this.totalPages)
    }
  },

  actions: {
    async loadShipments() {
      this.isLoading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        this.shipments = shipmentService.fetchAllShipments()
      } catch (error) {
        const notificationStore = useNotificationStore()
        notificationStore.push('Gagal mengambil data shipment', 'error')
      } finally {
        this.isLoading = false
      }
    },

    async loadTransporters() {
      try {
        this.transporters = shipmentService.fetchAllTransporters()
      } catch (error) {
        const notificationStore = useNotificationStore()
        notificationStore.push('Gagal mengambil data transporter', 'error')
      }
    },

    selectShipment(id: string) {
      const shipment = shipmentService.fetchShipmentById(id)
      this.selectedShipment = shipment || null
    },

    async assignTransporter(shipmentId: string, transporterId: string) {
      this.isLoading = true
      const notificationStore = useNotificationStore()
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        const updated = shipmentService.assignTransporter(shipmentId, transporterId)
        
        this.updateShipmentInState(updated)
        notificationStore.push('Transporter berhasil ditugaskan', 'success')
      } catch (error: any) {
        notificationStore.push(error.message || 'Gagal menugaskan transporter', 'error')
      } finally {
        this.isLoading = false
      }
    },

    startRealtimeUpdates() {
      if (this.isRealtimeConnected || this.shipments.length === 0) return

      wsInstance = new MockWebSocket()
      wsInstance.onMessage((payload) => {
        const shipment = this.shipments.find(s => s.id === payload.shipmentId)
        if (shipment) {
          const updated: Shipment = {
            ...shipment,
            status: payload.newStatus,
            assignedTransporterId: payload.assignedTransporterId
          }
          this.updateShipmentInState(updated)
        }
      })

      const ids = this.shipments.map(s => s.id)
      wsInstance.connect(ids)
      this.isRealtimeConnected = true
    },

    stopRealtimeUpdates() {
      if (wsInstance) {
        wsInstance.disconnect()
        wsInstance = null
      }
      this.isRealtimeConnected = false
    },

    updateShipmentInState(updated: Shipment) {
      const index = this.shipments.findIndex(s => s.id === updated.id)
      if (index !== -1) {
        this.shipments[index] = updated
      }
      if (this.selectedShipment?.id === updated.id) {
        this.selectedShipment = updated
      }
    },

    setSearchKeyword(keyword: string) {
      this.searchKeyword = keyword
      this.currentPage = 1
    },

    setCurrentPage(page: number) {
      this.currentPage = page
    }
  }
})

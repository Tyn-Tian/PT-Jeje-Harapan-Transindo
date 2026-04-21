import { defineStore } from 'pinia'
import type { Shipment, Transporter } from '../types/shipment'
import * as shipmentService from '../services/shipment-service'
import { MockWebSocket } from '../services/mock-websocket'

let wsInstance: MockWebSocket | null = null

export const useShipmentStore = defineStore('shipment', {
  state: () => ({
    shipments: [] as Shipment[],
    selectedShipment: null as Shipment | null,
    transporters: [] as Transporter[],
    isLoading: false,
    errorMessage: null as string | null,
    successMessage: null as string | null,
    isRealtimeConnected: false
  }),

  getters: {
    assignedShipments: (state) => state.shipments.filter(s => s.status === 'Assigned'),
    unassignedShipments: (state) => state.shipments.filter(s => s.status === 'Not Assigned'),
    getTransporterById: (state) => (id: string) => state.transporters.find(t => t.id === id)
  },

  actions: {
    async loadShipments() {
      this.isLoading = true
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        this.shipments = shipmentService.fetchAllShipments()
      } catch (error) {
        this.errorMessage = 'Gagal mengambil data shipment'
      } finally {
        this.isLoading = false
      }
    },

    async loadTransporters() {
      try {
        this.transporters = shipmentService.fetchAllTransporters()
      } catch (error) {
        this.errorMessage = 'Gagal mengambil data transporter'
      }
    },

    selectShipment(id: string) {
      const shipment = shipmentService.fetchShipmentById(id)
      this.selectedShipment = shipment || null
    },

    async assignTransporter(shipmentId: string, transporterId: string) {
      this.isLoading = true
      this.clearMessages()
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        const updated = shipmentService.assignTransporter(shipmentId, transporterId)
        
        this.updateShipmentInState(updated)
        this.successMessage = 'Transporter berhasil ditugaskan'
      } catch (error: any) {
        this.errorMessage = error.message || 'Gagal menugaskan transporter'
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

    clearMessages() {
      this.successMessage = null
      this.errorMessage = null
    }
  }
})

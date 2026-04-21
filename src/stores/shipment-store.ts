import { defineStore } from 'pinia'
import type { Shipment, Transporter } from '../types/shipment'
import * as shipmentService from '../services/shipment-service'

export const useShipmentStore = defineStore('shipment', {
  state: () => ({
    shipments: [] as Shipment[],
    selectedShipment: null as Shipment | null,
    transporters: [] as Transporter[],
    isLoading: false,
    errorMessage: null as string | null,
    successMessage: null as string | null
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
        // Simulate async delay
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
        
        // Update local state
        const index = this.shipments.findIndex(s => s.id === shipmentId)
        if (index !== -1) {
          this.shipments[index] = updated
        }
        if (this.selectedShipment?.id === shipmentId) {
          this.selectedShipment = updated
        }
        
        this.successMessage = 'Transporter berhasil ditugaskan'
      } catch (error: any) {
        this.errorMessage = error.message || 'Gagal menugaskan transporter'
      } finally {
        this.isLoading = false
      }
    },

    clearMessages() {
      this.successMessage = null
      this.errorMessage = null
    }
  }
})

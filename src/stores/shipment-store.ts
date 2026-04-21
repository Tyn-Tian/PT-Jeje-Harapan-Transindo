import { defineStore } from 'pinia'

export const useShipmentStore = defineStore('shipment', {
  state: () => ({
    shipments: [] as any[],
    loading: false,
    error: null as string | null
  }),
  actions: {
    // Actions will be implemented in the next issues
  }
})

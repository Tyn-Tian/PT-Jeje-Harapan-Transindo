import { computed } from 'vue'
import { useShipmentStore } from '../stores/shipment-store'

export const useShipment = () => {
  const store = useShipmentStore()

  // State (computed from store)
  const shipments = computed(() => store.shipments)
  const selectedShipment = computed(() => store.selectedShipment)
  const transporters = computed(() => store.transporters)
  const isLoading = computed(() => store.isLoading)
  const isRealtimeConnected = computed(() => store.isRealtimeConnected)
  const searchKeyword = computed(() => store.searchKeyword)
  const currentPage = computed(() => store.currentPage)
  const pageSize = computed(() => store.pageSize)
  
  const filteredShipments = computed(() => store.filteredShipments)
  const paginatedShipments = computed(() => store.paginatedShipments)
  const totalPages = computed(() => store.totalPages)
  const pageNumbers = computed(() => store.pageNumbers)

  // Actions (wrapper from store actions)
  const loadShipments = () => store.loadShipments()
  const loadTransporters = () => store.loadTransporters()
  const selectShipment = (id: string) => store.selectShipment(id)
  const assignTransporter = (shipmentId: string, transporterId: string) => 
    store.assignTransporter(shipmentId, transporterId)
  const startRealtimeUpdates = () => store.startRealtimeUpdates()
  const stopRealtimeUpdates = () => store.stopRealtimeUpdates()
  const setSearchKeyword = (keyword: string) => store.setSearchKeyword(keyword)
  const setCurrentPage = (page: number) => store.setCurrentPage(page)

  const getTransporterById = (id: string) => store.getTransporterById(id)

  return {
    // State
    shipments,
    selectedShipment,
    transporters,
    isLoading,
    isRealtimeConnected,
    searchKeyword,
    currentPage,
    pageSize,
    filteredShipments,
    paginatedShipments,
    totalPages,
    pageNumbers,

    // Actions
    loadShipments,
    loadTransporters,
    selectShipment,
    assignTransporter,
    startRealtimeUpdates,
    stopRealtimeUpdates,
    setSearchKeyword,
    setCurrentPage,
    getTransporterById
  }
}

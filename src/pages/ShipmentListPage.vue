<template>
  <div class="px-4 py-8 max-w-7xl mx-auto min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 class="text-lg font-medium text-gray-900">Daftar Shipment</h1>
      <div v-if="isRealtimeConnected" class="flex items-center gap-1.5 px-3 py-1 bg-white border border-black/10 rounded-full shadow-sm">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
        </span>
        <span class="text-xs text-gray-600">Live</span>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="mb-6">
      <AppInput 
        :model-value="searchKeyword"
        @update:model-value="setSearchKeyword"
        placeholder="Cari origin, tujuan, atau transporter..."
      >
        <template #prefix>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </template>
      </AppInput>
    </div>

    <!-- Desktop Table -->
    <div class="hidden md:block">
      <AppTable 
        :columns="columns" 
        :rows="paginatedShipments" 
        :loading="isLoading"
        empty-message="Tidak ada shipment yang cocok dengan pencarian Anda"
      >
        <template #cell-no="{ index }">
          <span class="text-gray-400">{{ (currentPage - 1) * pageSize + index + 1 }}</span>
        </template>
        
        <template #cell-id="{ value }">
          <span class="font-mono text-xs text-gray-600">{{ value }}</span>
        </template>

        <template #cell-route="{ row }">
          {{ row.origin }} 
          <span class="text-gray-400 mx-1">→</span> 
          {{ row.destination }}
        </template>

        <template #cell-status="{ value }">
          <StatusBadge :status="value" />
        </template>

        <template #actions="{ row }">
          <BaseButton size="sm" @click="viewDetail(row.id)">
            Lihat Detail
          </BaseButton>
        </template>
      </AppTable>
    </div>

    <!-- Mobile Card List -->
    <div v-if="!isLoading && paginatedShipments.length > 0" class="md:hidden space-y-2">
      <div v-for="shipment in paginatedShipments" :key="shipment.id" 
           class="bg-white p-4 rounded-xl border border-black/15 shadow-sm space-y-4">
        <div class="flex justify-between items-start">
          <span class="font-mono text-xs text-gray-600">{{ shipment.id }}</span>
          <StatusBadge :status="shipment.status" />
        </div>
        <div>
          <div class="text-sm font-medium text-gray-900">
            {{ shipment.origin }} <span class="text-gray-400 mx-1">→</span> {{ shipment.destination }}
          </div>
          <div class="text-xs text-gray-600 mt-0.5">{{ shipment.vehicleType }}</div>
        </div>
        <BaseButton class="w-full" size="sm" @click="viewDetail(shipment.id)">
          Lihat Detail
        </BaseButton>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div v-if="!isLoading && paginatedShipments.length > 0" class="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="text-[11px] text-gray-500 font-medium tracking-tight">
        Menampilkan {{ (currentPage - 1) * pageSize + 1 }}–{{ Math.min(currentPage * pageSize, filteredShipments.length) }} dari {{ filteredShipments.length }} shipment
      </div>
      
      <div class="flex items-center gap-1.5">
        <BaseButton 
          variant="secondary" 
          size="sm" 
          :disabled="currentPage === 1"
          @click="setCurrentPage(currentPage - 1)"
          class="!px-3"
        >
          ← Prev
        </BaseButton>
        
        <div class="flex items-center gap-1">
          <button 
            v-for="page in pageNumbers" 
            :key="page"
            @click="setCurrentPage(page)"
            class="min-w-[32px] h-8 flex items-center justify-center text-xs font-medium rounded-lg transition-all"
            :class="currentPage === page ? 'bg-gray-900 text-gray-50' : 'text-gray-600 hover:bg-gray-100'"
          >
            {{ page }}
          </button>
        </div>

        <BaseButton 
          variant="secondary" 
          size="sm" 
          :disabled="currentPage === totalPages"
          @click="setCurrentPage(currentPage + 1)"
          class="!px-3"
        >
          Next →
        </BaseButton>
      </div>
    </div>

    <!-- Empty State (Mobile only or Fallback) -->
    <div v-if="!isLoading && paginatedShipments.length === 0" 
         class="md:hidden flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-black/15">
      <span class="text-3xl mb-4">🔍</span>
      <p class="text-sm text-gray-600 mb-4 text-center">
        {{ searchKeyword ? 'Tidak ada shipment yang cocok dengan pencarian Anda' : 'Tidak ada data shipment ditemukan' }}
      </p>
      <BaseButton v-if="searchKeyword" variant="secondary" size="sm" @click="setSearchKeyword('')">
        Hapus pencarian
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useShipment } from '../composables/useShipment'
import AppTable, { type TableColumn } from '../components/shared/AppTable.vue'
import AppInput from '../components/shared/AppInput.vue'
import BaseButton from '../components/shared/BaseButton.vue'
import StatusBadge from '../components/shared/StatusBadge.vue'

const router = useRouter()
const {
  isLoading,
  isRealtimeConnected,
  searchKeyword,
  currentPage,
  pageSize,
  filteredShipments,
  paginatedShipments,
  totalPages,
  pageNumbers,
  loadShipments,
  loadTransporters,
  startRealtimeUpdates,
  stopRealtimeUpdates,
  setSearchKeyword,
  setCurrentPage
} = useShipment()

const columns: TableColumn[] = [
  { key: 'no', label: 'No', width: '60px', align: 'center' },
  { key: 'id', label: 'Shipment ID' },
  { key: 'route', label: 'Rute' },
  { key: 'vehicleType', label: 'Kendaraan' },
  { key: 'status', label: 'Status' }
]

onMounted(async () => {
  await loadShipments()
  await loadTransporters()
  startRealtimeUpdates()
})

onUnmounted(() => {
  stopRealtimeUpdates()
})

const viewDetail = (id: string) => {
  router.push(`/shipments/${id}`)
}
</script>

<style scoped>
.border {
  border-width: 0.5px;
}
</style>

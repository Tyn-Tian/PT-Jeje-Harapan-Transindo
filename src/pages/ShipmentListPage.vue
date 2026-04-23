<template>
  <div class="px-4 py-8 max-w-7xl mx-auto min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 class="text-lg font-medium text-gray-900">Daftar Shipment</h1>
      <div v-if="store.isRealtimeConnected" class="flex items-center gap-1.5 px-3 py-1 bg-white border border-black/10 rounded-full shadow-sm">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
        </span>
        <span class="text-xs text-gray-600">Live</span>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="mb-6 relative">
      <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input 
        type="text" 
        :value="store.searchKeyword"
        @input="(e) => store.setSearchKeyword((e.target as HTMLInputElement).value)"
        class="w-full px-3 py-2.5 pl-9 text-sm border border-black/20 rounded-lg outline-none transition-all focus:ring-1 focus:ring-black/30 shadow-sm"
        placeholder="Cari origin, tujuan, atau transporter..."
      />
      <button 
        v-if="store.searchKeyword"
        @click="store.setSearchKeyword('')"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
      >
        <span class="text-xs">✕</span>
      </button>
    </div>

    <!-- Desktop Table -->
    <div v-if="!isLoading && paginatedShipments.length > 0" class="hidden md:block bg-white rounded-xl border border-black/15 overflow-hidden shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-white border-b border-black/10">
            <th class="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-600 w-12 text-center">No</th>
            <th class="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-600">Shipment ID</th>
            <th class="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-600">Rute</th>
            <th class="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-600">Kendaraan</th>
            <th class="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-600">Status</th>
            <th class="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-600 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(shipment, index) in paginatedShipments" :key="shipment.id" 
              class="border-b border-black/5 last:border-0 hover:bg-gray-50 transition-colors">
            <td class="px-4 py-3 text-sm text-gray-400 text-center">{{ (store.currentPage - 1) * store.pageSize + index + 1 }}</td>
            <td class="px-4 py-3 font-mono text-xs text-gray-600">{{ shipment.id }}</td>
            <td class="px-4 py-3 text-sm text-gray-900">
              {{ shipment.origin }} 
              <span class="text-gray-400 mx-1">→</span> 
              {{ shipment.destination }}
            </td>
            <td class="px-4 py-3 text-sm text-gray-600">{{ shipment.vehicleType }}</td>
            <td class="px-4 py-3">
              <StatusBadge :status="shipment.status" />
            </td>
            <td class="px-4 py-3 text-right">
              <BaseButton size="sm" @click="viewDetail(shipment.id)">
                Lihat Detail
              </BaseButton>
            </td>
          </tr>
        </tbody>
      </table>
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
        Menampilkan {{ (store.currentPage - 1) * store.pageSize + 1 }}–{{ Math.min(store.currentPage * store.pageSize, store.filteredShipments.length) }} dari {{ store.filteredShipments.length }} shipment
      </div>
      
      <div class="flex items-center gap-1.5">
        <BaseButton 
          variant="secondary" 
          size="sm" 
          :disabled="store.currentPage === 1"
          @click="store.setCurrentPage(store.currentPage - 1)"
          class="!px-3"
        >
          ← Prev
        </BaseButton>
        
        <div class="flex items-center gap-1">
          <button 
            v-for="page in store.pageNumbers" 
            :key="page"
            @click="store.setCurrentPage(page)"
            class="min-w-[32px] h-8 flex items-center justify-center text-xs font-medium rounded-lg transition-all"
            :class="store.currentPage === page ? 'bg-gray-900 text-gray-50' : 'text-gray-600 hover:bg-gray-100'"
          >
            {{ page }}
          </button>
        </div>

        <BaseButton 
          variant="secondary" 
          size="sm" 
          :disabled="store.currentPage === store.totalPages"
          @click="store.setCurrentPage(store.currentPage + 1)"
          class="!px-3"
        >
          Next →
        </BaseButton>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="space-y-3">
      <div v-for="i in 10" :key="i" class="h-16 bg-gray-100/50 animate-pulse rounded-xl border border-black/5"></div>
    </div>

    <!-- Empty State -->
    <div v-if="!isLoading && paginatedShipments.length === 0" 
         class="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-black/15">
      <span class="text-3xl mb-4">🔍</span>
      <p class="text-sm text-gray-600 mb-4 text-center">
        {{ store.searchKeyword ? 'Tidak ada shipment yang cocok dengan pencarian Anda' : 'Tidak ada data shipment ditemukan' }}
      </p>
      <BaseButton v-if="store.searchKeyword" variant="secondary" size="sm" @click="store.setSearchKeyword('')">
        Hapus pencarian
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useShipmentStore } from '../stores/shipment-store'
import BaseButton from '../components/shared/BaseButton.vue'
import StatusBadge from '../components/shared/StatusBadge.vue'

const router = useRouter()
const store = useShipmentStore()

const paginatedShipments = computed(() => store.paginatedShipments)
const isLoading = computed(() => store.isLoading)

onMounted(async () => {
  await store.loadShipments()
  await store.loadTransporters()
  store.startRealtimeUpdates()
})

onUnmounted(() => {
  store.stopRealtimeUpdates()
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

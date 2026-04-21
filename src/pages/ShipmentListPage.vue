<template>
  <div class="px-4 py-8 max-w-7xl mx-auto min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-lg font-medium text-gray-900">Daftar Shipment</h1>
      <div v-if="store.isRealtimeConnected" class="flex items-center gap-1.5 px-3 py-1 bg-white border border-black/10 rounded-full shadow-sm">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-600 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
        </span>
        <span class="text-xs text-gray-600">Live</span>
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="hidden md:block bg-white rounded-xl border border-black/15 overflow-hidden shadow-sm">
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
        <tbody v-if="!isLoading && shipments.length > 0">
          <tr v-for="(shipment, index) in shipments" :key="shipment.id" 
              class="border-b border-black/5 last:border-0 hover:bg-gray-50 transition-colors">
            <td class="px-4 py-3 text-sm text-gray-400 text-center">{{ index + 1 }}</td>
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
    <div class="md:hidden space-y-2">
      <div v-for="shipment in shipments" :key="shipment.id" 
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

    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="space-y-3">
      <div v-for="i in 4" :key="i" class="h-16 bg-gray-100/50 animate-pulse rounded-xl border border-black/5"></div>
    </div>

    <!-- Empty State -->
    <div v-if="!isLoading && shipments.length === 0" 
         class="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-black/15">
      <span class="text-3xl mb-4">📦</span>
      <p class="text-sm text-gray-600">Tidak ada data shipment ditemukan</p>
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

const shipments = computed(() => store.shipments)
const isLoading = computed(() => store.isLoading)

onMounted(async () => {
  await store.loadShipments()
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

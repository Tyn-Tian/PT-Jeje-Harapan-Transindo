<template>
  <div class="px-4 py-8 max-w-7xl mx-auto min-h-screen bg-[#F1EFE8]">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-lg font-medium text-[#2C2C2A]">Daftar Shipment</h1>
      <div class="flex items-center gap-2">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span class="text-[11px] font-medium uppercase tracking-wider text-[#5F5E5A]">Live Update</span>
      </div>
    </div>

    <!-- Desktop Table -->
    <div class="hidden md:block bg-white rounded-xl border border-black/15 overflow-hidden shadow-sm">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-white border-b border-black/15">
            <th class="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-[#5F5E5A] w-12">No</th>
            <th class="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-[#5F5E5A]">Shipment ID</th>
            <th class="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-[#5F5E5A]">Rute</th>
            <th class="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-[#5F5E5A]">Kendaraan</th>
            <th class="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-[#5F5E5A]">Status</th>
            <th class="px-6 py-4 text-[11px] font-medium uppercase tracking-wider text-[#5F5E5A] text-right">Aksi</th>
          </tr>
        </thead>
        <tbody v-if="!isLoading && shipments.length > 0">
          <tr v-for="(shipment, index) in shipments" :key="shipment.id" 
              class="border-b border-black/10 last:border-0 hover:bg-[#F1EFE8] transition-colors group">
            <td class="px-6 py-4 text-sm text-[#888780]">{{ index + 1 }}</td>
            <td class="px-6 py-4 font-mono text-xs text-[#5F5E5A]">{{ shipment.id }}</td>
            <td class="px-6 py-4 text-sm text-[#2C2C2A]">
              {{ shipment.origin }} 
              <span class="text-[#888780] mx-1">→</span> 
              {{ shipment.destination }}
            </td>
            <td class="px-6 py-4 text-sm text-[#5F5E5A]">{{ shipment.vehicleType }}</td>
            <td class="px-6 py-4">
              <span :class="[
                'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
                shipment.status === 'Assigned' 
                  ? 'bg-[#EAF3DE] text-[#27500A] border-[#C3DDA0]' 
                  : 'bg-[#FAEEDA] text-[#633806] border-[#F0D8B3]'
              ]">
                <span :class="[
                  'h-1.5 w-1.5 rounded-full',
                  shipment.status === 'Assigned' ? 'bg-[#3B6D11]' : 'bg-[#854F0B]'
                ]"></span>
                {{ shipment.status }}
              </span>
            </td>
            <td class="px-6 py-4 text-right">
              <button @click="viewDetail(shipment.id)" 
                      class="px-3 py-1.5 bg-white border border-black/15 rounded-lg text-xs font-medium text-[#2C2C2A] hover:bg-[#F1EFE8] hover:border-black/30 transition-all">
                Lihat Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Card List -->
    <div class="md:hidden space-y-4">
      <div v-for="shipment in shipments" :key="shipment.id" 
           class="bg-white p-5 rounded-xl border border-black/15 shadow-sm space-y-3">
        <div class="flex justify-between items-start">
          <span class="font-mono text-xs text-[#5F5E5A]">{{ shipment.id }}</span>
          <span :class="[
            'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border',
            shipment.status === 'Assigned' 
              ? 'bg-[#EAF3DE] text-[#27500A] border-[#C3DDA0]' 
              : 'bg-[#FAEEDA] text-[#633806] border-[#F0D8B3]'
          ]">
            <span :class="[
              'h-1.5 w-1.5 rounded-full',
              shipment.status === 'Assigned' ? 'bg-[#3B6D11]' : 'bg-[#854F0B]'
            ]"></span>
            {{ shipment.status }}
          </span>
        </div>
        <div>
          <div class="text-sm font-medium text-[#2C2C2A]">
            {{ shipment.origin }} <span class="text-[#888780] mx-1">→</span> {{ shipment.destination }}
          </div>
          <div class="text-xs text-[#5F5E5A] mt-1">{{ shipment.vehicleType }}</div>
        </div>
        <button @click="viewDetail(shipment.id)" 
                class="w-full py-2.5 bg-white border border-black/15 rounded-lg text-sm font-medium text-[#2C2C2A] hover:bg-[#F1EFE8] active:bg-[#E8E6DD] transition-all">
          Lihat Detail
        </button>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="space-y-4">
      <div v-for="i in 4" :key="i" class="h-16 bg-[#D3D1C7]/30 animate-pulse rounded-xl border border-black/5"></div>
    </div>

    <!-- Empty State -->
    <div v-if="!isLoading && shipments.length === 0" 
         class="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-black/15">
      <span class="text-3xl mb-4">📦</span>
      <p class="text-sm text-[#5F5E5A]">Tidak ada data shipment ditemukan</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useShipmentStore } from '../stores/shipment-store'

const router = useRouter()
const store = useShipmentStore()

const shipments = computed(() => store.shipments)
const isLoading = computed(() => store.isLoading)

onMounted(async () => {
  await store.loadShipments()
})

const viewDetail = (id: string) => {
  router.push(`/shipments/${id}`)
}
</script>

<style scoped>
/* Ensure 0.5px border weight where possible */
.border {
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.15);
}

@media (min-resolution: 2dppx) {
  .border {
    border-width: 0.5px;
  }
}
</style>

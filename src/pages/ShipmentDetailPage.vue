<template>
  <div class="px-4 py-8 max-w-2xl mx-auto min-h-screen bg-gray-50">
    <!-- Navigation -->
    <button @click="goBack" class="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors group">
      <span class="group-hover:-translate-x-1 transition-transform">←</span>
      Kembali ke daftar
    </button>

    <div v-if="shipment" class="space-y-6">
      <!-- Title & Status -->
      <div class="flex justify-between items-center bg-white p-6 rounded-xl border border-black/15 shadow-sm">
        <div>
          <h1 class="text-[11px] font-medium uppercase tracking-wider text-gray-400 mb-1">Shipment ID</h1>
          <p class="font-mono text-base text-gray-900">{{ shipment.id }}</p>
        </div>
        <StatusBadge :status="shipment.status" />
      </div>

      <!-- Information Card -->
      <div class="bg-white rounded-xl border border-black/15 shadow-sm overflow-hidden">
        <div class="p-4 bg-gray-50/50 border-b border-black/10">
          <h2 class="text-sm font-medium text-gray-900">Informasi detail</h2>
        </div>
        <div class="px-6 py-2 space-y-0">
          <div class="flex justify-between items-center py-2.5 border-b border-black/10">
            <span class="text-sm text-gray-600">Rute</span>
            <span class="text-sm font-medium text-gray-900">
              {{ shipment.origin }} <span class="text-gray-400 mx-1">→</span> {{ shipment.destination }}
            </span>
          </div>
          <div class="flex justify-between items-center py-2.5 border-b border-black/10">
            <span class="text-sm text-gray-600">Jenis kendaraan</span>
            <span class="text-sm font-medium text-gray-900">{{ shipment.vehicleType }}</span>
          </div>
          <div class="flex justify-between items-center py-2.5 last:border-0">
            <span class="text-sm text-gray-600">Transporter</span>
            <div v-if="assignedTransporter" class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center text-purple-800 text-[11px] font-medium border border-black/5">
                {{ getInitials(assignedTransporter.name) }}
              </div>
              <span class="text-sm font-medium text-gray-900">{{ assignedTransporter.name }}</span>
            </div>
            <span v-else class="text-sm text-gray-400 italic">Belum ditugaskan</span>
          </div>
        </div>
      </div>

      <!-- Assignment Form -->
      <div class="bg-white p-6 rounded-xl border border-black/15 shadow-sm space-y-4">
        <h2 class="text-sm font-medium text-gray-900">Assign transporter</h2>
        <div class="space-y-1.5">
          <label for="transporter" class="text-[11px] font-medium uppercase tracking-wider text-gray-600">Pilih transporter</label>
          <div class="relative">
            <select 
              id="transporter"
              v-model="selectedTransporterId"
              class="w-full bg-gray-50 border border-black/15 rounded-lg px-4 py-2.5 text-sm text-gray-900 appearance-none focus:outline-none focus:border-black/30 transition-all cursor-pointer"
              :disabled="isLoading"
            >
              <option value="" disabled>Pilih transporter...</option>
              <option v-for="t in transporters" :key="t.id" :value="t.id">
                {{ t.name }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
              <span class="text-[10px]">▼</span>
            </div>
          </div>
          <p v-if="validationError" class="text-xs text-red-600 mt-1 flex items-center gap-1">
            <span class="text-[14px]">⚠️</span> {{ validationError }}
          </p>
        </div>
        
        <BaseButton 
          variant="primary"
          class="w-full py-3"
          :loading="isLoading"
          @click="handleAssign"
        >
          Assign Transporter
        </BaseButton>
      </div>
    </div>

    <!-- Notifications -->
    <NotificationToast 
      :visible="!!store.successMessage"
      :message="store.successMessage || ''"
      type="success"
      @close="store.clearMessages"
    />
    <NotificationToast 
      :visible="!!store.errorMessage"
      :message="store.errorMessage || ''"
      type="error"
      @close="store.clearMessages"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShipmentStore } from '../stores/shipment-store'
import BaseButton from '../components/shared/BaseButton.vue'
import StatusBadge from '../components/shared/StatusBadge.vue'
import NotificationToast from '../components/shared/NotificationToast.vue'

const route = useRoute()
const router = useRouter()
const store = useShipmentStore()

const selectedTransporterId = ref('')
const validationError = ref('')

const shipment = computed(() => store.selectedShipment)
const transporters = computed(() => store.transporters)
const isLoading = computed(() => store.isLoading)
const assignedTransporter = computed(() => {
  if (!shipment.value?.assignedTransporterId) return null
  return store.getTransporterById(shipment.value.assignedTransporterId)
})

onMounted(async () => {
  const id = route.params.id as string
  store.selectShipment(id)
  await store.loadTransporters()
  
  if (!shipment.value) {
    router.push('/shipments')
  }
})

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

const handleAssign = async () => {
  if (!selectedTransporterId.value) {
    validationError.value = 'Pilih transporter terlebih dahulu'
    return
  }
  
  validationError.value = ''
  await store.assignTransporter(shipment.value!.id, selectedTransporterId.value)
}

const goBack = () => {
  router.push('/shipments')
}

watch(selectedTransporterId, () => {
  if (selectedTransporterId.value) validationError.value = ''
})
</script>

<style scoped>
.border {
  border-width: 0.5px;
}
</style>

<template>
  <div class="px-4 py-8 max-w-2xl mx-auto min-h-screen bg-[#F1EFE8]">
    <!-- Navigation -->
    <button @click="goBack" class="flex items-center gap-2 text-sm text-[#5F5E5A] hover:text-[#2C2C2A] mb-6 transition-colors group">
      <span class="group-hover:-translate-x-1 transition-transform">←</span>
      Kembali ke Daftar
    </button>

    <div v-if="shipment" class="space-y-6">
      <!-- Title & Status -->
      <div class="flex justify-between items-center bg-white p-6 rounded-xl border border-black/15 shadow-sm">
        <div>
          <h1 class="text-[11px] font-medium uppercase tracking-wider text-[#888780] mb-1">Shipment ID</h1>
          <p class="font-mono text-base text-[#2C2C2A]">{{ shipment.id }}</p>
        </div>
        <span :class="[
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border',
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

      <!-- Information Card -->
      <div class="bg-white rounded-xl border border-black/15 shadow-sm overflow-hidden">
        <div class="p-4 bg-[#F1EFE8]/50 border-b border-black/10">
          <h2 class="text-sm font-medium text-[#2C2C2A]">Informasi Detail</h2>
        </div>
        <div class="p-6 space-y-4">
          <div class="flex justify-between items-center py-2 border-b border-black/5 last:border-0">
            <span class="text-sm text-[#5F5E5A]">Rute</span>
            <span class="text-sm font-medium text-[#2C2C2A]">
              {{ shipment.origin }} <span class="text-[#888780] mx-1">→</span> {{ shipment.destination }}
            </span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-black/5 last:border-0">
            <span class="text-sm text-[#5F5E5A]">Jenis Kendaraan</span>
            <span class="text-sm font-medium text-[#2C2C2A]">{{ shipment.vehicleType }}</span>
          </div>
          <div class="flex justify-between items-center py-2 border-b border-black/5 last:border-0">
            <span class="text-sm text-[#5F5E5A]">Transporter</span>
            <div v-if="assignedTransporter" class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[#3C3489] text-[11px] font-medium border border-[#D5D2FD]">
                {{ getInitials(assignedTransporter.name) }}
              </div>
              <span class="text-sm font-medium text-[#2C2C2A]">{{ assignedTransporter.name }}</span>
            </div>
            <span v-else class="text-sm text-[#888780] italic">Belum ditugaskan</span>
          </div>
        </div>
      </div>

      <!-- Assignment Form -->
      <div class="bg-white p-6 rounded-xl border border-black/15 shadow-sm space-y-4">
        <h2 class="text-sm font-medium text-[#2C2C2A]">Assign Transporter</h2>
        <div class="space-y-1.5">
          <label for="transporter" class="text-[11px] font-medium uppercase tracking-wider text-[#5F5E5A]">Pilih Transporter</label>
          <div class="relative">
            <select 
              id="transporter"
              v-model="selectedTransporterId"
              class="w-full bg-[#F1EFE8] border border-black/15 rounded-lg px-4 py-2.5 text-sm text-[#2C2C2A] appearance-none focus:outline-none focus:border-black/30 transition-all cursor-pointer"
              :disabled="isLoading"
            >
              <option value="" disabled>Pilih transporter...</option>
              <option v-for="t in transporters" :key="t.id" :value="t.id">
                {{ t.name }}
              </option>
            </select>
            <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#888780]">
              <span class="text-[10px]">▼</span>
            </div>
          </div>
          <p v-if="validationError" class="text-xs text-red-700 mt-1 flex items-center gap-1">
            <span class="text-[14px]">⚠️</span> {{ validationError }}
          </p>
        </div>
        
        <button 
          @click="handleAssign"
          :disabled="isLoading"
          class="w-full py-3 bg-[#2C2C2A] text-white rounded-lg text-sm font-medium hover:bg-[#1A1A18] active:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <span v-if="isLoading">Memproses...</span>
          <span v-else>Assign Transporter</span>
        </button>
      </div>
    </div>

    <!-- Notifications -->
    <Transition name="fade">
      <div v-if="store.successMessage" class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#EAF3DE] border border-[#C3DDA0] px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
        <div class="h-5 w-5 rounded-full bg-[#3B6D11] flex items-center justify-center text-white text-[10px]">✓</div>
        <span class="text-sm font-medium text-[#27500A]">{{ store.successMessage }}</span>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="store.errorMessage" class="fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-50 border border-red-100 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3">
        <div class="h-5 w-5 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px]">!</div>
        <span class="text-sm font-medium text-red-800">{{ store.errorMessage }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShipmentStore } from '../stores/shipment-store'

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
  
  if (store.successMessage) {
    setTimeout(() => store.clearMessages(), 3000)
  }
}

const goBack = () => {
  router.push('/shipments')
}

// Clear error on input change
watch(selectedTransporterId, () => {
  if (selectedTransporterId.value) validationError.value = ''
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}
</style>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth-store'
import BaseButton from './BaseButton.vue'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="bg-white border-b border-black/10 px-6 py-3 flex justify-between items-center sticky top-0 z-50">
    <div class="flex items-center gap-4">
      <h1 class="text-sm font-semibold text-gray-900 tracking-tight">Shipment Tracker</h1>
      <span class="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded font-medium uppercase">{{ authStore.currentSession?.role }}</span>
    </div>
    
    <div class="flex items-center gap-4">
      <div class="text-right hidden sm:block">
        <p class="text-xs font-medium text-gray-900">{{ authStore.displayName }}</p>
        <p class="text-[10px] text-gray-500">{{ authStore.currentSession?.role }} Account</p>
      </div>
      
      <div class="w-px h-8 bg-black/5 hidden sm:block"></div>
      
      <BaseButton variant="secondary" size="sm" @click="handleLogout">
        Keluar
      </BaseButton>
    </div>
  </header>
</template>

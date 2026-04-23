<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader v-if="showNavigation" />
    <main :class="{ 'max-w-7xl mx-auto p-4 sm:p-6 lg:p-8': showNavigation }">
      <router-view></router-view>
    </main>
    <GlobalNotification />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth-store'
import AppHeader from './components/shared/AppHeader.vue'
import GlobalNotification from './components/GlobalNotification.vue'

const route = useRoute()
const authStore = useAuthStore()

const showNavigation = computed(() => {
  return authStore.isAuthenticated && route.name !== 'Login'
})
</script>

<style>
/* Global styles are in style.css */
</style>

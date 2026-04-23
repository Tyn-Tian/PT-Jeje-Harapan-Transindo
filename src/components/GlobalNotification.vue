<template>
  <div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
    <TransitionGroup name="notification">
      <div 
        v-for="n in store.notifications" 
        :key="n.id"
        class="pointer-events-auto"
      >
        <NotificationToast 
          :message="n.message" 
          :type="n.type === 'info' ? 'success' : n.type"
          @close="store.dismiss(n.id)"
        />
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useNotificationStore } from '../stores/notification-store'
import NotificationToast from './shared/NotificationToast.vue'

const store = useNotificationStore()
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.notification-move {
  transition: transform 0.3s ease;
}
</style>

<template>
  <Transition name="toast">
    <div 
      v-if="visible" 
      :class="[
        'fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2.5 p-3 rounded-lg border shadow-lg z-50 min-w-[300px]',
        type === 'success' ? 'bg-green-50 text-green-800 border-green-100' : 'bg-red-50 text-red-800 border-red-100'
      ]"
    >
      <div 
        :class="[
          'flex-shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold',
          type === 'success' ? 'bg-green-600 text-green-50' : 'bg-red-600 text-red-50'
        ]"
      >
        {{ type === 'success' ? '✓' : '✕' }}
      </div>
      
      <p class="text-sm font-medium flex-grow">{{ message }}</p>
      
      <button 
        @click="$emit('close')" 
        class="text-xs opacity-50 hover:opacity-100 px-1"
      >
        ✕
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'

interface Props {
  message: string
  type?: 'success' | 'error'
  visible: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success'
})

const emit = defineEmits<{
  (e: 'close'): void
}>()

let timer: ReturnType<typeof setTimeout> | null = null

const startTimer = () => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    emit('close')
  }, 3000)
}

watch(() => props.visible, (newVal) => {
  if (newVal) startTimer()
})

onMounted(() => {
  if (props.visible) startTimer()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 20px);
}

.border {
  border-width: 0.5px;
}
</style>

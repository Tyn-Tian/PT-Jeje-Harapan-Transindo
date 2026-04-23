<template>
  <div 
    :class="[
      'flex items-center gap-2.5 p-3 rounded-lg border shadow-lg min-w-[300px]',
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
</template>

<script setup lang="ts">
interface Props {
  message: string
  type?: 'success' | 'error' | 'info'
}

withDefaults(defineProps<Props>(), {
  type: 'success'
})

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.border {
  border-width: 0.5px;
}
</style>

<template>
  <button
    :class="[
      'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed',
      variantClasses,
      sizeClasses
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <svg 
      v-if="loading" 
      class="animate-spin -ml-1 mr-2 h-4 w-4" 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md'
  disabled?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  size: 'md',
  disabled: false,
  loading: false
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-gray-900 text-gray-50 hover:opacity-88 active:scale-[0.98]'
    case 'danger':
      return 'bg-transparent text-red-600 border border-red-600 hover:bg-red-50 active:scale-[0.98]'
    case 'secondary':
    default:
      return 'bg-transparent text-gray-900 border border-black/30 hover:bg-gray-50 active:scale-[0.98]'
  }
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'px-2.5 py-1 text-xs'
    case 'md':
    default:
      return 'px-3.5 py-1.5 text-[13px]'
  }
})
</script>

<style scoped>
/* Specific border weight for secondary button */
.border {
  border-width: 0.5px;
}
</style>

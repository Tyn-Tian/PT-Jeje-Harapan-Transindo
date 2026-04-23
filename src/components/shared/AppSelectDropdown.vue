<template>
  <div class="w-full">
    <label v-if="label" class="text-xs font-medium text-gray-600 mb-1 block">
      {{ label }}
    </label>
    <div class="relative">
      <select
        :value="modelValue"
        :disabled="disabled"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        :class="[
          'w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all appearance-none cursor-pointer',
          error 
            ? 'border-red-600 ring-1 ring-red-600/30' 
            : 'border-black/20 focus:ring-1 focus:ring-black/30 border-black/30',
          disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'bg-white'
        ]"
      >
        <option value="" disabled selected>{{ placeholder }}</option>
        <option v-for="opt in options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    <p v-if="error" class="text-[11px] text-red-700 mt-1 font-medium">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
export interface SelectOption {
  value: string
  label: string
}

interface Props {
  modelValue: string
  options: SelectOption[]
  label?: string
  placeholder?: string
  error?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: () => [],
  placeholder: 'Pilih...',
  error: '',
  disabled: false
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

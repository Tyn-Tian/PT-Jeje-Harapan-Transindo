<template>
  <div class="w-full">
    <label v-if="label" class="text-xs font-medium text-gray-600 mb-1 block">
      {{ label }}
    </label>
    <div class="relative">
      <div v-if="$slots.prefix" class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <slot name="prefix" />
      </div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="[
          'w-full px-3 py-2 text-sm border rounded-lg outline-none transition-all',
          $slots.prefix ? 'pl-9' : 'pl-3',
          error 
            ? 'border-red-600 ring-1 ring-red-600/30' 
            : 'border-black/20 focus:ring-1 focus:ring-black/30 border-black/30',
          disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'bg-white'
        ]"
      />
    </div>
    <p v-if="error" class="text-[11px] text-red-700 mt-1 font-medium">
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  id?: string
  label?: string
  placeholder?: string
  type?: string
  error?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  id: '',
  placeholder: '',
  type: 'text',
  error: '',
  disabled: false
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

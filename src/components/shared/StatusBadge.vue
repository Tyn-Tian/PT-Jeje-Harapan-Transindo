<template>
  <span 
    :class="[
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium',
      status === 'Assigned' ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'
    ]"
  >
    <span 
      :class="[
        'w-1.5 h-1.5 rounded-full',
        status === 'Assigned' ? 'bg-green-600' : 'bg-amber-600'
      ]"
    ></span>
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import type { ShipmentStatus } from '../../types/shipment'

defineProps<{
  status: ShipmentStatus
}>()
</script>

<template>
  <div class="p-8">
    <router-link to="/shipments" class="text-blue-500 hover:underline mb-4 block">&larr; Kembali ke Daftar</router-link>
    <h1 class="text-3xl font-bold text-green-600 mb-4">Shipment Detail Page</h1>
    <p class="text-gray-600">Menampilkan detail untuk Shipment ID: {{ id }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>

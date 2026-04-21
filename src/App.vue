<template>
  <div class="min-h-screen bg-gray-50">
    <nav class="bg-white shadow-sm p-4 mb-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <span class="text-xl font-bold text-gray-800">PT Jeje Harapan Transindo</span>
        <div class="space-x-4">
          <router-link to="/shipments" class="text-gray-600 hover:text-blue-600" active-class="text-blue-600 font-semibold">Shipments</router-link>
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style>
/* Global styles are in style.css */
</style>

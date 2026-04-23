<template>
  <div class="bg-white border border-black/15 rounded-xl overflow-hidden shadow-sm">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-white border-b border-black/10">
            <th 
              v-for="col in columns" 
              :key="col.key"
              :class="[
                'px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-600',
                col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
              ]"
              :style="{ width: col.width }"
            >
              {{ col.label }}
            </th>
            <th v-if="$slots.actions" class="px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-gray-600 text-right">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody v-if="!loading && rows.length > 0">
          <tr 
            v-for="(row, rowIndex) in rows" 
            :key="rowIndex"
            class="border-b border-black/5 last:border-0 hover:bg-gray-50 transition-colors"
          >
            <td 
              v-for="col in columns" 
              :key="col.key"
              :class="[
                'px-4 py-3 text-sm text-gray-900',
                col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'
              ]"
            >
              <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]" :index="rowIndex">
                {{ row[col.key] }}
              </slot>
            </td>
            <td v-if="$slots.actions" class="px-4 py-3 text-right">
              <slot name="actions" :row="row" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="loading" class="p-4 space-y-3">
      <div v-for="i in 5" :key="i" class="h-10 bg-gray-100/50 animate-pulse rounded-lg"></div>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && rows.length === 0" class="flex flex-col items-center justify-center py-12 px-4 text-center">
      <span class="text-3xl mb-4">📭</span>
      <p class="text-sm text-gray-600">{{ emptyMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface TableColumn {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface Props {
  columns: TableColumn[]
  rows: any[]
  loading?: boolean
  emptyMessage?: string
}

withDefaults(defineProps<Props>(), {
  columns: () => [],
  rows: () => [],
  loading: false,
  emptyMessage: 'Tidak ada data ditemukan'
})
</script>

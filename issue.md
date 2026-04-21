# Issue 04 — Real-time Update Simulation via Mocked WebSocket

## Deskripsi
Mengimplementasikan simulasi real-time update status shipment menggunakan mocked WebSocket. Setiap beberapa detik, status salah satu shipment akan berubah secara otomatis untuk mensimulasikan kondisi nyata. Tampilan indikator koneksi mengikuti design system claude.ai.

---

## Tujuan
Setelah issue ini selesai, tampilan daftar shipment akan memperbarui status secara otomatis tanpa perlu refresh halaman, dengan indikator visual "Live" yang konsisten dengan tampilan claude.ai.

---

## Acceptance Criteria
- [ ] Terdapat file `mock-websocket.ts` yang mensimulasikan perilaku WebSocket menggunakan `setInterval`
- [ ] MockWebSocket dapat "mengirim" event perubahan status shipment ke subscriber
- [ ] Pinia store memiliki action untuk subscribe dan unsubscribe dari MockWebSocket
- [ ] Halaman List memperbarui status shipment secara otomatis tanpa reload
- [ ] Koneksi WebSocket dibuka saat komponen dimount dan ditutup saat di-unmount (tidak ada memory leak)
- [ ] Indikator "Live" ditampilkan di pojok kanan atas header halaman List sesuai spec design
- [ ] Unit test untuk MockWebSocket dan integrasi store tersedia dan lulus

---

## Spesifikasi Teknis

### MockWebSocket (`services/mock-websocket.ts`)

```typescript
type WebSocketEventPayload = {
  shipmentId: string
  newStatus: ShipmentStatus
  assignedTransporterId: string | null
}

class MockWebSocket {
  private intervalId: ReturnType<typeof setInterval> | null
  private listeners: Array<(payload: WebSocketEventPayload) => void>

  connect(shipmentIds: string[]): void
  // Memulai setInterval yang setiap 5 detik akan:
  // 1. Memilih satu shipmentId secara acak dari parameter
  // 2. Memilih status baru secara acak (60% berubah, 40% tetap)
  // 3. Memanggil semua listener dengan payload tersebut

  disconnect(): void
  // Membersihkan setInterval dan mengosongkan listener list

  onMessage(callback: (payload: WebSocketEventPayload) => void): void
  // Mendaftarkan callback yang dipanggil setiap ada "pesan" baru
}
```

**Aturan simulasi:**
- Interval update: setiap **5 detik**
- 60% kemungkinan status berubah, 40% tetap
- Jika status berubah menjadi `Not Assigned`, maka `assignedTransporterId` harus di-set ke `null`

---

### Perubahan pada Pinia Store (`stores/shipment-store.ts`)

**Tambahan State:**
```typescript
isRealtimeConnected: boolean
```

**Tambahan Actions:**
| Action | Deskripsi |
|---|---|
| `startRealtimeUpdates()` | Membuat instance MockWebSocket, memanggil `connect()`, mendaftarkan callback yang memperbarui state `shipments` ketika ada update |
| `stopRealtimeUpdates()` | Memanggil `disconnect()` dan set `isRealtimeConnected` menjadi `false` |

**Logika di callback `onMessage`:**
- Cari shipment di state berdasarkan `shipmentId` dari payload
- Jika ditemukan, update `status` dan `assignedTransporterId`
- Jika `selectedShipment` adalah shipment yang sama, update juga

---

### Design Spec — Indikator "Live"

Indikator ini ditempatkan di pojok kanan atas header halaman List, sejajar dengan judul halaman.

**Tampilan:**
```
● Live
```

**Spesifikasi:**
- Dot berukuran **7×7px**, `border-radius: 50%`, warna `#3B6D11` (green-600)
- Animasi: `animate-pulse` (opacity 1 → 0.4 → 1, durasi 2 detik)
- Teks `"Live"` di samping kanan dot, `text-xs`, warna `text-[#5F5E5A]` (gray-600)
- Gap antara dot dan teks: `4px`
- Indikator hanya tampil ketika `isRealtimeConnected` bernilai `true`

Contoh implementasi Tailwind:
```html
<div v-if="store.isRealtimeConnected" class="flex items-center gap-1">
  <span class="w-[7px] h-[7px] rounded-full bg-[#3B6D11] animate-pulse"></span>
  <span class="text-xs text-[#5F5E5A]">Live</span>
</div>
```

---

### Perubahan pada Komponen

**`ShipmentListPage.vue`:**
- Panggil `startRealtimeUpdates()` di `onMounted`, setelah `loadShipments()` selesai
- Panggil `stopRealtimeUpdates()` di `onUnmounted`
- Tambahkan indikator "Live" di header sesuai spec di atas

**`ShipmentDetailPage.vue`:**
- Data detail otomatis terupdate karena reaktivitas Pinia — tidak perlu perubahan logika tambahan

---

## Langkah Implementasi

1. Buat file `services/mock-websocket.ts` dengan implementasi class `MockWebSocket`
2. Tambahkan state `isRealtimeConnected` di `shipment-store.ts`
3. Tambahkan action `startRealtimeUpdates()` dan `stopRealtimeUpdates()` di store
4. Update `ShipmentListPage.vue`:
   - Panggil kedua action di `onMounted` dan `onUnmounted`
   - Tambahkan indikator "Live" di header sesuai design spec
5. Buat file unit test:
   - `services/__tests__/mock-websocket.test.ts`
   - Tambahkan test case baru di `stores/__tests__/shipment-store.test.ts`
6. Gunakan `vi.useFakeTimers()` dari Vitest untuk mengontrol `setInterval` di dalam test
7. Jalankan `npm run test` dan pastikan semua test lulus

---

## Panduan Unit Test

### Test yang wajib ada di `mock-websocket.test.ts`
- Setelah `connect()`, listener terdaftar menerima event setelah interval berlalu (gunakan fake timers)
- Setelah `disconnect()`, listener tidak menerima event lagi
- Payload yang dikirim memiliki struktur yang benar (`shipmentId`, `newStatus`, `assignedTransporterId`)
- `assignedTransporterId` bernilai `null` ketika `newStatus` adalah `Not Assigned`
- `onMessage()` bisa mendaftarkan lebih dari satu listener sekaligus

### Tambahan test di `shipment-store.test.ts`
- `startRealtimeUpdates()` mengubah `isRealtimeConnected` menjadi `true`
- `stopRealtimeUpdates()` mengubah `isRealtimeConnected` menjadi `false`
- Ketika MockWebSocket mengirim event, state `shipments` di store ikut terupdate
- Ketika `selectedShipment` adalah shipment yang sama dengan payload, `selectedShipment` juga terupdate
- Ketika `selectedShipment` adalah shipment yang berbeda, `selectedShipment` tidak terpengaruh

---

## Catatan
- Gunakan `vi.useFakeTimers()` di semua test yang melibatkan `setInterval` agar test tidak lambat dan tidak flaky.
- Pastikan `disconnect()` selalu dipanggil di `onUnmounted` untuk menghindari memory leak.
- Issue ini memiliki dependency logis ke Issue 03 (store harus sudah ada), namun `MockWebSocket` bisa dibangun lebih awal secara terpisah.
- Issue ini bisa dikerjakan paralel dengan Issue 05.

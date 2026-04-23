# PT Jeje Harapan Transindo — Shipment Tracker

Sistem manajemen pengiriman dan logistik modern yang dibangun menggunakan Vue 3, dirancang untuk memantau status pengiriman secara real-time dan mengelola penugasan transporter dengan efisiensi tinggi. Proyek ini menerapkan *Layered Architecture* yang ketat untuk memastikan skalabilitas dan kemudahan pengujian.

## Tech Stack

| Kategori | Teknologi |
|---|---|
| **Core Framework** | Vue 3 (Composition API) |
| **Build Tool** | Vite |
| **Language** | TypeScript |
| **State Management** | Pinia |
| **Routing** | Vue Router |
| **Styling** | TailwindCSS |
| **Unit Testing** | Vitest & @vue/test-utils |

## Struktur Proyek

```text
src/
├── components/          # Komponen UI
│   ├── shared/          # Komponen UI reusable (AppTable, AppInput, dll)
│   └── GlobalNotification.vue # Sistem toast terpusat
├── composables/         # Logika terpisah (useShipment)
├── data/                # Sumber data statis/mock
├── pages/               # Halaman utama aplikasi (Login, List, Detail)
├── repositories/        # Layer akses data (Simulasi API)
├── router/              # Konfigurasi rute dan Middleware (RBAC)
├── services/            # Layer logika bisnis & kalkulasi (Pagination, dll)
├── stores/              # State management (Auth, Shipment, Notification)
├── types/               # Definisi interface TypeScript
├── App.vue              # Root component
└── main.ts              # Entry point aplikasi
```

## Cara Menjalankan Proyek

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server (Hot Reload)
npm run dev

# 3. Build untuk production
npm run build

# 4. Jalankan semua unit test
npm run test

# 5. Jalankan unit test dengan UI interaktif
npm run test:ui
```

## Kredensial Login (Mock)

Aplikasi ini menggunakan sistem simulasi autentikasi. Gunakan kredensial berikut untuk menguji fitur:

| Role | Username | Password | Deskripsi Akses |
|---|---|---|---|
| **Admin** | `admin` | `admin123` | Akses penuh (List, Detail, & Assign Transporter) |
| **Viewer** | `viewer` | `viewer123` | Read-only (Hanya List & Detail, tanpa Form Assignment) |

## Fitur Utama

### Base Features
- **Shipment List**: Tampilan tabel responsif (Desktop) dan card-based (Mobile).
- **Shipment Detail**: Informasi mendalam rute, kendaraan, dan transporter.
- **Transporter Assignment**: Form penugasan dengan validasi real-time.
- **WebSocket Simulation**: Status pengiriman diperbarui otomatis setiap 5 detik.
- **Responsive Design**: UI premium yang optimal di berbagai ukuran layar.

### Advanced Features
- **Role-Based Access Control (RBAC)**: Pembatasan fitur berdasarkan role user.
- **Server-side Logic Simulation**: Pagination (10 data/halaman) dan Search filter real-time.
- **Global Notification System**: Notifikasi *stacked* yang muncul otomatis saat aksi sukses/gagal.
- **Reusable UI Library**: Komponen `AppTable`, `AppInput`, dan `AppSelectDropdown` yang modular.
- **Architecture Refactor**: Penggunaan `useShipment` composable untuk memisahkan logika UI dari state.

## Arsitektur & Keputusan Teknis

Proyek ini menggunakan **Layered Architecture** untuk memisahkan tanggung jawab (Separation of Concerns):

1.  **Repository Layer**: Bertanggung jawab penuh atas pengambilan data. Di sini kita mensimulasikan fetch data dari server.
2.  **Service Layer**: Berisi logika bisnis "murni". Contoh: `pagination-service.ts` menghitung irisan data tanpa bergantung pada state UI.
3.  **Store Layer (Pinia)**: Menjadi pusat kebenaran (Source of Truth) aplikasi. Mengelola state global seperti session user dan daftar shipment.
4.  **Composable Layer**: Menjembatani Store dengan Component. Menyederhanakan interface store agar komponen tetap ramping.
5.  **Component/Page Layer**: Hanya fokus pada presentasi data dan interaksi user.

## Asumsi Pengembangan
- **Autentikasi**: Menggunakan `localStorage` untuk menyimpan session sederhana tanpa enkripsi atau token backend.
- **Persistence**: Data shipment akan kembali ke kondisi awal jika halaman di-refresh (stateless mock), kecuali status login.
- **WebSocket**: Disimulasikan menggunakan `setInterval` karena ketiadaan server WebSocket nyata.
- **Pagination**: Dilakukan secara manual di logic service karena data mock bersifat lokal.

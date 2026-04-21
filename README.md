# PT Jeje Harapan Transindo

Sistem manajemen pengiriman dan logistik berbasis Vue 3 dengan Layered Architecture.

## Persiapan Lokal

1.  **Clone repositori:**
    ```bash
    git clone <repository-url>
    cd pt-jeje-harapan-transindo
    ```

2.  **Install dependensi:**
    ```bash
    npm install
    ```

3.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```

4.  **Jalankan unit test:**
    ```bash
    npm run test
    ```

## Struktur Proyek (Layered Architecture)

- `src/repositories/`: Layer akses data (API/Mock).
- `src/services/`: Layer logika bisnis.
- `src/stores/`: Manajemen state menggunakan Pinia.
- `src/pages/`: Komponen tingkat halaman.
- `src/components/shared/`: Komponen UI yang dapat digunakan kembali.
- `src/router/`: Konfigurasi rute Vue Router.
- `src/types/`: Definisi tipe data TypeScript.

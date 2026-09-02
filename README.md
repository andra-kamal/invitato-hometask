# Invitato Hometask - Wedding Invitation Web

## 1. Setup Environment dan Database

Proyek ini menggunakan **PostgreSQL** sebagai database utama dan **Prisma ORM** untuk berinteraksi dengan database.

### Langkah-langkah setup:
1. Pastikan Anda memiliki instance PostgreSQL yang sedang berjalan (bisa lokal maupun cloud).
2. Buat file `.env` di root direktori proyek, lalu atur variabel lingkungan berikut untuk koneksi database:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/invitato_db?schema=public"
   ```
   *(Silakan sesuaikan `user`, `password`, dan `invitato_db` dengan kredensial database Anda).*
3. Instal semua dependensi proyek:
   ```bash
   npm install
   ```
4. Jalankan migrasi Prisma untuk membuat struktur tabel di database Anda:
   ```bash
   npx prisma migrate dev --name init
   ```
   *(Perintah ini akan membaca skema dari `prisma/schema.prisma` dan menyiapkannya secara otomatis di PostgreSQL).*
5. (Opsional) Jika Anda ingin mengelola atau melihat data dalam database melalui antarmuka grafis, jalankan:
   ```bash
   npx prisma studio
   ```

## 2. Cara Menjalankan Lokal

Setelah seluruh dependensi terinstal dan database siap, Anda dapat langsung menjalankan *development server*.

1. Jalankan perintah berikut di terminal/CLI Anda:
   ```bash
   npm run dev
   ```
2. Buka browser dan arahkan ke alamat [http://localhost:3000](http://localhost:3000).
3. Halaman undangan interaktif akan langsung dapat digunakan.

## 3. Arsitektur dan Keputusan Teknis

*   **Framework & Core**: Proyek ini dibangun di atas **Next.js 14+ (App Router)** dan **React**.
*   **Styling**: Menggunakan **Tailwind CSS** untuk kemudahan dalam kustomisasi layout yang sangat responsif, serta penyesuaian estetika (warna kustom `brand-primary`, `brand-bg`) melalui konfigurasi `tailwind.config.ts`.
*   **Animasi & Interaksi**: Memanfaatkan **Framer Motion** untuk memberikan mikro-animasi halus (*fade-in*, *slide-up*) saat pengguna melakukan scroll.
*   **Layouting Responsif**: Mengadopsi pendekatan **Split Screen** eksklusif pada layar Desktop (bagian kiri statis menampilkan identitas, bagian kanan *scrollable* berisi detail acara). Di mode Mobile, otomatis beradaptasi menjadi susunan vertikal penuh.
*   **Database & API Backend**: Proses RSVP dan input buku tamu (*Wishes*) ditangani oleh **Route Handlers / API Routes Next.js** (`/api/rsvp` dan `/api/wishes`). Data tervalidasi akan disimpan persisten menggunakan **Prisma Client**. 
*   **Audio Musik**: Pemutaran musik latar diatur untuk bermain (*auto-play*) tepat setelah ada interaksi eksplisit pertama dari pengunjung (klik tombol *Open Invitation*). Strategi ini memastikan fitur *audio* patuh pada kebijakan ketat *autoplay* milik sebagian besar browser modern.
*   **Optimasi & Performa**: Mayoritas aset gambar statis telah dikonversi ke format **.webp** (dan dilayani lewat komponen `next/image`) guna menekan waktu pemuatan awal. 
*   **Penanganan Error & Hydration**: 
    *   Formulir dilindungi oleh mekanisme validasi yang akan mencegat data *duplicate* secara *case-insensitive* langsung dari *backend* dan merespons dengan HTTP 409 Conflict. 
    *   Menggunakan *flag* `suppressHydrationWarning` untuk menangkal peringatan *Hydration Mismatch* kritis akibat atribut eksternal (seperti `fdprocessedid`) yang biasa disuntikkan oleh ekstensi *password manager* atau fitur *autofill* milik pengguna.

## 4. Disclosure AI Tools / Agents

Aplikasi web ini dibangun dengan kolaborasi penuh (*pair-programming*) bersama AI Agent.

*   **AI Agent yang Digunakan**: **Antigravity IDE** (didukung oleh Google Deepmind) menggunakan model **Gemini 3.1 Pro / Claude Opus**.
*   **Bagian Penggunaan AI**:
    *   **Penyusunan UI/UX, Layout, & Styling**: AI memimpin proses penulisan struktur DOM (React) dan konfigurasi desain CSS (Tailwind) untuk mengonversi spesifikasi dan referensi visual dari *user* menjadi kode yang berfungsi sempurna di seluruh variasi ukuran layar.
    *   **Interaktivitas & Animasi**: AI bertugas menambahkan perpustakaan dan mengimplementasi logika *Framer Motion*, pengaturan transisi elemen, navigasi *floating*, dan penataan tata letak stateful (*React Hooks*).
    *   **Logika Backend & Integrasi Database**: Menyusun model tabel di `schema.prisma`, menulis endpoint API REST untuk menangani POST dan GET *request*, hingga logika pencegahan duplikasi dalam pendaftaran RSVP.
    *   **Debugging Lanjutan**: Secara independen membaca *error logs*, mendiagnosis konflik React *Hydration*, serta memperbaiki *style padding/margin* dan isu layout spesifik atas umpan balik *user*.

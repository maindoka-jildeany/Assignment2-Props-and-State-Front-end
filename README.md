
# Assignment: Props and State — Front-end

Proyek kecil ini adalah implementasi game bergaya "Flappy Bird" yang dibuat dengan React + TypeScript dan Vite. Tujuan utamanya adalah memenuhi persyaratan tugas terkait penggunaan komponen, props, state, dan pembuatan tampilan yang menarik.

## Ringkasan singkat
- Minimal terdapat tiga komponen yang saling berhubungan:
	- `Game` — komponen utama yang mengatur logika permainan, state global (posisi burung, pipa, skor, dll.) dan loop permainan.
	- `Bird` — menampilkan burung. Dapat menampilkan gambar skin (Wili/Jesa) atau emoji (☺️ / 😆) saat skin "Emoji" dipilih.
	- `Pipes` — menampilkan pasangan pipa yang bergerak; posisi dan ukuran pipa dikirim dari `Game` lewat props.

## Persyaratan teknis yang dipenuhi
1. Props untuk mengirim data antar komponen
	 - `Game` mengirimkan props ke `Bird`: `position`, `rotation`, `isJumping`, `normalSrc`, `jumpSrc`, dan `useEmoji`.
	 - `Game` mengirimkan props ke `Pipes`: `height`, `position`, `gap`.

2. State untuk menyimpan dan mengubah data secara dinamis
	 - `Game` menyimpan state seperti `birdPos`, `birdVelocity`, `pipes`, `score`, `gameStarted`, dan `gameOver`.
	 - State diubah melalui event (klik, tekan Space) dan loop permainan (interval) untuk memindahkan burung dan pipa.

3. Tampilan dibuat menarik dan mudah digunakan
	 - Styling utama di `src/components/Game.css` (background gradien, skor yang jelas, menu skin, popup game-over).
	 - Pilihan skin tersedia lewat menu select. Tersedia 3 opsi: `Emoji` (default), `Wili`, dan `Jesa`.
	 - Saat skin = `Emoji`, burung dirender sebagai emoji besar (☺️ saat idle, 😆 saat jump).

## Cara menjalankan
1. Pastikan Node.js & npm terinstall.
2. Buka project di terminal (PowerShell) dan jalankan:
```powershell
npm install
npm run dev
```
3. Buka browser ke alamat yang ditampilkan (default: http://localhost:5173).

## File penting dan peran
- `src/components/Game.tsx` — logika utama permainan, pengaturan state, pemilihan skin.
- `src/components/Bird.tsx` — menampilkan burung; menerima props dan mendukung mode emoji (`useEmoji`).
- `src/components/Pipes.tsx` — menampilkan pipa atas/bawah berdasarkan props `height`, `position`, `gap`.
- `src/components/Game.css` — styling tampilan permainan.
- `src/assets/` — gambar skin untuk Wili dan Jesa.

## Bagaimana props & state dipakai (kontrak singkat)
- Inputs (props):
	- `Bird` menerima: position (px), rotation (deg), isJumping (boolean), normalSrc/jumpSrc (optional), useEmoji (boolean).
	- `Pipes` menerima: height (px), position (px), gap (px).
- Outputs / efek:
	- `Game` mengubah state `score`, `pipes`, `birdPos`, `gameOver` berdasarkan interaksi dan loop game.
- Error modes / edge cases:
	- Jika burung keluar layar (y &lt; 0 atau &gt; window.innerHeight) game akan berakhir (`gameOver`).
	- Pipa yang melewati sisi kiri layar dihapus.

## Verifikasi fitur yang diminta
1. Pastikan ada minimal tiga komponen: buka folder `src/components` dan lihat `Game.tsx`, `Bird.tsx`, `Pipes.tsx`.
2. Verifikasi props: lihat definisi parameter pada `Bird.tsx` dan `Pipes.tsx`.
3. Verifikasi state: buka `Game.tsx` dan lihat penggunaan `useState` untuk posisi burung, pipa, skor, dan game state.
4. UI: buka `src/components/Game.css` untuk melihat styling; jalankan aplikasi dan pastikan antarmuka rapi serta menu skin bekerja.

## Catatan tambahan / pengembangan lanjutan
- Default skin telah diset ke `Emoji` sehingga setelah load game akan menampilkan emoji sebagai burung.
- Pengembangan yang direkomendasikan (opsional):
	- Menyimpan pilihan skin ke `localStorage` agar tersimpan antar reload.
	- Menambahkan animasi CSS kecil saat jump untuk memperhalus transisi emoji/gambar.
	- Menambahkan tes unit sederhana untuk fungsi utilitas (jika ditambahkan) atau snapshot untuk komponen presentasional.

Jika Anda ingin saya menambahkan penyimpanan preferensi skin, atau menjalankan dev server dan melaporkan hasilnya, beri tahu saya dan saya akan jalankan di terminal proyek Anda.

---
Generated for: tugas Props-and-State (Assignment 2)

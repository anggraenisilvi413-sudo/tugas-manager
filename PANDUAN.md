# Panduan Tugas Pertemuan 6 (Git, npm, TypeScript, Vite)

## 1. Menjalankan aplikasi
Pasang Node.js LTS (nodejs.org), lalu di terminal dalam folder proyek:
```
npm install        # memasang Vite & TypeScript
npm run dev        # jalankan lokal (buka alamat yang muncul)
npm run build      # hasil build ada di folder dist
npm run preview    # coba hasil build
```

## 2. Git & GitHub (bagian ini WAJIB kamu kerjakan sendiri + screenshot)
Buat repository KOSONG di GitHub (tanpa README), misalnya `tugas-manager`.
```
git init
git add .
git commit -m "Inisialisasi proyek Vite + TypeScript"            # commit 1
git branch -M main
git remote add origin https://github.com/USERNAME/tugas-manager.git
git push -u origin main
```
**Branch + Pull Request (screenshot PR dan merge):**
```
git switch -c fitur-validasi                 # branch 1
# ubah sesuatu kecil, mis. tambah teks bantuan di form (index.html)
git add . 
git commit -m "Tambah teks bantuan pada form"                    # commit 2
git push -u origin fitur-validasi
```
Di GitHub klik **Compare & pull request**, buat Pull Request, lalu **Merge pull request**. Lalu:
```
git switch main
git pull                                      # pull
```
**Merge conflict (screenshot conflict dan penyelesaiannya):**
```
git switch -c fitur-teks-a
# ubah teks <p> di <header> index.html menjadi "Versi A"
git commit -am "Ubah teks header (A)"                            # commit 3
git switch main
git switch -c fitur-teks-b
# ubah baris YANG SAMA menjadi "Versi B"
git commit -am "Ubah teks header (B)"                            # commit 4
git switch main
git merge fitur-teks-a                        # berhasil
git merge fitur-teks-b                        # CONFLICT
```
Buka `index.html`, cari tanda `<<<<<<<`, `=======`, `>>>>>>>`, hapus tanda itu dan sisakan teks akhir yang kamu mau. Lalu:
```
git add index.html
git commit -m "Selesaikan merge conflict pada teks header"       # commit 5
git push
```
Syarat terpenuhi: minimal 5 commit, 2+ branch, merge, conflict, push, pull, 1 Pull Request, `.gitignore`.

## 3. Upload online (website pribadi)
1. vercel.com > **Add New > Project** > pilih repo `tugas-manager` (Framework otomatis **Vite**).
2. Buka **Environment Variables**, tambahkan `VITE_APP_NAME` dan `VITE_APP_VERSION` (isi sama seperti `.env`), lalu **Deploy**. File `.env` tidak ikut GitHub, jadi nilai ini harus diisi di Vercel.
3. Tambahkan link aplikasi ini di web pribadimu (mis. lewat **Tambah Tugas** di hub tugas, kolom Link tugas).

## 4. Yang dikumpulkan
- Link website (Vercel) yang menampilkan aplikasi.
- Link repository GitHub (riwayat commit terlihat).
- Screenshot: branch, merge, Pull Request, penyelesaian conflict.
- Penjelasan Git/npm/TypeScript/Vite/env dan compiler/transpiler/bundler: sudah ada di bagian "Tentang Proyek Ini" pada halaman aplikasi.

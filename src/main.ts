import './style.css';
import type { Status, Tugas } from './types';
import { Penyimpanan } from './storage';

// Environment variables dari file .env (hanya data tidak rahasia)
const namaApp: string = import.meta.env.VITE_APP_NAME ?? 'Pengelola Tugas Kuliah';
const versiApp: string = import.meta.env.VITE_APP_VERSION ?? '1.0.0';

const LABEL: Record<Status, string> = { belum: 'Belum Selesai', selesai: 'Selesai' };
const penyimpanan = new Penyimpanan<Tugas>('tugas-kuliah');

let daftar: Tugas[] = penyimpanan.muat();   // array
let idEdit: number | null = null;
let filter: Status | 'semua' = 'semua';
let sedangEdit: boolean = false;            // boolean

// Fungsi generic kecil untuk mengambil elemen berdasarkan id
const $ = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;

const form = $<HTMLFormElement>('form-tugas');
const inJudul = $<HTMLInputElement>('judul');
const inMatkul = $<HTMLInputElement>('matkul');
const inTenggat = $<HTMLInputElement>('tenggat');

function simpanSemua(): void {
  penyimpanan.simpan(daftar);
  render();
}

function resetForm(): void {
  form.reset();
  idEdit = null;
  sedangEdit = false;
  $('btn-simpan').textContent = 'Tambah Tugas';
  $('btn-batal').hidden = true;
}

function mulaiEdit(t: Tugas): void {
  idEdit = t.id;
  sedangEdit = true;
  inJudul.value = t.judul;
  inMatkul.value = t.matkul;
  inTenggat.value = t.tenggat;
  $('btn-simpan').textContent = 'Simpan Perubahan';
  $('btn-batal').hidden = false;
  inJudul.focus();
}

function buatTombol(teks: string, kelas: string, aksi: () => void): HTMLButtonElement {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = kelas;
  b.textContent = teks;
  b.addEventListener('click', aksi);
  return b;
}

function buatItem(t: Tugas): HTMLLIElement {
  const li = document.createElement('li');
  li.className = 'item';
  li.dataset.status = t.status;

  const judul = document.createElement('h3');
  judul.textContent = t.judul;
  const meta = document.createElement('p');
  meta.className = 'meta';
  meta.textContent = `${t.matkul} \u00b7 Tenggat ${t.tenggat}`;
  const badge = document.createElement('span');
  badge.className = `badge badge-${t.status}`;
  badge.textContent = LABEL[t.status];

  const aksi = document.createElement('div');
  aksi.className = 'aksi';
  aksi.append(
    buatTombol(t.status === 'belum' ? 'Tandai Selesai' : 'Tandai Belum', 'btn', () => {
      daftar = daftar.map(x => (x.id === t.id ? { ...x, status: x.status === 'belum' ? 'selesai' : 'belum' } : x));
      simpanSemua();
    }),
    buatTombol('Edit', 'btn btn-outline', () => mulaiEdit(t)),
    buatTombol('Hapus', 'btn btn-bahaya', () => {
      if (!window.confirm(`Hapus tugas "${t.judul}"?`)) return;
      daftar = daftar.filter(x => x.id !== t.id);
      if (idEdit === t.id) resetForm();
      simpanSemua();
    })
  );

  li.append(judul, meta, badge, aksi);
  return li;
}

function render(): void {
  const ul = $<HTMLUListElement>('daftar');
  ul.replaceChildren();
  const tampil = daftar.filter(t => filter === 'semua' || t.status === filter);
  tampil.forEach(t => ul.appendChild(buatItem(t)));
  $('kosong').hidden = tampil.length > 0;
  document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(b => {
    b.setAttribute('aria-pressed', String(b.dataset.filter === filter));
  });
}

form.addEventListener('submit', (e: Event) => {
  e.preventDefault();
  const isi = { judul: inJudul.value.trim(), matkul: inMatkul.value.trim(), tenggat: inTenggat.value };
  if (!sedangEdit || idEdit === null) {
    daftar.push({ id: Date.now(), status: 'belum', ...isi });
  } else {
    daftar = daftar.map(t => (t.id === idEdit ? { ...t, ...isi } : t));
  }
  resetForm();
  simpanSemua();
});

$('btn-batal').addEventListener('click', resetForm);

document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(b => {
  b.addEventListener('click', () => {
    filter = b.dataset.filter as Status | 'semua';
    render();
  });
});

document.title = namaApp;
$('nama-app').textContent = namaApp;
$('nama-footer').textContent = namaApp;
$('versi-app').textContent = versiApp;
render();

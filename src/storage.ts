import * as fs from 'fs';
import * as path from 'path';

// TODO: Definisikan path file untuk menyimpan data To-Do

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file

// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan

// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)


/**
 * Bagian ini mengatur bagaimana data disimpan ke dalam file fisik agar tidak hilang saat aplikasi ditutup.
 */
import { Todo } from './types';
import { isTodoArray } from './utils';

// Menentukan lokasi folder 'data' dan file 'todos.json'
const DATA_DIR = path.resolve(__dirname, '../data');
const FILE_PATH = path.resolve(DATA_DIR, 'todos.json');

/**
 * Menyiapkan folder dan file database jika belum ada di komputer
 */
export function initializeStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log("📁 Folder data berhasil dibuat.");
  }

  if (!fs.existsSync(FILE_PATH)) {
    // Membuat file JSON kosong berisi array [] jika belum ada
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
    console.log("📄 File todos.json berhasil dibuat.");
  }
};

/**
 * Menyimpan daftar tugas ke file JSON
 */
export function saveTodos(todos: Todo[]): void {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2), 'utf-8');
  } catch (err) {
    console.error("❌ Gagal menyimpan data:", err);
  }
};

/**
 * Membaca daftar tugas dari file JSON
 */
export function loadTodos(): Todo[] {
  try {
    if (!fs.existsSync(FILE_PATH)) return [];
    const data = fs.readFileSync(FILE_PATH, 'utf-8');

    if (!data.trim()) return [];

    const parsed = JSON.parse(data);
    // Memvalidasi data yang dibaca menggunakan type guard di utils.ts
    return isTodoArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("⚠️ File database rusak atau tidak valid. Menggunakan data kosong.");
    return [];
  }
};
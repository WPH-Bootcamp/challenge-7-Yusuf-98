import * as fs from 'fs';
import * as path from 'path';

// TODO: Definisikan path file untuk menyimpan data To-Do

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file

// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan

// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)

import { Todo } from './types.js';
import { isTodoArray } from './utils.js';

const DATA_DIR = path.resolve('data');
const DATA_FILE = path.join(DATA_DIR, 'todos.json');

export function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log('Folder "data" berhasil dibuat.');
  }
}

export function loadTodos(): Todo[] {
  ensureDataDir();

  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }

  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(data);

    if (isTodoArray(parsed)) {
      return parsed;
    } else {
      console.warn('Data JSON tidak valid, mengembalikan array kosong.');
      return [];
    }
  } catch (error) {
    console.error('Gagal membaca file todos.json:', error);
    return [];
  }
}

export function saveTodos(todos: Todo[]): void {
  ensureDataDir();

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error('Gagal menyimpan todos:', error);
    throw new Error('Gagal menyimpan data ke file');
  }
}
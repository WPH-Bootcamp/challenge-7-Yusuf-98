// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid


import { Todo } from './types';

/**
 * Type Guard: Memvalidasi apakah objek adalah Todo yang valid
 * Menggunakan 'unknown' lebih aman daripada 'any' karena memaksa pengecekan tipe
 */
export function isTodo(item: unknown): item is Todo {
  if (typeof item !== 'object' || item === null) {
    console.log("Item bukan object");
    return false;
  }

  const todo = item as Todo;
  const isValid = 
    typeof todo.id === 'string' &&
    typeof todo.text === 'string' && 
    (todo.status === 'active' || todo.status === 'completed') &&
    typeof todo.createdAt === 'string';

  if (!isValid) {
    console.log("Validasi properti gagal pada:", item);
  }

  return isValid;
}

/**
 * Fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Memastikan item-item / items adalah daftar (array) berisi objek Todo yang valid
export function isTodoArray(items: unknown): items is Todo[] {
  if (!Array.isArray(items)) {
    console.warn("Validasi Gagal: Data bukan sebuah array.");
    return false;
  }

  const allValid = items.every(isTodo);

  if (!allValid) {
    console.warn("Validasi Gagal: Ada salah satu item yang bukan Todo yang valid.");
    return false;
  }
  return true;
}

/**
 * Validasi input string agar tidak kosong atau hanya berisi spasi, serta pengaman tambahan jika terjadi gangguan input akan memaksa input menjadi string
 */
export function isValidString (input: unknown): boolean {
  return typeof input === 'string' && input.trim().length > 0;
};

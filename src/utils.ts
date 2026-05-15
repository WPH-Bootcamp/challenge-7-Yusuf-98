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
function isTodo(item: unknown): item is Todo {
  if (typeof item !== 'object' || item === null) return false;

  const todo = item as Todo;
  return (
    typeof todo.id === 'string' &&
    typeof todo.text === 'string' &&
    (todo.statusCompleted === 'active' || todo.statusCompleted === 'done') &&
    typeof todo.createdAt === 'string'
  );
}

/**
 * Fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  const datePart = d.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Mengambil komponen waktu (jam dan menit)
  const timePart = d.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });

  return `${datePart}, pukul: ${timePart} WIB`;
}

// Memastikan item-item / items adalah daftar (array) berisi objek Todo yang valid
export function isTodoArray(items: unknown): items is Todo[] {
  if (!Array.isArray(items)) return false;
  return items.every(isTodo);
}

/**
 * Validasi input string agar tidak kosong atau hanya berisi spasi,
 * serta minimal 3 huruf alfabet
 */
export function isValidString(input: unknown): boolean {
  if (typeof input !== 'string') {
    return false;
  }

  const trimmed = input.trim();

  // Minimal 3 huruf alfabet (a-z A-Z)
  const alphabeticCount = (trimmed.match(/[a-zA-Z]/g) || []).length;

  return trimmed.length > 0 && alphabeticCount >= 3;
}

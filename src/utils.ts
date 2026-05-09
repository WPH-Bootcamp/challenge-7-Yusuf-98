// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid

import { Todo } from './types';

/**
 * Type Guard untuk memastikan object adalah Todo
 */


export function isTodo(item: unknown): item is Todo {
  if (typeof item !== 'object' || item === null) return false;

  const todo = item as Todo;

  return (
    typeof todo.id === 'number' &&
    typeof todo.title === 'string' &&
    typeof todo.completed === 'boolean'
  );
}

export function isTodoArray(items: unknown): items is Todo[] {
  if (!Array.isArray(items)) return false;
  return items.every(isTodo);
}

export function generateId(todos: Todo[]): number {
  if (todos.length === 0) return 1;
  return Math.max(...todos.map(t => t.id)) + 1;
}

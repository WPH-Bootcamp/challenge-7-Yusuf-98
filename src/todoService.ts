// TODO: Import tipe-tipe yang sudah didefinisikan di types.ts

// TODO: Import fungsi storage untuk baca/tulis file

// TODO: Buat fungsi untuk menambahkan To-Do baru
// - Generate id yang unik (bisa pakai timestamp atau counter)
// - Pastikan text tidak kosong
// - Set default status sebagai active

// TODO: Buat fungsi untuk menandai To-Do sebagai selesai
// - Cari To-Do berdasarkan id
// - Ubah statusnya menjadi completed
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menghapus To-Do
// - Filter To-Do berdasarkan id
// - Handle kasus jika id tidak ditemukan

// TODO: Buat fungsi untuk menampilkan semua To-Do
// - Tampilkan dengan format yang rapi
// - Tambahkan status [ACTIVE] atau [DONE] di depan setiap To-Do
// - Berikan nomor urut untuk memudahkan user memilih

// TODO: Buat fungsi untuk mencari To-Do berdasarkan keyword


import { Todo } from './types.js';
import { loadTodos, saveTodos } from './storage.js';
import { generateId } from './utils.js';

export class TodoService {
  private todos: Todo[] = [];

  constructor() {
    this.todos = loadTodos();
  }

  add(title: string): Todo {
    if (!title?.trim()) {
      throw new Error('Judul todo tidak boleh kosong');
    }

    const todo: Todo = {
      id: generateId(this.todos),
      title: title.trim(),
      completed: false
    };

    this.todos.push(todo);
    saveTodos(this.todos);
    return todo;
  }

  markComplete(id: number): Todo {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) {
      throw new Error(`Todo dengan ID ${id} tidak ditemukan`);
    }

    todo.completed = true;
    saveTodos(this.todos);
    return todo;
  }

  delete(id: number): boolean {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Todo dengan ID ${id} tidak ditemukan`);
    }

    this.todos.splice(index, 1);
    saveTodos(this.todos);
    return true;
  }

  list(): Todo[] {
    return [...this.todos]; // return copy
  }
}
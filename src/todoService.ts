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

/**
 * Berisi logika utama aplikasi seperti menambah, menghapus, atau mengubah status tugas.
 */
import { Todo, TodoInput } from './types';
import { loadTodos, saveTodos } from './storage';
import { formatDate } from './utils';

/**
 * Membuat kode unik acak untuk ID setiap tugas
 */
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

/**
 * Menambah tugas baru ke dalam daftar dan menyimpannya ke file
 */
export function addTodo(input: TodoInput): boolean {
  if (!input?.text || !input.text.trim()) {
    console.log('❌ Tugas tidak boleh kosong!');
    return false;
  }

  const todos = loadTodos();
  const newTodo: Todo = {
    id: generateId(),
    text: input.text.trim(),
    statusCompleted: 'active',
    createdAt: new Date().toISOString(),
  };

  saveTodos([newTodo, ...todos]);
  return true;
}

/**
 * Mengubah status tugas ('active' <--> 'done')
 * Memilih toggle dibanding completed saja, untuk mengantisipasi kemungkinan user salah pilih tugas
 */
export function toggleTodo(id: string): boolean {
  const todos = loadTodos();
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    console.log('❌ Tugas tidak ditemukan!');
    return false;
  }

  todos[index].statusCompleted =
    todos[index].statusCompleted === 'active' ? 'done' : 'active';

  saveTodos(todos);
  return true;
}

/**
 * Menghapus tugas
 */
export function deleteTodo(id: string): boolean {
  const todos = loadTodos();
  const todoToDelete = todos.find((t) => t.id === id);

  if (!todoToDelete) {
    console.log('❌ Tugas tidak ditemukan!');
    return false;
  }

  const filtered = todos.filter((t) => t.id !== id);
  saveTodos(filtered);
  return true;
}

/**
 * Menampilkan seluruh daftar tugas
 */
export function displayAllTodos(
  todos?: Todo[],
  title: string = 'DAFTAR TUGAS'
): void {
  console.log(`\n📋 ${title}:`);

  const todosToShow = todos ?? loadTodos();

  if (todosToShow.length === 0) {
    console.log('   (Tidak ada tugas)');
    return;
  }

  todosToShow.forEach((t, i) => {
    const label = t.statusCompleted === 'done' ? '[DONE]  ' : '[ACTIVE]';
    const timeInfo = formatDate(t.createdAt);
    console.log(`${label} ${i + 1}. ${t.text} (Dibuat: ${timeInfo})`);
  });
}

/**
 * Mencari tugas berdasarkan kata kunci tertentu
 */
export function searchTodos(keyword: string): Todo[] {
  const todos = loadTodos();
  const lowerKeyword = keyword.toLowerCase().trim();
  return todos.filter((t) => t.text.toLowerCase().includes(lowerKeyword));
}

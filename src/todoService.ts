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
import { Todo, TodoInput, TodoStatus } from './types';
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
export async function addTodo(input: TodoInput): Promise<void> {
  // Ambil daftar tugas yang sudah ada dari storage
  const todos = loadTodos(); 
  const newTodo: Todo = {
    id: generateId(),
    text: input.text.trim(),
    status: 'active', // Default tugas baru adalah aktif
    createdAt: new Date().toISOString(),
  };
  // Menggabungkan data lama dengan data baru dan menyimpannya kembali
  saveTodos([...todos, newTodo]);
  console.log("✅ Tugas berhasil ditambahkan!");
};

/**
 * Mengubah status tugas ('active' <--> 'completed'), alasan memakai toggle adalah untuk mengantisipasi jika user salah memilih tugas yang sudah diselesaikan sehingga perlu merubahnya ke 'active' lagi.
 */
export async function toggleTodo(id: string): Promise<boolean> {
  // Ambil semua daftar tugas dari storage
  const todos = loadTodos();
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) return false;

  todos[todoIndex].status = todos[todoIndex].status === 'active' ? 'completed' : 'active';
  saveTodos(todos);
  return true;
};

/**
 * Menghapus tugas berdasarkan ID, memakai filter karena membuat array baru sehingga cocok untuk menghapus data
 */
export async function deleteTodo(id: string): Promise<boolean> {
  const todos = loadTodos();
  const filtered = todos.filter(t => t.id !== id);
  
  if (filtered.length === todos.length) return false;

  saveTodos(filtered);
  return true;
};

/**
 * Menampilkan tugas ke terminal
 * Instruksi meminta penambahan label [ACTIVE] atau [DONE] di sini
 */
const STATUS_LABELS: Record<TodoStatus, string> = {
  active: "[ACTIVE]",
  completed: "[DONE]  "
};

export function displayAllTodos(todos: Todo[] = loadTodos(), title: string = "DAFTAR TUGAS"): void {
  console.log(`\n📋 ${title}:`);
  if (todos.length === 0) {
    console.log("   (Tidak ada tugas)");
    return;
  }

  todos.forEach((t, i) => {
    // Label status sesuai permintaan di komentar file todoService.ts
    const statusLabel = STATUS_LABELS[t.status];
    const time = formatDate(t.createdAt);
    console.log(`${statusLabel} ${i + 1}. ${t.text} (Dibuat: ${time})`);
  });
};

/**
 * Mencari tugas berdasarkan kata kunci tertentu
 */
export async function searchTodos(keyword: string): Promise<Todo[]> {
  const todos = loadTodos();
  const lowerKeyword = keyword.toLowerCase().trim();
  return todos.filter(t => t.text.toLowerCase().includes(lowerKeyword));
};
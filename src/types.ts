// TODO: Definisikan tipe data untuk To-Do item di sini
// Hint: To-Do sebaiknya memiliki id, text, dan status completed

// TODO: Buat interface untuk To-Do item

// TODO: Buat tipe untuk status To-Do (active/done)

// TODO: Buat tipe untuk fungsi-fungsi yang akan digunakan

/**
 * Codingan ini dibuat semaksimal mungkin supaya mendekati semua requirements yang diminta dan dituliskan dalam setiap file (baik dalam penamaan maupun dalam susunan). Terima kasih kepada pembuat soal yang secara tidak langsung telah memberikan petunjuk dan alur untuk mempermudah pengerjaan.
 */


// TODO: Buat interface untuk To-Do item
export interface Todo {
  id: string;
  text: string; //Menggunakan 'text' sebagai 'key' sesuai hint
  statusCompleted: TodoStatus;
  createdAt: string; // Ada requirement di utils.ts untuk menampilkan tanggal/waktu dengan format yang bagus
}

// TODO: Buat tipe untuk status To-Do (active/done)
type TodoStatus = 'active' | 'done'; // 

// TODO: Buat tipe untuk fungsi-fungsi yang akan digunakan
// TodoInput digunakan saat membuat data baru (tanpa ID, status, dan waktu karena dibuat otomatis)
export type TodoInput = Pick<Todo, 'text'>; // Alternatif bisa memakai union type Omit<Todo, 'id' | 'status' | 'createdAt'>;
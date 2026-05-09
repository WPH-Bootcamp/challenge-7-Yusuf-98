// TODO: Import readline untuk membaca input dari command line

// TODO: Import fungsi-fungsi dari todoService

// TODO: Import fungsi-fungsi dari utils (termasuk type guards)

// TODO: Buat fungsi untuk menampilkan menu utama
// Tampilkan opsi seperti:
// 1. Add new todo
// 2. Mark todo as complete
// 3. Delete todo
// 4. List all todos
// 5. Search todos
// 6. Exit

// TODO: Buat fungsi untuk handle input dari user
// Gunakan readline.question untuk menerima input

// TODO: Buat fungsi main yang akan menjalankan aplikasi secara loop
// Hint: Gunakan recursive function atau while loop

// TODO: Jalankan fungsi main
console.log('Welcome to TypeScript To-Do App!');
console.log('Start building your app here...');

import readline from 'readline';
import { TodoService } from './todoService.js';

const service = new TodoService();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

function showMenu(): void {
  console.log('\n' + '='.repeat(50));
  console.log('          TODO APP - TypeScript');
  console.log('='.repeat(50));
  console.log('1. Tambah Todo Baru');
  console.log('2. Tampilkan Semua Todo');
  console.log('3. Tandai Selesai');
  console.log('4. Hapus Todo');
  console.log('5. Keluar');
  console.log('='.repeat(50));
}

async function listTodos(): Promise<void> {
  const todos = service.list();

  if (todos.length === 0) {
    console.log('\nBelum ada todo. Silakan tambahkan todo baru!');
    return;
  }

  console.log('\nDaftar Todo:');
  todos.forEach(todo => {
    const status = todo.completed ? '[DONE]' : '[ACTIVE]';
    console.log(`${status}  ${todo.id}. ${todo.title}`);
  });
}

async function main() {
  console.log('Selamat datang di Todo App TypeScript!\n');

  while (true) {
    showMenu();
    const choice = await question('Pilih menu (1-5): ');

    try {
      switch (choice.trim()) {
        case '1': {
          const title = await question('Masukkan judul todo: ');
          const todo = service.add(title);
          console.log(`Berhasil ditambahkan! ID: ${todo.id}`);
          break;
        }

        case '2':
          await listTodos();
          break;

        case '3': {
          await listTodos();
          const idStr = await question('\nMasukkan ID yang ingin ditandai selesai: ');
          const id = parseInt(idStr);
          if (isNaN(id)) throw new Error('ID harus berupa angka');
          service.markComplete(id);
          console.log(`Todo ID ${id} berhasil ditandai selesai!`);
          break;
        }

        case '4': {
          await listTodos();
          const idStr = await question('\nMasukkan ID yang ingin dihapus: ');
          const id = parseInt(idStr);
          if (isNaN(id)) throw new Error('ID harus berupa angka');
          service.delete(id);
          console.log(`Todo ID ${id} berhasil dihapus!`);
          break;
        }

        case '5':
          console.log('\nTerima kasih telah menggunakan Todo App!');
          rl.close();
          return;

        default:
          console.log('Pilihan tidak valid. Silakan pilih angka 1 sampai 5.');
      }
    } catch (error: any) {
      console.error(`Error: ${error.message}`);
    }

    console.log(''); // spacing
  }
}

main().catch(console.error);
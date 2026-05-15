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

/**
 * (User Interface) yang berinteraksi langsung dengan pengguna lewat terminal.
 */
console.log('Welcome to TypeScript To-Do App!');
console.log('Start building your app here...');

import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { initializeStorage, loadTodos } from './storage';
import {
  addTodo,
  toggleTodo,
  deleteTodo,
  displayAllTodos,
  searchTodos,
} from './todoService';
import { isValidString } from './utils';

// Inisialisasi storage sekali di awal
initializeStorage();

const rl = readline.createInterface({ input, output });

/**
 * Fungsi utama yang berjalan dalam loop
 */
const mainMenu = async () => {
  try {
    console.log('\n🎉 Selamat datang di TypeScript To-Do App!');

    let isRunning = true;
    while (isRunning) {
      console.log('\n=== TO-DO APP by YUSUF AR ===');
      console.log('1. ➕ Add      (Tambah Tugas Baru)');
      console.log('2. ✅ Status   (Ubah Status Tugas)');
      console.log('3. 🗑️  Delete   (Hapus Tugas)');
      console.log('4. 📋 List     (Tampilkan Semua Tugas)');
      console.log('5. 🔍 Search   (Cari Tugas)');
      console.log('6. 🚪 Exit');
      console.log('========================');

      const choice = await rl.question('Pilih menu (1-6): ');

      switch (choice) {
        case '1': {
          // TAMBAH TUGAS BARU
          let taskInput = '';
          while (true) {
            taskInput = await rl.question('Masukkan tugas baru: ');
            if (isValidString(taskInput)) break;
            console.log('❌ Tugas tidak boleh kosong dan minimal 3 huruf abjad !');
          }

          if (addTodo({ text: taskInput })) {
            console.log('✅ Tugas berhasil ditambahkan!');
            displayAllTodos(); // User bisa langsung melihat hasilnya
          }
          break;
        }

        case '2': // UBAH STATUS TUGAS
        case '3': {
          // HAPUS TUGAS
          const currentTodos = loadTodos();

          if (currentTodos.length === 0) {
            console.log('\n📭 Daftar tugas masih kosong.');
            break;
          }

          displayAllTodos(currentTodos); // Mempermudah user memilih tugas mana yang mau di eksekusi

          const action =
            choice === '2'
              ? 'diubah statusnya ([ACTIVE] <--> [DONE])'
              : 'dihapus';

          const range =
            currentTodos.length === 1 ? '(1)' : `(1-${currentTodos.length})`;
          const inputNum = await rl.question(
            `\nPilih tugas nomor ${range} untuk ${action} atau 0 untuk batal: `
          );

          const idx = parseInt(inputNum) - 1;
          if (isNaN(idx) || idx < -1 || idx >= currentTodos.length) {
            console.log('❌ Input harus berupa angka yang tersedia di daftar!');
            break;
          }
          if (idx === -1) break;

          const selectedId = currentTodos[idx].id;
          let success = false;

          if (choice === '2') {
            success = toggleTodo(selectedId);
            if (success) console.log('✅ Status tugas berhasil diubah!');
          } else {
            success = deleteTodo(selectedId);
            if (success) console.log('🗑️  Tugas berhasil dihapus!');
          }

          if (success) {
            displayAllTodos(); // User bisa langsung melihat hasilnya
          }
          break;
        }

        case '4': // TAMPILKAN SEMUA TUGAS
          displayAllTodos();
          break;

        case '5': {
          // CARI TUGAS
          const keyword = await rl.question('Masukkan kata kunci pencarian: ');
          if (!isValidString(keyword)) {
            console.log('❌ Kata kunci tidak boleh kosong.');
            break;
          }
          const results = searchTodos(keyword);
          results.length
            ? displayAllTodos(results, `HASIL PENCARIAN: "${keyword}"`)
            : console.log(
                `🔍 Tidak ditemukan tugas dengan kata kunci "${keyword}".`
              );
          break;
        }

        case '6': // KELUAR DARI APLIKASI
          console.log(
            '👋 Terima kasih telah menggunakan To-Do App. Sampai jumpa!'
          );
          isRunning = false;
          break;

        default:
          console.log('❌ Pilihan tidak valid. Silakan pilih 1-6.');
      }
    }
  } catch (err) {
    console.error('❌ Terjadi kesalahan sistem:', err);
  } finally {
    // Pastikan readline selalu ditutup
    rl.close();
  }
};

// Fungsi untuk menjalankan aplikasi
mainMenu().catch((err) => {
  console.error('❌ Terjadi kesalahan sistem:', err);
  process.exit(1);
});

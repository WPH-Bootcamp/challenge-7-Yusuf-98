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
import { addTodo, toggleTodo, deleteTodo, displayAllTodos, searchTodos } from './todoService';
import { isValidString } from './utils';

// Menyiapkan interface komunikasi terminal
const rl = readline.createInterface({ input, output });

/**
 * Fungsi utama yang berjalan dalam loop (selama isRunning = true)
 */
const mainMenu = async () => {
  initializeStorage(); // Memastikan folder/file siap saat aplikasi dibuka
  console.log("\n🎉 Selamat datang di TypeScript To-Do App!");

  let isRunning = true;
  while (isRunning) {
    // Menampilkan Menu Utama
    console.log("\n=== TO-DO APP by YUSUF AR ===");
    console.log("1. ➕ Add      (Tambah Tugas Baru)");
    console.log("2. ✅ Complete (Tandai Selesai)");
    console.log("3. 🗑️  Delete   (Hapus Tugas)");
    console.log("4. 📋 List     (Tampilkan Semua Tugas)");
    console.log("5. 🔍 Search   (Cari Tugas)");
    console.log("6. 🚪 Exit");
    console.log("========================");

    const choice = await rl.question("Pilih menu (1-6): ");
    const currentTodos = loadTodos(); // Mengambil data terbaru dari storage
    switch (choice) {
      case '1': { // TAMBAH TUGAS BARU
        let taskInput = "";
        while (true) {
          taskInput = await rl.question("Masukkan tugas baru: ");
          if (isValidString(taskInput)) break;
          console.log("❌ Tugas tidak boleh kosong!");
        }
        await addTodo({ text: taskInput });
        break;
      }

      // Penggabungan case '2' dan case '3' karena banyak persamaan
      case '2': // TANDAI SELESAI ATAU ACTIVE
      case '3': { // HAPUS
        if (currentTodos.length === 0) {
          console.log("\n📭 Daftar tugas masih kosong.");
          break;
        }

        displayAllTodos(currentTodos); // Munculkan daftar agar user bisa pilih nomor
        const action = choice === '2' ? "ditandai selesai" : "dihapus";
        const successMsg = choice === '2' 
          ? "✅ Tugas berhasil ditandai selesai!" 
          : "🗑️ Tugas berhasil dihapus!";

        // Fungsi untuk menampilkan (1) dan bukan (1-1) 
        const range = currentTodos.length === 1 ? "(1)" : `(1-${currentTodos.length})`;
        const inputNum = await rl.question(`\nPilih nomor ${range} untuk ${action} atau 0 untuk batal: `);
        
        if (inputNum === '0') break;
        const idx = parseInt(inputNum) - 1;

        // Validasi apakah nomor yang dimasukkan ada di daftar
        if (idx >= 0 && idx < currentTodos.length) {
          const selectedId = currentTodos[idx].id;
          const ok = choice === '2' ? await toggleTodo(selectedId) : await deleteTodo(selectedId);
          if (ok) console.log(successMsg);
        } else {
          console.log(`❌ Nomor tidak valid!`);
        }
        break;
      }

      case '4': // TAMPILKAN SEMUA TUGAS
        displayAllTodos();
        break;

      case '5': // CARI TUGAS
        const keyword = await rl.question("Masukkan kata kunci pencarian: ");
        if (!isValidString(keyword)) {
          console.log("❌ Kata kunci tidak boleh kosong.");
          break;
        }
        const results = await searchTodos(keyword);
        results.length 
          ? displayAllTodos(results, `HASIL PENCARIAN: "${keyword}"`)
          : console.log(`🔍 Tidak ditemukan tugas dengan kata kunci "${keyword}".`);
        break;

      case '6': // KELUAR
        console.log("👋 Terima kasih telah menggunakan To-Do App. Sampai jumpa!");
        isRunning = false;
        break;

      default:
        console.log("❌ Pilihan tidak valid. Silakan pilih 1-6.");
    }
  }
  // readline close
  rl.close();
};

// Menjalankan program utama
mainMenu().catch((err) => {
  console.error("❌ Terjadi kesalahan sistem:", err);
  process.exit(1);
});
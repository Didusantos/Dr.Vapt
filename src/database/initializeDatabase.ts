import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {
  try {
    await database.execAsync(`PRAGMA foreign_keys = ON;`);

    await database.execAsync(`
            CREATE TABLE IF NOT EXISTS users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              name TEXT NOT NULL,
              email TEXT UNIQUE NOT NULL,
              password TEXT NOT NULL,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS family_members (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL,
              name TEXT NOT NULL,
              relationship TEXT NOT NULL, 
              age INTEGER,
              disease TEXT NOT NULL,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
      
            CREATE TABLE IF NOT EXISTS screenings (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL,
              family_member_id INTEGER, 
              symptoms_reported TEXT NOT NULL,
              ai_diagnosis TEXT NOT NULL,
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
              FOREIGN KEY (family_member_id) REFERENCES family_members(id) ON DELETE CASCADE
            );
      
            CREATE TABLE IF NOT EXISTS medications (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              user_id INTEGER NOT NULL, 
              medication_name TEXT NOT NULL,
              dosage TEXT NOT NULL, 
              time_to_take TEXT NOT NULL, 
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            );
        `);
    console.log("Banco de dados criado com sucesso!");
  } catch (error) {
    console.error("Erro ao criar o banco de dados", error);
  }
}

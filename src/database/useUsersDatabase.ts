import { useSQLiteContext } from "expo-sqlite";

export type users = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
};

export function useUserDatabase() {
  const database = useSQLiteContext();

  async function createUser(data: Omit<users, "id" | "created_at">) {
    const statement = await database.prepareAsync(
      "INSERT INTO users (name, email, password) VALUES ($name, $email, $password)",
    );
    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $email: data.email,
        $password: data.password,
      });
    } catch (error) {
      throw error;
    } finally {
      statement.finalizeAsync();
    }
  }

  async function login(email: string, password: string) {
    try {
      const result = await database.getFirstAsync<users>(
        "SELECT * FROM users WHERE email = $email AND password = $password",
        {
          $email: email,
          $password: password,
        },
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  return { createUser, login };
}

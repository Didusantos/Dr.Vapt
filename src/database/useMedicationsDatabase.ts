import { useSQLiteContext } from "expo-sqlite";

export type medicationsContent = {
  id: number;
  medication_name: string;
  dosage: string;
  time_to_take: string;
  created_at: string;
  user_id: number;
};

export function useMedicationsDatabase() {
  const database = useSQLiteContext();

  async function createMedication(
    data: Omit<medicationsContent, "id" | "created_at">,
  ) {
    try {
      await database.runAsync(
        `INSERT INTO medications (user_id, medication_name, dosage, time_to_take) 
         VALUES ($user_id, $medication_name, $dosage, $time_to_take)`,
        {
          $user_id: data.user_id,
          $medication_name: data.medication_name,
          $dosage: data.dosage,
          $time_to_take: data.time_to_take,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async function getMedication(user_id: number) {
    try {
      const query = `SELECT * FROM medications WHERE user_id = $user_id ORDER BY created_at DESC`;

      const result = await database.getAllAsync<medicationsContent>(query, {
        $user_id: user_id,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  return { createMedication, getMedication };
}

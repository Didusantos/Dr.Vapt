import { useSQLiteContext } from "expo-sqlite";

export type historicContent = {
  id: number;
  symptoms_reported: string;
  ai_diagnosis: string;
  created_at: Date;
  user_name: string;
  family_member_name: string | null;
};

export function useHistoricDatabase() {
  const database = useSQLiteContext();

  async function createHistoric(
    user_id: number,
    family_member_id: number | null,
    symptoms: string,
    diagnosis: string,
  ) {
    try {
      await database.runAsync(
        `INSERT INTO          
        screenings (user_id, family_member_id, symptoms_reported, ai_diagnosis)
        VALUES ($user_id, $family_member_id, $symptoms, $diagnosis)`,
        {
          $user_id: user_id,
          $family_member_id: family_member_id,
          $symptoms: symptoms,
          $diagnosis: diagnosis,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async function getHistoric(user_id: number) {
    try {
      const query = `SELECT 
                screenings.id,
                screenings.symptoms_reported,
                screenings.ai_diagnosis,
                screenings.created_at,
                users.name AS user_name,
                family_members.name AS family_member_name

                FROM screenings
                JOIN users ON screenings.user_id = users.id
                LEFT JOIN family_members ON screenings.family_member_id = family_members.id
                WHERE users.id = $user_id
                ORDER BY screenings.created_at DESC`;

      const result = await database.getAllAsync<historicContent>(query, {
        $user_id: user_id,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  return { createHistoric, getHistoric };
}

import { useSQLiteContext } from "expo-sqlite";

export type familyMemberContent = {
  id: number;
  name: string;
  relationship: string;
  age: string;
  disease: string;
  created_at: string;
  user_id: number;
};

export function useFamilyMemberDatabase() {
  const database = useSQLiteContext();

  async function createFamilyMember(
    data: Omit<familyMemberContent, "id" | "created_at">,
  ) {
    try {
      await database.runAsync(
        `INSERT INTO family_members (user_id, name, relationship, age, disease) 
         VALUES ($user_id, $name, $relationship, $age, $disease)`,
        {
          $user_id: data.user_id,
          $name: data.name,
          $relationship: data.relationship,
          $age:
            typeof data.age === "string"
              ? data.age
              : (data.age as unknown as Date).toISOString(),
          $disease: data.disease,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async function getFamilyMember(user_id: number) {
    try {
      const query = `SELECT * FROM family_members WHERE user_id = $user_id ORDER BY created_at DESC`;

      const result = await database.getAllAsync<familyMemberContent>(query, {
        $user_id: user_id,
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  return { createFamilyMember, getFamilyMember };
}

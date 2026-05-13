import { AuthProvider } from "@/contexts/AuthContext";
import { initializeDatabase } from "@/database/initializeDatabase";
import { Stack, useRouter } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const isUserLoggedIn = true;

  useEffect(() => {
    if (isUserLoggedIn) {
      setTimeout(() => {
        router.replace("/(auth)");
      }, 0);
    }
  }, [isUserLoggedIn]);

  return (
    <SQLiteProvider databaseName="DR-VAPT.db" onInit={initializeDatabase}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

          <Stack.Screen
            name="familyModal"
            options={{
              presentation: "modal",
              title: "Novo familiar",
              headerStyle: { backgroundColor: "blue" },
            }}
          />

          <Stack.Screen
            name="medicationModal"
            options={{
              presentation: "modal",
              title: "Novo medicamento",
              headerStyle: { backgroundColor: "blue" },
            }}
          />
        </Stack>
      </AuthProvider>
    </SQLiteProvider>
  );
}

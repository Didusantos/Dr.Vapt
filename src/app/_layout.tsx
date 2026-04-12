import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const isUserLoggedIn = true;

  useEffect(() => {
    if (isUserLoggedIn) {
      setTimeout(() => {
        router.replace("/(tabs)");
      }, 0);
    }
  }, [isUserLoggedIn]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}

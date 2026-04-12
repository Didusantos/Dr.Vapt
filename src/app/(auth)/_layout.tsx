import { Stack } from "expo-router";

export default function loginLayout() {
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="index" />
      <Stack.Screen options={{ headerShown: false }} name="signup" />
    </Stack>
  );
}

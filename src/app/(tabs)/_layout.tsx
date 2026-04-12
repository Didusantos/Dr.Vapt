import { Tabs } from "expo-router";

export default function tabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Menu" }} />
      <Tabs.Screen name="historic" options={{ title: "Histórico" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
    </Tabs>
  );
}

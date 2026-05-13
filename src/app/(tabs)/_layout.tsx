import { AuthContext } from "@/contexts/AuthContext";
import { Redirect, Tabs } from "expo-router";
import { useContext } from "react";

export default function tabsLayout() {
  const { user } = useContext(AuthContext);
  if (!user?.id) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Menu" }} />
      <Tabs.Screen name="historic" options={{ title: "Histórico" }} />
      <Tabs.Screen name="profile" options={{ title: "Perfil" }} />
      <Tabs.Screen name="family" options={{ title: "Família" }} />
      <Tabs.Screen name="medications" options={{ title: "Medicamentos" }} />
    </Tabs>
  );
}

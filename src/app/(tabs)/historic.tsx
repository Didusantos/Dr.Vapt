import { AuthContext } from "@/contexts/AuthContext";
import {
  historicContent,
  useHistoricDatabase,
} from "@/database/useHistoricDatabase";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HistoricScreen() {
  const { user } = useContext(AuthContext);
  const historicDatabase = useHistoricDatabase();

  const [historic, setHistoric] = useState<historicContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function loadHistoric() {
        if (!user?.id) return;

        try {
          setIsLoading(true);
          const data = await historicDatabase.getHistoric(user.id);
          setHistoric(data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
      loadHistoric();
    }, [user?.id]),
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico</Text>

      <FlatList
        data={historic}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.historicContainer}
        ListEmptyComponent={() => <Text>Nenhum histórico encontrado.</Text>}
        renderItem={({ item }) => (
          <View style={styles.historicList}>
            <Text>
              Paciente:{" "}
              {item.family_member_name
                ? item.family_member_name
                : item.user_name}
            </Text>

            <Text>Sintomas: {item.symptoms_reported}</Text>

            <Text>Diagnóstico por IA: {item.ai_diagnosis}</Text>

            <Text>
              Data de pesquisa:{" "}
              {new Date(item.created_at).toLocaleDateString("pt-BR")}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 32,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  historicContainer: {
    padding: 8,
    marginTop: 16,
    gap: 16,
  },
  historicList: {
    gap: 8,
    marginBottom: 16,
    backgroundColor: "#FBF6F6",
    padding: 16,
    borderRadius: 8,
    borderColor: "#DCDCDC",
    borderWidth: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});

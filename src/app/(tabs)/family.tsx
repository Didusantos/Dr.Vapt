import { Button } from "@/components/Button";
import { AuthContext } from "@/contexts/AuthContext";
import {
  familyMemberContent,
  useFamilyMemberDatabase,
} from "@/database/useFamilyMemberDatabase";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
export default function FamilyScreen() {
  const { user } = useContext(AuthContext);
  const familyDatabase = useFamilyMemberDatabase();

  const [family, setFamily] = useState<familyMemberContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function loadFamilyMembers() {
        if (!user?.id) return;

        try {
          setIsLoading(true);
          const data = await familyDatabase.getFamilyMember(user.id);
          setFamily(data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
      loadFamilyMembers();
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
      <Text style={styles.title}>Familiares</Text>
      <Button
        label="Adicionar familiar"
        color="blue"
        onPress={() => router.navigate("/familyModal")}
      />
      <FlatList
        data={family}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.historicContainer}
        ListEmptyComponent={() => (
          <Text>Nenhum familiar cadastrado até o momento.</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.historicList}>
            <Text>Nome do familiar: {item.name}</Text>

            <Text>Parentesco: {item.relationship}</Text>

            <Text>Doenças registradas: {item.disease}</Text>

            <Text>
              Data de inclusão na lista de familiares:
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
    backgroundColor: "#f4f4f5",
    padding: 32,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 24,
  },
  historicContainer: {
    paddingTop: 24,
    paddingBottom: 32,
  },
  historicList: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    gap: 8,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});

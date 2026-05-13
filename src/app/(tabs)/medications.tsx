import { Button } from "@/components/Button";
import { AuthContext } from "@/contexts/AuthContext";
import {
  medicationsContent,
  useMedicationsDatabase,
} from "@/database/useMedicationsDatabase";

import { router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
export default function MedicationScreen() {
  const { user } = useContext(AuthContext);
  const medicationDatabse = useMedicationsDatabase();

  const [medication, setMedication] = useState<medicationsContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      async function loadMedications() {
        if (!user?.id) return;

        try {
          setIsLoading(true);
          const data = await medicationDatabse.getMedication(user.id);
          setMedication(data);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
      loadMedications();
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
      <Text style={styles.title}>Medicamentos</Text>
      <Button
        label="Adicionar medicamento"
        color="blue"
        onPress={() => router.navigate("/medicationModal")}
      />
      <FlatList
        data={medication}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            Nenhum medicamento cadastrado até o momento.
          </Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.medicationName}>
              Nome da medicação: {item.medication_name}
            </Text>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Dosagem:</Text>
              <Text style={styles.value}>{item.dosage}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.label}>Período de uso:</Text>
              <Text style={styles.value}>{item.time_to_take}</Text>
            </View>

            <Text style={styles.dateText}>
              Data de inclusão do medicamento na lista:{" "}
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
    backgroundColor: "#f8fafc",
    padding: 24,
    gap: 24,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 16,
    marginTop: 16,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 32,
  },
  emptyText: {
    textAlign: "center",
    color: "#64748b",
    fontSize: 16,
    marginTop: 40,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,

    borderLeftWidth: 6,
    borderLeftColor: "#10b981",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#334155",
    marginRight: 6,
  },
  value: {
    fontSize: 15,
    color: "#475569",
  },
  dateText: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 12,
    textAlign: "right",
    fontStyle: "italic",
  },
});

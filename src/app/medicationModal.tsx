import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AuthContext } from "@/contexts/AuthContext";
import { useMedicationsDatabase } from "@/database/useMedicationsDatabase";
import { useContext, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function familyModal() {
  const { user } = useContext(AuthContext);
  const medicationDatabase = useMedicationsDatabase();
  const [medication_name, setMedication_name] = useState("");
  const [dosage, setDosage] = useState("");
  const [time_to_take, setTime_to_take] = useState("");

  async function handleCreateMedcation() {
    if (!user?.id) return;
    try {
      if (!medication_name.trim() || !dosage.trim() || !time_to_take.trim()) {
        Alert.alert(
          "Preencha todos os campos",
          "Por favor, preencha todos os campos antes de prosseguir.",
        );
        return;
      }
      await medicationDatabase.createMedication({
        user_id: user.id,
        medication_name,
        dosage,
        time_to_take,
      });

      Alert.alert("Novo registro", "Novo medicamento cadastrado com sucesso!");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro de cadastro",
        "Não foi possível concluir o cadastro do medicamento.",
      );
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.select({ ios: "padding", android: "height" })}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Informações do medicamento</Text>

          <Text>Nome do medicamento</Text>
          <Input
            placeholder="Tramadol"
            value={medication_name}
            onChangeText={setMedication_name}
          />

          <Text>Dosagem</Text>
          <Input placeholder="15ml" value={dosage} onChangeText={setDosage} />

          <Text>Período de uso</Text>
          <Input
            placeholder="De 15 em 15 dias"
            value={time_to_take}
            onChangeText={setTime_to_take}
          />

          <Button
            label="Cadastrar medicamento"
            color="green"
            onPress={handleCreateMedcation}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 32,
    gap: 24,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});

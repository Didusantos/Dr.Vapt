import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { AuthContext } from "@/contexts/AuthContext";
import { useFamilyMemberDatabase } from "@/database/useFamilyMemberDatabase";
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
  const familyMemberDatabase = useFamilyMemberDatabase();
  const [name, setName] = useState("");
  const [relationship, setrelationship] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");

  async function handleCreateFamilyMember() {
    if (!user?.id) return;
    try {
      if (
        !name.trim() ||
        !relationship.trim() ||
        !age.trim() ||
        !disease.trim()
      ) {
        Alert.alert(
          "Preencha todos os campos",
          "Por favor, preencha todos os campos antes de prosseguir.",
        );
        return;
      }
      await familyMemberDatabase.createFamilyMember({
        user_id: user.id,
        name,
        relationship,
        age,
        disease,
      });

      Alert.alert("Novo registro", "Novo familiar cadastrado com sucesso!");
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro de cadastro",
        "Não foi possível concluir o cadastro do familiar.",
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
          <Text style={styles.title}>Informações do familiar</Text>

          <Text>Nome do familiar</Text>
          <Input
            placeholder="Maria da Silva"
            value={name}
            onChangeText={setName}
          />

          <Text>Parentesco</Text>
          <Input
            placeholder="Mãe"
            value={relationship}
            onChangeText={setrelationship}
          />

          <Text>Idade</Text>
          <Input value={age} onChangeText={setAge} />

          <Text>Doenças crônicas</Text>
          <Input
            placeholder="Diabetes, Hipertensão, ETC."
            value={disease}
            onChangeText={setDisease}
          />

          <Button
            label="Cadastrar familiar"
            color="green"
            onPress={handleCreateFamilyMember}
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

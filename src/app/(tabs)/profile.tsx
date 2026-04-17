import { Button } from "@/components/Button";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProfileScreen() {
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
          <View>
            <Text style={styles.userName}>(), Bem vindo!</Text>
            <Text style={styles.subtitle}>Informações de usuário</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Nome de usuário: ()</Text>
            <Text style={styles.infoText}>E-mail: ()</Text>
            <Text style={styles.infoText}>Data de nascimento: ()</Text>
            <Text style={styles.infoText}>Sexo: ()</Text>
            <Text style={styles.infoText}>Altura: ()</Text>
            <Text style={styles.infoText}>Peso: ()</Text>
          </View>

          <Button label="Editar perfil" color="blue" />

          <View style={styles.infoContainer}>
            <Text>Meu histórico</Text>
            <Text>Gerenciar notificações</Text>
            <Text>Vincular familiares</Text>
            <Text>Ajuda</Text>
          </View>

          <Button label="Sair" color="blue" />
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
    gap: 16,
  },
  userName: {
    fontFamily: "Roboto",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 16,
  },
  subtitle: {
    fontFamily: "Roboto",
    color: "grey",
    fontSize: 16,
  },
  infoContainer: {
    marginTop: 12,
    gap: 10,
    backgroundColor: "#FBF6F6",
    padding: 16,
    borderRadius: 8,
  },
  infoText: {
    fontFamily: "Roboto",
    fontSize: 16,
  },
});

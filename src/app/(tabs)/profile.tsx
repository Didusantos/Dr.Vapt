import { Button } from "@/components/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { useContext } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user } = useContext(AuthContext);
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
            <Text style={styles.userName}>{user?.name}, Bem vindo!</Text>
            <Text style={styles.subtitle}>Informações de usuário</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Nome de usuário: {user?.name}</Text>
            <Text style={styles.infoText}>E-mail: {user?.email}</Text>
          </View>

          <Button label="Editar perfil" color="blue" />

          <View style={styles.infoContainer}>
            <Text
              style={styles.link}
              onPress={() => {
                router.replace("/(tabs)/historic");
              }}
            >
              Meu histórico
            </Text>
            <Text
              style={styles.link}
              onPress={() => {
                router.replace("/(tabs)/family");
              }}
            >
              Vincular familiares
            </Text>
            <Text
              style={styles.link}
              onPress={() => {
                router.replace("/(tabs)/medications");
              }}
            >
              Medicamentos
            </Text>

            <Text
              style={styles.link}
              onPress={() => {
                Alert.alert(
                  "Ajuda e suporte",
                  "Entre em contato com o administrador do projeto",
                );
              }}
            >
              Ajuda e suporte
            </Text>
          </View>

          <Button
            label="Sair"
            color="blue"
            onPress={() => {
              router.replace("/(auth)");
            }}
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
  link: {
    textDecorationColor: "blue",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
  },
});

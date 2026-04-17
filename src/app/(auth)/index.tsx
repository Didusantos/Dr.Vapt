import { images } from "@/assets/images/index";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Login Error", "Preencha todos os campos");
    } else {
      (Alert.alert(
        "Login sucess",
        `Login realizado com sucesso com as seguintes informações: \n\nEmail: ${email} \nSenha: ${password}}`,
      ),
        router.replace("/(tabs)"));
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
          <Image source={images.logoLogin} style={styles.illustration} />

          <Text style={styles.title}>Entrar</Text>
          <Text style={styles.subtitle}>Insira um e-mail e senha</Text>

          <View style={styles.form}>
            <Input
              placeholder="E-mail"
              keyboardType="email-address"
              onChangeText={setEmail}
            />
            <Input
              placeholder="Senha"
              secureTextEntry={true}
              onChangeText={setPassword}
            />
            <Button color="#28a744" label="Entrar" onPress={handleSignIn} />
          </View>

          <Text style={styles.footerText}>
            Não possui uma conta?{" "}
            <Link href="/signup" style={styles.footerLink}>
              {" "}
              Cadastre-se gratuitamente.
            </Link>
          </Text>
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
  },
  illustration: {
    width: "100%",
    height: 425,
    resizeMode: "contain",
    marginTop: 16,
  },
  title: {
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
  form: {
    marginTop: 18,
    gap: 16,
  },
  footerText: {
    textAlign: "center",
    fontSize: 10,
    color: "grey",
    marginTop: 16,
    fontWeight: 700,
  },
  footerLink: {
    color: "#3128a7",
    fontWeight: 800,
  },
});

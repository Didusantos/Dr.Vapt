import { images } from "@/assets/images/index";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Link } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function SignUp() {
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
          <Image source={images.logoSignup} style={styles.illustration} />

          <Text style={styles.title}>Cadastrar</Text>
          <Text style={styles.subtitle}>
            Preencha os campos abaixo para criar sua conta
          </Text>

          <View style={styles.form}>
            <Input placeholder="Nome" />
            <Input placeholder="E-mail" keyboardType="email-address" />
            <Input placeholder="Senha" secureTextEntry={true} />
            <Input placeholder="Confirmar Senha" secureTextEntry={true} />
            <Button label="Cadastrar" />
          </View>

          <Text style={styles.footerText}>
            Já possui uma conta?{" "}
            <Link href="/" style={styles.footerLink}>
              {" "}
              Faça login.
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

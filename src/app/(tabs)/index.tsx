import { Button } from "@/components/Button";
import { IconButtonImage } from "@/components/IconButtonImage";
import { Input } from "@/components/Input";
import { SwitchButton } from "@/components/SwitchButton";
import { useState } from "react";
import {
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
          <Text style={styles.title}>Auto Atendimento - Sistema</Text>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text>Sintomas atuais</Text>
              <Input placeholder="Digite os seus sintomas atuais" />
            </View>

            <View style={styles.formGroup}>
              <Text>Opções de histórico</Text>
              <SwitchButton label="Familiares" />
              <SwitchButton label="Histórico pessoal" />
            </View>

            <View style={styles.formGroup}>
              <Text>Enviar imagens</Text>
              <IconButtonImage
                textColor="#fff"
                border={8}
                btnColor="blue"
                label="Adicionar imagens"
                iconColor="primary100"
                imageIcon="camera"
              />
              <Text>OBS: Uma imagem ajuda a garantir melhor precisão</Text>
            </View>

            <Button label="Enviar" color="red" />
          </View>
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
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  form: {
    padding: 16,
    marginTop: 16,
    gap: 16,
  },
  formGroup: {
    gap: 8,
    marginBottom: 16,
  },
});

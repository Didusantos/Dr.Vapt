import { Button } from "@/components/Button";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { IconButtonImage } from "@/components/IconButtonImage";

export default function HistoricScreen() {
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
          <Text style={styles.title}>Histórico</Text>

          <View style={styles.historicContainer}>
            <IconButtonImage
              textColor="#fff"
              border={0}
              btnColor="blue"
              label="Adicionar novo registro"
              iconColor="error100"
              imageIcon="plus-circle-outline"
            />

            <Text>Registros</Text>
            <View style={styles.historicList}>
              <IconButtonImage
                textColor="black"
                border={0}
                btnColor=""
                label="Registro {1}"
                iconColor="neutral10"
                imageIcon="pencil-circle-outline"
              />
              <IconButtonImage
                textColor="black"
                border={0}
                btnColor=""
                label="Registro {1}"
                iconColor="neutral10"
                imageIcon="pencil-circle-outline"
              />
              <IconButtonImage
                textColor="black"
                border={0}
                btnColor=""
                label="Registro {1}"
                iconColor="neutral10"
                imageIcon="pencil-circle-outline"
              />
              <IconButtonImage
                textColor="black"
                border={0}
                btnColor=""
                label="Registro {1}"
                iconColor="neutral10"
                imageIcon="pencil-circle-outline"
              />
              <IconButtonImage
                textColor="black"
                border={0}
                btnColor=""
                label="Registro {1}"
                iconColor="neutral10"
                imageIcon="pencil-circle-outline"
              />
            </View>

            <Button label="Salvar" color="blue" />
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
});

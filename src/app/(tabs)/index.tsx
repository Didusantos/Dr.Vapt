import { Button } from "@/components/Button";
import { IconButtonImage } from "@/components/IconButtonImage";
import { Input } from "@/components/Input";
import { SwitchButton } from "@/components/SwitchButton";
import { CameraView } from "expo-camera";
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

import { AuthContext } from "@/contexts/AuthContext";
import { useFamilyMemberDatabase } from "@/database/useFamilyMemberDatabase";
import { useHistoricDatabase } from "@/database/useHistoricDatabase";

import { useAudioTranscription } from "@/hooks/useAudioTranscription";
import { useCamera } from "@/hooks/useCamera";
import { api } from "@/services/api";

export default function Index() {
  const { user } = useContext(AuthContext);
  const historicDatabase = useHistoricDatabase();
  const familyDatabase = useFamilyMemberDatabase();

  const [sintomas, setSintomas] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResult] = useState("");
  const [analiseFoto, setAnaliseFoto] = useState("");
  const [usePersonalHistory, setUsePersonalHistory] = useState(false);
  const [useFamilyHistory, setUseFamilyHistory] = useState(false);

  const {
    permission,
    setPermission,
    facing,
    cameraRef,
    toggleCameraType,
    takePicture,
  } = useCamera();
  const { recording, transcription, startRecording, stopRecording } =
    useAudioTranscription((textoTranscrito) => {
      setSintomas((prev) => prev + (prev ? " " : "") + textoTranscrito.trim());
    });

  const handleCameraAndContent = async () => {
    const imageUri = await takePicture();

    setIsCameraOpen(false);

    if (imageUri) {
      setIsAnalyzing(true);

      try {
        const response = await api.analisarImagem(imageUri, sintomas);
        console.log(response);
        setAnaliseFoto(response);
        Alert.alert("Sucesso", "Imagem enviada e analisada com sucesso.");
      } catch (error) {
        console.log(error);
        Alert.alert("Erro", "Não foi possível analisar a imagem enviada.");
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  async function handleHistoric(ai_diagnosis: string) {
    if (!user?.id) return;

    try {
      await historicDatabase.createHistoric(
        user.id,
        null,
        sintomas,
        ai_diagnosis,
      );
    } catch (error) {
      console.log(error);
    }
  }

  if (isCameraOpen) {
    if (!permission?.granted)
      return (
        <View style={styles.centerContainer}>
          <Text style={{ textAlign: "center", marginBottom: 20 }}>
            Precisamos de permissão para acessar a câmera.
          </Text>
          <Button label="Dar Permissão" color="blue" onPress={setPermission} />
          <Button
            label="Voltar"
            color="red"
            onPress={() => setIsCameraOpen(false)}
          />
        </View>
      );

    return (
      <View style={{ flex: 1 }}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing={facing}
          ref={cameraRef}
        />
        <View style={styles.cameraOverlay}>
          <Button
            label="Virar Câmera"
            color="gray"
            onPress={toggleCameraType}
          />
          <Button
            label="Capturar e Analisar"
            color="blue"
            onPress={handleCameraAndContent}
          />
          <Button
            label="Cancelar"
            color="red"
            onPress={() => setIsCameraOpen(false)}
          />
        </View>
      </View>
    );
  }

  const handleEnviarResultados = async () => {
    if (!sintomas) {
      Alert.alert(
        "Aviso",
        "Por favor, informe os sintomas atuais antes de prosseguir com a análise.",
      );
      return;
    }

    if (!user?.id) return;

    setIsAnalyzing(true);

    try {
      let additionalContent = "";

      if (usePersonalHistory) {
        const historic = await historicDatabase.getHistoric(user.id);
        if (historic.length > 0) {
          additionalContent += "Histórico pessoal do paciente:\n";
          const lastHistoric = historic.slice(0, 3);

          lastHistoric.forEach((item) => {
            additionalContent += `Sintomas: ${item.symptoms_reported} | Diagnóstico: ${item.ai_diagnosis}\n`;
          });
        }
      }

      if (useFamilyHistory) {
        const family = await familyDatabase.getFamilyMember(user.id);
        if (family.length > 0) {
          additionalContent += "\n Histórico familiar (Doenças registradas):\n";
          family.forEach((fam) => {
            additionalContent += `- Parentesco: ${fam.relationship} | Doença: ${fam.disease}\n`;
          });
        }
      }
      const textoImagem = analiseFoto ? analiseFoto : "Nenhuma imagem enviada";

      console.log("Enviando sintomas para análise...");
      Alert.alert(
        "Status de solicitação",
        "Estamos enviando as informações fornecidas para análise. Aguarde retorno.",
      );
      const diagnostico = await api.pesquisarResult(
        sintomas,
        textoImagem,
        additionalContent,
      );

      setResult(diagnostico);

      await handleHistoric(diagnostico);

      Alert.alert(
        "Sucesso",
        "Análise finalizada e histórico de pesquisa enviado.",
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível enviar os sintomas para análise.");
    } finally {
      setIsAnalyzing(false);
    }
  };

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
          <Text style={styles.title}>Autoatendimento Particular</Text>

          <View style={styles.form}>
            <View style={styles.formGroup}>
              <Text>Sintomas atuais</Text>
              <Input
                placeholder="Digite os sintomas atuais"
                value={sintomas}
                onChangeText={setSintomas}
              />
              <Button
                label={
                  transcription
                    ? "Transcrevendo áudio..."
                    : recording
                      ? "Interromper transcrição de áudio"
                      : "Usar transcrição de áudio"
                }
                color={recording ? "red" : transcription ? "gray" : "purple"}
                onPress={recording ? stopRecording : startRecording}
                disabled={transcription}
              />
            </View>

            <View style={styles.formGroup}>
              <Text>Conteúdo adicional - Opções de histórico</Text>
              <SwitchButton
                label="Histórico familiar"
                value={useFamilyHistory}
                onValueChange={setUseFamilyHistory}
              />
              <SwitchButton
                label="Histórico pessoal - Últimas 3 análises"
                value={usePersonalHistory}
                onValueChange={setUsePersonalHistory}
              />
              <Text style={styles.infoText}>
                Um histórico pessoal ou familiar nos ajuda a entender se há
                relação com o que você está sentindo agora.
              </Text>
            </View>

            <View style={styles.formGroup}>
              <Text>Enviar imagens</Text>
              <IconButtonImage
                textColor="#fff"
                border={8}
                btnColor="blue"
                label={isAnalyzing ? "Analisando imagem..." : "Enviar imagem"}
                iconColor="primary100"
                imageIcon="camera"
                onPress={() => setIsCameraOpen(true)}
                disabled={isAnalyzing}
              />
              <Text style={styles.infoText}>
                Uma imagem nos ajuda a garantir maior precisão de informações e
                sintomas para análise.
              </Text>
            </View>

            <Button
              label={isAnalyzing ? "Aguardando analisé..." : "Enviar"}
              onPress={handleEnviarResultados}
              disabled={isAnalyzing}
              color="blue"
            />
            {results ? (
              <View style={styles.resultBox}>
                <Text style={styles.resultTitle}>Resultado da análise:</Text>
                <Text style={styles.resultText}>{results}</Text>
              </View>
            ) : null}
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
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    padding: 20,
    gap: 10,
  },
  resultBox: {
    padding: 16,
    backgroundColor: "#f0fdf4",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#166534",
    marginBottom: 8,
  },
  resultText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },
  infoText: {
    color: "#D3D3D3",
    fontWeight: 200,
    textAlign: "center",
  },
});

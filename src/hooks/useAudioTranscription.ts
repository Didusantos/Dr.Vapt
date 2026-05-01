import { Audio } from "expo-av";
import { useState } from "react";
import { Alert } from "react-native";
import { api } from "../services/api";

export function useAudioTranscription(
  onTranscriptionComplete: (text: string) => void,
) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [transcription, setTranscription] = useState(false);

  const startRecording = async () => {
    try {
      const permissions = await Audio.requestPermissionsAsync();

      if (permissions.status !== "granted") {
        Alert.alert(
          "Erro de permissão",
          "A permissão para acessar o microfone foi negada",
        );
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      setRecording(recording);
    } catch (error) {
      console.error("Erro ao iniciar a gravação:", error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    setRecording(null);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

    const uri = recording.getURI();
    if (uri) await sendAudio(uri);
  };

  const sendAudio = async (fileUri: string) => {
    setTranscription(true);
    try {
      const transcribedText = await api.transcreverAudio(fileUri);
      onTranscriptionComplete(transcribedText);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível transcrever o áudio\nTente novamente mais tarde",
      );
    } finally {
      setTranscription(false);
    }
  };

  return { recording, transcription, startRecording, stopRecording };
}

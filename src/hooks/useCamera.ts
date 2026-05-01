import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Alert } from "react-native";

export function useCamera() {
  const [permission, setPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");

  const cameraRef = useRef<CameraView>(null);

  const toggleCameraType = () => {
    setFacing(facing === "back" ? "front" : "back");
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        return photo?.uri;
      } catch (error) {
        Alert.alert(
          "Erro",
          "Não foi possível tirar a foto. Tente novamente mais tarde.",
        );
      }
    }
  };

  return {
    permission,
    setPermission,
    facing,
    cameraRef,
    toggleCameraType,
    takePicture,
  };
}

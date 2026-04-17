import * as React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";

type IconButtonProps = TouchableOpacityProps & {
  label: string;
  iconColor: keyof typeof MD3Colors;
  imageIcon: string;
  btnColor: string;
  border: number;
  textColor: string;
};
export function IconButtonImage({
  label,
  iconColor,
  imageIcon,
  btnColor,
  border,
  textColor,
  ...rest
}: IconButtonProps) {
  return (
    <TouchableOpacity>
      <View
        style={[
          styles.container,
          { backgroundColor: btnColor, borderRadius: border },
        ]}
      >
        <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        <IconButton
          icon={imageIcon}
          iconColor={MD3Colors[iconColor]}
          size={20}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

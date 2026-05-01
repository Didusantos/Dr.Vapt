import * as React from "react";
import { StyleSheet, Text, TextProps, View } from "react-native";
import { Switch } from "react-native-paper";

type CustomTextProps = TextProps & {
  label: string;
};

export function SwitchButton({ label }: CustomTextProps) {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <View style={styles.container}>
      <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      <Text>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
});

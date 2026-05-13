import * as React from "react";
import { StyleSheet, Text, TextProps, View } from "react-native";
import { Switch } from "react-native-paper";

type CustomTextProps = TextProps & {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

export function SwitchButton({
  label,
  value,
  onValueChange,
  ...rest
}: CustomTextProps) {
  return (
    <View style={styles.container}>
      <Switch
        value={value}
        onValueChange={() => {
          onValueChange(!value);
        }}
      />
      <Text style={styles.label} {...rest}>
        {label}
      </Text>
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

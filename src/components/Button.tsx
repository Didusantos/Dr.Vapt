import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

type ButtonProps = TouchableOpacityProps & {
  label: string;
  color: string;
};

export function Button({ label, color, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: color }]}
      activeOpacity={0.6}
      {...rest}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

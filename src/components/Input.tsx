import { StyleSheet, TextInput, TextInputProps } from "react-native";
export function Input({ ...rest }: TextInputProps) {
  return <TextInput style={styles.input} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    borderWidth: 1,
    paddingLeft: 12,
    height: 48,
    borderColor: "#DCDCDC",
    borderRadius: 8,
    fontSize: 12,
  },
});

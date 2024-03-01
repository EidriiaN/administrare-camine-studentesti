import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ForgotPassword() {
  return (
    <View style={styles.container}>
      <Text> Am uitat parola</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
});

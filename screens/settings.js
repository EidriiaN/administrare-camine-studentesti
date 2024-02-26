import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF9F1",
    alignContent: "center",
    padding: "5%",
  },
  roomContainer: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: "2%",
  },
});

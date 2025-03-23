import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";

export default function Settings({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button title="Generare Word" onPress={() => navigation.navigate("GenerateWord")} />
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

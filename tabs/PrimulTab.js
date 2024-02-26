import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function PrimulTab() {
  return (
    <View style={styles.container}>
      <Text>Primul tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF9F1",
  },
});

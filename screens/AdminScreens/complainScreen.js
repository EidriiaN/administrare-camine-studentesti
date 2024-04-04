import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function ComplainScreen({ route }) {
  const { item } = route.params;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text
            style={{ textAlign: "center", fontSize: 20, marginBottom: "8%" }}
          >
            {item.option}
          </Text>
          <View style={styles.infoContainer}>
            <View style={{ gap: 5 }}>
              <Text>Student: {item.studentName}</Text>
              <Text>Camera: {item.room}</Text>
              <Text>Grad de urgentare: {item.emergency}</Text>
            </View>
            <View style={{ gap: 5 }}>
              {item.status === true ? (
                <Text style={{ color: "#00E200" }}>rezolvat</Text>
              ) : (
                <Text style={{ color: "#FAD800" }}>in asteptare</Text>
              )}
              <Text>Data: {item.date}</Text>
            </View>
          </View>
          <View>
            <Text>Mesaj:</Text>
            <Text style={{ textAlign: "justify", padding: "2%" }}>
              {item.message}
            </Text>
          </View>
          <View>
            <Text>Raspuns:</Text>
            <TextInput
              placeholder={"mesaj"}
              multiline
              style={{
                padding: 10,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
                textAlignVertical: "top",
                height: 150,
                marginBottom: 30,
              }}
            />
            <Button title="Trimite" />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const isWeb = Platform.OS === "web";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: isWeb ? "1%" : "2%",
  },
  contentContainer: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: isWeb ? "1%" : "3%",
    width: isWeb ? 700 : "100%",
    height: "100%",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5%",
  },
});

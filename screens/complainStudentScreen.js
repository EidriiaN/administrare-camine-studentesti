import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button, KeyboardAvoidingView, Platform } from "react-native";
import moment from "moment";

export default function ComplainStudentScreen({ route }) {
  const { item } = route.params;
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom: "8%" }}>{item.category}</Text>
          <View style={styles.infoContainer}>
            <View style={{ gap: 5 }}>
              <Text>
                Student: {item.name} {item.surname}
              </Text>
              <Text>Camera: {item.room_number}</Text>
              <Text>Grad de urgentare: {item.urgency}</Text>
            </View>
            <View style={{ gap: 5 }}>
              {item.status === true ? (
                <Text style={{ color: "#00E200", fontWeight: "bold" }}>rezolvat</Text>
              ) : (
                <Text style={{ color: "#FAD800", fontWeight: "bold" }}>in asteptare</Text>
              )}
              <Text>Data: {moment(item.report_date).format("DD:MM:YYYY")}</Text>
            </View>
          </View>
          <View>
            <Text>Mesaj:</Text>
            <Text
              style={{
                textAlign: "justify",
                marginTop: "1%",
                marginBottom: "2%",
                padding: "2%",
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              {item.message}
            </Text>
          </View>
          <View style={{ height: "30%" }}>
            <Text>Raspuns:</Text>
            {item.reponse ? (
              <Text style={{ marginTop: "1%", marginBottom: "2%", borderColor: "black", borderWidth: 1, borderRadius: 5, padding: "2%" }}>
                {item.response}
              </Text>
            ) : (
              <Text
                style={{
                  color: "gray",
                  textAlign: "center",
                  alignContent: "center",
                  height: "90%",
                  marginTop: "1%",
                  marginBottom: "2%",
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: "2%",
                }}
              >
                Inca nu ai primit raspuns...
              </Text>
            )}
          </View>
          <View style={{ marginTop: "auto", marginBottom: "5%" }}>
            <Button title="Sterge plangerea" />
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

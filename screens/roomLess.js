import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert, Platform, Modal, Pressable, ScrollView, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";

const isWeb = Platform.OS === "web";

const Container = isWeb ? View : ScrollView;

export default function RoomLess({ navigation }) {
  const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `https://${ip}:3000/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigation.replace("login");
      } else {
        Alert.alert("Logout failed");
      }
    } catch (error) {
      Alert.alert("An error occurred");
      console.error("Logout error:", error);
    }
  };
  return (
    <Container style={styles.container}>
      <View style={styles.complainContainer}>
        <Text style={{ fontSize: 30, textAlign: "center", marginBottom: "3%" }}>Status actual</Text>
        <View style={{ flex: 0.6, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 16, color: "gray", marginBottom: "2%" }}>Momentan nu ai o cameră alocată.</Text>
          <MaterialCommunityIcons name="emoticon-sad-outline" size={100} color="gray" />
        </View>
        <Button title="Deconectare" onPress={() => handleLogout()} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignContent: "center",
    margin: "3%",
  },
  complainContainer: {
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
    alignSelf: "center",
    flex: 1,
  },
});

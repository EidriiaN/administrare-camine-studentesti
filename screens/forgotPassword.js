import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert, Platform, Modal, Pressable, ScrollView, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import Loading from "../components/Loading";
import OneOptionModal from "../components/OneOptionModal";

const isWeb = Platform.OS === "web";
const Container = isWeb ? View : ScrollView;
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://${ip}:3000/forgotPassword`,
        { email },
        {
          withCredentials: true,
        }
      );

      setShowModal(true);
    } catch (error) {
      console.error("Error forgotPassword:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Container style={styles.container}>
      <View style={styles.complainContainer}>
        <Text style={{ fontSize: 26, textAlign: "center", marginBottom: "3%" }}>Cum imi pot recupera parola?</Text>
        <View style={{ flex: 0.6, justifyContent: "center", padding: "2%" }}>
          <Text style={{ fontSize: 20, color: "gray", marginBottom: "2%" }}>Adresa Email:</Text>
          <TextInput style={styles.input} value={email} onChangeText={(text) => setEmail(text)} keyboardType={"email-address"} inputMode={"email"} />
        </View>
        <Button title="Trimite" onPress={() => handleForgotPassword()} />
      </View>
      <OneOptionModal visible={showModal} text={"Succes"} textColor={true} onOption={() => setShowModal(false)} />
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
  input: {
    justifyContent: "center",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 7,
    color: "gray",
  },
});

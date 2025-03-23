import React, { useState } from "react";
import { View, Text, TextInput, Button, ActivityIndicator, Alert, Platform, Modal, Pressable, ScrollView, StyleSheet } from "react-native";
import Dropdown from "../../components/dropDown";
import OneOptionModal from "../../components/OneOptionModal";
import axios from "axios";
import Loading from "../../components/Loading";
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

const isWeb = Platform.OS === "web";

const Container = isWeb ? View : ScrollView;

export default function ComplainTab({ navigation }) {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedEmergency, setSelectedEmergency] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const complainData = {
        category: selectedValue,
        urgency: selectedEmergency,
        message: message,
      };

      const response = await axios.post(`https://${ip}:3000/addComplain`, complainData, {
        withCredentials: true,
      });

      setModalVisible(true);
      setSelectedValue("");
      setSelectedEmergency("");
      setMessage("");
    } catch (error) {
      console.error("Eroare la trimiterea anunțului:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const handleDisableButton = () => {
    if (!selectedValue || !selectedEmergency || !message) {
      return true;
    }
    return false;
  };

  return (
    <Container style={styles.container}>
      <View style={styles.complainContainer}>
        <Text style={{ fontSize: 30, textAlign: "center", marginBottom: "3%" }}>Reclamatii si plangeri</Text>
        <Dropdown
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          selectedEmergency={selectedEmergency}
          setSelectedEmergency={setSelectedEmergency}
          message={message}
          setMessage={setMessage}
        />
        <Button title="Trimite" onPress={handleSubmit} disabled={handleDisableButton()} />
        <Text style={{ marginTop: 20 }}>
          Atentie: *Pentru a asigura o gestionare eficientă a reclamațiilor, vă rugăm să folosiți acest canal doar pentru probleme reale și urgente,
          evitând reclamațiile fără rost sau în glumă. Mulțumim pentru înțelegere și colaborare!
        </Text>
      </View>
      <OneOptionModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          navigation.replace("home", { screen: "Reclamatii" });
        }}
        onOption={() => {
          setModalVisible(false);
          navigation.replace("home", { screen: "Reclamatii" });
        }}
      />
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

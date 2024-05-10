import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text, TextInput, Button, ActivityIndicator, Alert, Platform, Modal, Pressable } from "react-native";
import axios from "axios";
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

const Dropdown = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedEmergency, setSelectedEmergency] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const placeholder = {
    label: "Alege o optiune...",
  };

  const options = [
    { label: "Probleme de întreținere", value: "Probleme de întreținere" },
    { label: "Zgomot și perturbări", value: "Zgomot și perturbări" },
    { label: "Probleme legate de vecini", value: "Probleme legate de vecini" },
    { label: "Probleme cu mobilierul sau echipamentul", value: "Probleme cu mobilierul sau echipamentul" },
    { label: "Comunicare sau întrebări generale", value: "Comunicare sau întrebări generale" },
    { label: "Alte probleme", value: "Alte probleme" },
  ];

  const emergency = [
    { label: "Non-urgent", value: "Non-urgent" },
    { label: "Semi-urgent", value: "Semi-urgent" },
    { label: "Urgent", value: "Urgent" },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const complainData = {
        category: selectedValue,
        urgency: selectedEmergency,
        message: message,
      };

      const response = await axios.post(`http://${ip}:3000/addComplain`, complainData, {
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
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={Platform.OS == "web" ? 80 : "large"} color="#00BFFF" />
      </View>
    );
  }

  return (
    <View>
      <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 5 }}>Alege o optiune:</Text>
      <RNPickerSelect placeholder={placeholder} items={options} onValueChange={(value) => setSelectedValue(value)} value={selectedValue} />
      <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 5 }}>Grad de urgenta:</Text>
      <RNPickerSelect placeholder={placeholder} items={emergency} onValueChange={(value) => setSelectedEmergency(value)} value={selectedEmergency} />
      <Text style={{ fontSize: 18, marginBottom: "2%", marginTop: 5 }}>Scrie un mesaj:</Text>
      <TextInput
        placeholder={selectedValue ? "mesaj" : "selecteaza o optiune"}
        placeholderTextColor={!selectedValue || !selectedEmergency ? "#FF9494" : null}
        multiline
        editable={selectedValue && selectedEmergency ? true : false}
        value={message}
        onChangeText={(text) => setMessage(text)}
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
      <Button title="Trimite" onPress={handleSubmit} disabled={!selectedValue || !selectedEmergency || !message} />

      <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View style={{ width: "20%", backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" }}>
            <Text style={{ color: "#00E200", fontSize: 18, fontWeight: "bold", marginBottom: "10%" }}>Succes!</Text>
            <Button
              title="Inchide"
              onPress={() => {
                setModalVisible(false);
                navigation.replace("home", { screen: "Reclamatii" });
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Dropdown;

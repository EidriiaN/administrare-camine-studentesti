import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text, TextInput } from "react-native";

const Dropdown = ({ selectedValue, setSelectedValue, selectedEmergency, setSelectedEmergency, message, setMessage }) => {
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
    </View>
  );
};

export default Dropdown;

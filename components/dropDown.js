import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";
import { View, Text, TextInput, Button } from "react-native";

const Dropdown = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  const placeholder = {
    label: "Alege o optiune...",
    value: null,
  };

  const options = [
    { label: "Probleme de întreținere", value: "option1" },
    { label: "Zgomot și perturbări", value: "option2" },
    { label: "Probleme legate de vecini", value: "option3" },
    { label: "Probleme cu mobilierul sau echipamentul", value: "option4" },
    { label: "Comunicare sau întrebări generale", value: "option5" },
    { label: "Alte probleme", value: "option6" },
  ];
  const emergency = [
    { label: "Non-urgent", value: "option1" },
    { label: "Semi-urgent", value: "option2" },
    { label: "Urgent", value: "option3" },
  ];

  return (
    <View>
      <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 5 }}>
        Alege o optiune:
      </Text>
      <RNPickerSelect
        placeholder={placeholder}
        items={options}
        onValueChange={(value) => setSelectedValue(value)}
        value={selectedValue}
      />
      <Text style={{ fontSize: 20, marginBottom: 10, marginTop: 5 }}>
        Grad de urgenta:
      </Text>
      <RNPickerSelect
        placeholder={placeholder}
        items={emergency}
        onValueChange={(value) => setSelectedEmergency(value)}
        value={selectedEmergency}
      />
      <Text style={{ fontSize: 18, marginBottom: "2%", marginTop: 5 }}>
        Scrie un mesaj:
      </Text>
      <TextInput
        placeholder={selectedValue ? "mesaj" : "selecteaza o optiune"}
        placeholderTextColor={
          !selectedValue || !selectedEmergency ? "#FF9494" : null
        }
        multiline
        editable={selectedValue && selectedEmergency ? true : false}
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
  );
};

export default Dropdown;

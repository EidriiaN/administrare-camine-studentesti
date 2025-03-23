import React, { useState } from "react";
import { View, Button, Alert, TextInput, Platform, Text } from "react-native";
import axios from "axios";
import * as FileSystem from "expo-file-system";

// Definește IP-ul serverului în funcție de platformă
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

export default function GenerateWord() {
  const [name, setName] = useState("");
  const [lname, setLName] = useState("");

  const handleGenerateWord = async () => {
    const userData = {
      name: name,
      lname: lname,
    };
    console.log(userData);
    try {
      const response = await axios.post(
        `https://${ip}:3000/generateWord`,
        { userData },
        {
          withCredentials: true,
          responseType: "blob",
        }
      );

      const filePath = `${FileSystem.documentDirectory}generated-document.docx`;
      await FileSystem.writeAsStringAsync(filePath, response.data, {
        encoding: FileSystem.EncodingType.Base64,
      });
      Alert.alert("Document generated", `Saved to ${filePath}`);
    } catch (error) {
      console.error("Error generating document:", error);
      Alert.alert("Error", "Failed to generate document");
    }
  };

  return (
    <View>
      <Text>Formular</Text>
      <TextInput onChangeText={(text) => setName(text)} value={name} placeholder="Numele" />
      <TextInput onChangeText={(text) => setLName(text)} value={lname} placeholder="Prenumele" />
      <Button title="Generează Word" onPress={handleGenerateWord} />
    </View>
  );
}

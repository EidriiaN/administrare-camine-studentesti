import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://3.75.158.163:3000"; // Inlocuieste cu adresa IP a serverului

const Test = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        password,
      });
      console.log(response.data.message);
    } catch (error) {
      console.error("Eroare la înregistrare:", error.response.data.error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      const token = response.data.token;

      // Salvează token-ul pe dispozitiv
      await AsyncStorage.setItem("token", token);

      console.log("Autentificare reușită. Token:", token);
    } catch (error) {
      console.error("Eroare la autentificare:", error.response.data.error);
    }
  };

  return (
    <View>
      <Text>Username:</Text>
      <TextInput value={username} onChangeText={setUsername} />

      <Text>Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Înregistrare" onPress={handleRegister} />
      <Button title="Autentificare" onPress={handleLogin} />
    </View>
  );
};

export default Test;

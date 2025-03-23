import React from "react";
import { EXPO_PUBLIC_URL } from "@env";
import { useState } from "react";
import axios from "axios";
import OneOptionModal from "../components/OneOptionModal";
import Loading from "../components/Loading";
import { View, Image, Text, TextInput, Button, Keyboard, KeyboardAvoidingView, Platform, Pressable, StyleSheet } from "react-native";
const logo = require("../assets/logo-upg-2.png");

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

  const validateForm = () => {
    let errors = {};

    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const credentials = {
      email: email,
      password: password,
    };

    try {
      setLoading(true);
      const response = await axios.post(`https://${ip}:3000/login`, credentials, { withCredentials: true });

      if (response.status === 200) {
        console.log("Autentificare reușită!");
        const userData = response.data.userData;
        userData.role === "admin" ? navigation.navigate("homeAdmin", { userData }) : navigation.navigate("home", { userData });
      }
    } catch (error) {
      console.error("Eroare:", error);
      setEmail("");
      setPassword("");
      setErrors({});
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-160} style={styles.container}>
      <View style={styles.form}>
        <Image style={styles.logo} source={logo} resizeMode="contain" />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter your email" />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Enter your password" secureTextEntry />
        {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
        <Button title="Login" onPress={handleSubmit} />
        <View
          style={{
            marginTop: "8%",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignContent: "center",
            gap: 10,
          }}
        >
          <Pressable
            onPress={() => {
              navigation.navigate("register");
            }}
          >
            <Text style={{ fontSize: 15, color: "gray" }}>Inregistrare</Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("forgotPassword");
            }}
          >
            <Text style={{ fontSize: 15, color: "gray" }}>Am uitat parola</Text>
          </Pressable>
        </View>
      </View>
      <OneOptionModal visible={showModal} text={"Nume sau parolă gresită"} textColor={false} onOption={() => setShowModal(false)} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  form: {
    width: Platform.OS === "web" ? 700 : null,
    alignSelf: Platform.OS == "web" ? "center" : null,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 7,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

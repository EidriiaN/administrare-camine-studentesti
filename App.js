import { URL } from "./constans";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, BackHandler, ActivityIndicator, View, Platform, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/login";
import Home from "./screens/home";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import MyRoom from "./screens/myRoom";
import Settings from "./screens/settings";
import Register from "./screens/register";
import ForgotPassword from "./screens/forgotPassword";
import HomeAdmin from "./screens/homeAdmin";
import ComplainScreen from "./screens/AdminScreens/complainScreen";
import RequestsAccountScreen from "./screens/AdminScreens/requestsAccountScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [role, setRole] = useState("");
  const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;
  console.log(ip, "ip app.js");

  useEffect(() => {
    const handleBackButton = () => {
      Alert.alert(
        "Exit From App",
        "Do you want to exit from the app?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel"),
            style: "cancel",
          },
          { text: "OK", onPress: () => BackHandler.exitApp() },
        ],
        { cancelable: false }
      );
      return true;
    };

    if (Platform.OS === "android" || Platform.OS === "ios") {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    }

    return () => {
      if (Platform.OS === "android" || Platform.OS === "ios") {
        BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
      }
    };
  }, []);

  useEffect(() => {
    const checkIfIsLogged = async () => {
      try {
        if (isLogged === true) {
          setIsCheckingSession(false);
          return;
        }
        const response = await axios.get(`http://${ip}:3000/checkSession`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setIsLogged(true);
          setRole(response.data);
        } else {
          console.log("Nu exista sesiune");
        }
      } catch (error) {
        console.error("Eroare in verificarea sesiunii:", error);
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkIfIsLogged();
  }, []);

  if (isCheckingSession) {
    // Încă se verifică sesiunea, puteți afișa, de exemplu, un ecran de încărcare
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={Platform.OS == "web" ? 80 : "large"} color="#00BFFF" />
      </View>
    );
  }

  console.log(isLogged, "loguri1");
  console.log(role, "loguri2");
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator initialRouteName={isLogged === true ? (role === "admin" ? "homeAdmin" : "home") : "login"}>
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="register" component={Register} options={{ headerTitle: "Inregistrare", headerTitleAlign: "center" }} />
        <Stack.Screen
          name="forgotPassword"
          component={ForgotPassword}
          options={{
            headerTitle: "Am uitat parola",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="home"
          component={Home}
          options={{
            headerTitle: "Caminul 6",
            headerTitleAlign: "center",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="homeAdmin"
          component={HomeAdmin}
          options={{
            headerTitle: "Admin",
            headerTitleAlign: "center",
            headerShown: false,
          }}
        />
        <Stack.Screen name="myRoom" component={MyRoom} options={{ headerTitle: "Camera 4" }} />
        <Stack.Screen name="settings" component={Settings} options={{ headerTitle: "Setari" }} />
        <Stack.Screen name="ComplainScreen" component={ComplainScreen} options={{ headerTitle: "Lista cu plangeri" }} />
        <Stack.Screen name="RequestsAccountScreen" component={RequestsAccountScreen} options={{ headerTitle: "Conturi in Asteptare" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

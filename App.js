import { EXPO_PUBLIC_API_URL } from "@env";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  BackHandler,
  ActivityIndicator,
  View,
  Platform,
  Pressable,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/login";
import Home from "./screens/home";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import MyRoom from "./screens/myRoom";
import Settings from "./screens/settings";
import Register from "./screens/register";

const Stack = createNativeStackNavigator();
console.log(EXPO_PUBLIC_API_URL, "env");

export default function App() {
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

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
        const response = await axios.get(
          `http://${EXPO_PUBLIC_API_URL}:3000/checkSession`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setIsLogged(true);
          console.log(isLogged, "merge");
        }
      } catch (error) {
        // Gestionare eroare: afișați un mesaj sau faceți altceva pentru a informa utilizatorii despre o eroare
        console.error("Error checking session:", error.message);
      } finally {
        // Indiferent de rezultat, setați starea de verificare a sesiunii ca fiind finalizată
        setIsCheckingSession(false);
      }
    };
    console.log(EXPO_PUBLIC_API_URL, "env2");
    checkIfIsLogged();
  }, []);

  if (isCheckingSession) {
    // Încă se verifică sesiunea, puteți afișa, de exemplu, un ecran de încărcare
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          size={Platform.OS == "web" ? 80 : "large"}
          color="#00BFFF"
        />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator initialRouteName={isLogged === true ? "home" : "login"}>
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerTitle: "Inregistrare", headerTitleAlign: "center" }}
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
          name="myRoom"
          component={MyRoom}
          options={{ headerTitle: "Camera 4" }}
        />
        <Stack.Screen
          name="settings"
          component={Settings}
          options={{ headerTitle: "Setari" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

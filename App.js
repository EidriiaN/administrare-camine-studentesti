import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Alert,
  BackHandler,
  ActivityIndicator,
  View,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/login";
import Home from "./screens/home";
import Test from "./screens/test";
import axios from "axios";
import { useLoading } from "./components/LoadingContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const { showLoading, hideLoading } = useLoading();

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
        showLoading();
        const response = await axios.get("http://localhost:3000/checkSession", {
          withCredentials: true,
        });

        if (response.status === 200) {
        }
      } catch (error) {
        // Gestionare eroare: afișați un mesaj sau faceți altceva pentru a informa utilizatorii despre o eroare
        console.error("Error checking session:", error);
      } finally {
        // Indiferent de rezultat, setați starea de verificare a sesiunii ca fiind finalizată
        setIsCheckingSession(false);
        hideLoading();
      }
    };

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
      <StatusBar style="inverted" />

      <Stack.Navigator>
        {isLogged ? (
          <>
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="test" component={Test} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="home" component={Home} />
            <Stack.Screen name="test" component={Test} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

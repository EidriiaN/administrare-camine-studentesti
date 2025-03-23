import React from "react";
import { View, StyleSheet, Text, FlatList, Pressable, Platform, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "../../tabs/UserTabs/homeTab";
import ComplainTab from "../../tabs/UserTabs/complainTab";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import ListComplainTab from "../../tabs/UserTabs/listComplainTab";
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `https://${ip}:3000/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        navigation.replace("login");
      } else {
        Alert.alert("Logout failed");
      }
    } catch (error) {
      Alert.alert("An error occurred");
      console.error("Logout error:", error);
    }
  };
  return (
    <View style={{ overflow: "hidden", height: "100%" }}>
      <Tab.Navigator
        initialRouteName="Acasa"
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "white",
          },
          headerTitle: "Caminul 6",
          headerTitleAlign: "center",
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={{ marginRight: 15 }}
                onPress={() => {
                  navigation.navigate("settings");
                }}
              >
                <FontAwesome5 name="cog" size={24} color="black" />
              </Pressable>
              <Pressable style={{ marginRight: 15 }} onPress={handleLogout}>
                <MaterialIcons name="logout" size={24} color="black" />
              </Pressable>
            </View>
          ),
        }}
      >
        <Tab.Screen
          name="Lista cereri"
          component={ListComplainTab}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome6 name="list-check" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Acasa"
          component={HomeTab}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Reclamatii"
          component={ComplainTab}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome5 name="book" size={24} color={color} />,
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

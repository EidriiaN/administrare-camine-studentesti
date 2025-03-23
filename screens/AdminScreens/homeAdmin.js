import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Pressable, ActivityIndicator, Platform, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "../../tabs/UserTabs/homeTab";
import ComplainTab from "../../tabs/UserTabs/complainTab";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import HomeAdminTab from "../../tabs/AdminTabs/homeAdminTab";
import axios from "axios";
import ListComplainAdminTab from "../../tabs/AdminTabs/listComplainAdminTab";
import RequestsAdminTab from "../../tabs/AdminTabs/requestsAdminTab";
import AnnouncesAdminTab from "../../tabs/AdminTabs/announcesAdminTab";
import RoomsAdminTab from "../../tabs/AdminTabs/roomsAdminTab";
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

const Tab = createBottomTabNavigator();

export default function HomeAdmin({ navigation, route }) {
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
          headerTitle: "Administrator",
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
          component={ListComplainAdminTab}
          // initialParams={{ userData: userData }}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome6 name="list-check" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Anunturi"
          component={AnnouncesAdminTab}
          // initialParams={{ userData: userData }}
          options={{
            tabBarIcon: ({ color }) => <MaterialIcons name="announcement" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Acasa"
          component={HomeAdminTab}
          // initialParams={{ userData: userData }}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Camere"
          component={RoomsAdminTab}
          options={{
            tabBarIcon: ({ color }) => <FontAwesome6 name="house-user" size={24} color={color} />,
          }}
        />
        <Tab.Screen
          name="Conturi in asteptare"
          component={RequestsAdminTab}
          // initialParams={{ userData: userData }}
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

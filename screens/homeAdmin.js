import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList, Pressable, ActivityIndicator, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeTab from "../tabs/homeTab";
import ComplainTab from "../tabs/complainTab";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import HomeAdminTab from "../tabs/AdminTabs/homeAdminTab";
import axios from "axios";
import ListComplainAdminTab from "../tabs/AdminTabs/listComplainAdminTab";
import RequestsAdminTab from "../tabs/AdminTabs/requestsAdminTab";
import AnnouncesAdminTab from "../tabs/AdminTabs/announcesAdminTab";

const Tab = createBottomTabNavigator();

export default function HomeAdmin({ navigation, route }) {
  const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;
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
            <Pressable
              style={{ marginRight: 10 }}
              onPress={() => {
                navigation.navigate("settings");
              }}
            >
              <FontAwesome5 name="cog" size={24} color="black" />
            </Pressable>
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

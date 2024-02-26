import React from "react";
import { View, StyleSheet, Text, FlatList, Pressable } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PrimulTab from "../tabs/PrimulTab";
import HomeTab from "../tabs/homeTab";
import ComplainTab from "../tabs/complainTab";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Home({ navigation }) {
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
          component={PrimulTab}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome6 name="list-check" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Acasa"
          component={HomeTab}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="home" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Reclamatii"
          component={ComplainTab}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="book" size={24} color={color} />
            ),
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

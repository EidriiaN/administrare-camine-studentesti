import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PrimulTab from "../tabs/PrimulTab";
import HomeTab from "../tabs/homeTab";
import TreiTab from "../tabs/TreiTab";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Home() {
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
            <View style={{marginRight:10}}>
              <FontAwesome5 name="cog" size={24} color="black" />
            </View>
          ),
        }}
      >
        <Tab.Screen name="Nu stiu" component={PrimulTab} />
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
          component={TreiTab}
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

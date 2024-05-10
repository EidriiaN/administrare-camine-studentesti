import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Platform, TouchableOpacity, Pressable, Button, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import moment from "moment";
const isWeb = Platform.OS === "web";

export default function RequestsAdminTab({ navigation }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoding] = useState(true);
  const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

  useEffect(() => {
    const checkRequestsAccounts = async () => {
      try {
        if (isLoading === false) {
          return;
        }
        const response = await axios.post(`http://${ip}:3000/getRegister-requests`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setIsLoding(false);
          setData(response.data);
        }
      } catch (error) {
        console.error("Eroare conturi in asteptare:", error);
      } finally {
        setIsLoding(false);
      }
    };

    checkRequestsAccounts();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={Platform.OS == "web" ? 80 : "large"} color="#00BFFF" />
      </View>
    );
  }

  const renderItem = ({ item, index }) => {
    const formattedDate = moment(item.register_date).format("DD:MM:YYYY");

    return isWeb ? (
      <View style={{ margin: "1%" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            borderRadius: 8,
            borderStyle: "solid",
            borderWidth: 0.8,
            padding: 10,
            backgroundColor: "white",
          }}
          onPress={() => {
            navigation.navigate("RequestsAccountScreen", { item });
          }}
        >
          <View style={{ width: "40%" }}>
            <Text style={{ fontSize: 16 }}>
              {item.name} {item.surname}
            </Text>
            <Text style={{ fontSize: 15 }}>{item.studyProgram}</Text>
          </View>
          <View style={{ width: "40%" }}>
            <Text style={{ fontSize: 16 }}>{item.faculty}</Text>
            <Text style={{ fontSize: 16 }}>{item.specialization}</Text>
          </View>
          <View style={{ width: "20%", alignItems: "flex-end" }}>
            <Text style={{ fontSize: 14 }}>{formattedDate}</Text>
            {item.status === "pending" ? (
              <Text style={{ fontSize: 14, color: "#FAD800" }}>in asteptare</Text>
            ) : item.status === "approved" ? (
              <Text style={{ fontSize: 14, color: "#00E200" }}>aprobat</Text>
            ) : (
              <Text style={{ fontSize: 14, color: "#FF2A04" }}>respins</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    ) : (
      <View>
        <View style={{ margin: "1%" }}>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderRadius: 8,
              borderStyle: "solid",
              borderWidth: 0.8,
              padding: 10,
              backgroundColor: "white",
            }}
            onPress={() => {
              navigation.navigate("RequestsAccountScreen", { item });
            }}
          >
            <View>
              <Text style={{ fontSize: 16 }}>
                {item.name} {item.surname}
              </Text>
              <Text style={{ fontSize: 15 }}>{item.studyProgram}</Text>

              <Text style={{ fontSize: 16 }}>{item.faculty}</Text>
              <Text style={{ fontSize: 16 }}>{item.specialization}</Text>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 14 }}>{formattedDate}</Text>
              {item.status === "pending" ? (
                <Text style={{ fontSize: 14, color: "#FAD800" }}>in asteptare</Text>
              ) : item.status === "approved" ? (
                <Text style={{ fontSize: 14, color: "#00E200" }}>aprobat</Text>
              ) : (
                <Text style={{ fontSize: 14, color: "#FF2A04" }}>respins</Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={{ alignSelf: "center", fontSize: 20, marginBottom: "5%" }}>Inregistrari in asteptare</Text>
        <FlatList
          data={data} // Datele listei
          renderItem={renderItem} // Funcția pentru a randează fiecare element
          keyExtractor={(item) => item.id} // Extrage un identificator unic pentru fiecare element
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: isWeb ? "1%" : "2%",
    gap: 10,
  },
  contentContainer: {
    flex: 1,
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: isWeb ? "1%" : "3%",
    width: isWeb ? 700 : "100%",
  },
  sortContainer: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: isWeb ? "1%" : "3%",
    width: isWeb ? 700 : "100%",
  },
});

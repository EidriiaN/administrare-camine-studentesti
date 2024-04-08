import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Platform, TouchableOpacity, Pressable, Button, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
const isWeb = Platform.OS === "web";

export default function RequestsAdminTab({ navigation }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoding] = useState(true);
  const ip = "localhost";

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
    // Încă se verifică sesiunea, puteți afișa, de exemplu, un ecran de încărcare
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={Platform.OS == "web" ? 80 : "large"} color="#00BFFF" />
      </View>
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ margin: "1%" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 8,
            borderStyle: "solid",
            borderWidth: 0.8,
            padding: 10,
            backgroundColor: "white",
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 19 }}>
              {item.name} {item.surname}
            </Text>
            <Text style={{ fontSize: 18 }}>{item.studyProgram}</Text>
            {item.status === true ? (
              <Text style={{ fontSize: 15, color: "#00E200" }}>rezolvat</Text>
            ) : (
              <Text style={{ fontSize: 15, color: "#FAD800" }}>in asteptare</Text>
            )}
            <Text style={{ fontSize: 13 }}>{item.status}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 15 }}>{item.date}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>Inregistrari in asteptare</Text>
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
    width: isWeb ? 700 : null,
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

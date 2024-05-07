import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView, ActivityIndicator, Platform, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
const isWeb = Platform.OS === "web";
const Container = isWeb ? ScrollView : View;

export default function HomeAdminTab({ navigation, route }) {
  const [isLoading, setIsLoding] = useState(true);
  const [data, setData] = useState({});
  const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

  useEffect(() => {
    const checkIfIsLogged = async () => {
      try {
        if (isLoading === false) {
          return;
        }
        const response = await axios.get(`http://${ip}:3000/getAdminData`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setIsLoding(false);
          setData(response.data);
        }
      } catch (error) {
        console.error("Eroare:", error);
      } finally {
        setIsLoding(false);
      }
    };

    checkIfIsLogged();
  }, []);

  if (isLoading) {
    // Încă se verifică sesiunea, puteți afișa, de exemplu, un ecran de încărcare
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={Platform.OS == "web" ? 80 : "large"} color="#00BFFF" />
      </View>
    );
  }

  return (
    <Container style={styles.container}>
      <View style={styles.welcome}>
        <Text style={{ fontSize: 22 }}>Bine ai venit, {data.lastName} 👋</Text>
      </View>
      {/* <View style={styles.top}>
        <Pressable
          onPress={() => {
            navigation.navigate("myRoom");
          }}
          style={styles.top_containers}
        >
          <Text>Informatii camin</Text>
        </Pressable>
        <View style={styles.top_containers}>
          <Text>Reclamatii noi:</Text>
          <Text>10 in asteptare</Text>
        </View>
      </View> */}
      <View style={styles.top_containers2}>
        <Text style={styles.text_label}>Caminul {data.dormNumber}</Text>
        <Text>Strada Universității, Nr. 123</Text>
        <Text> Număr total de camere: 100</Text>
        <Text>Capacitate totală de locuri: {data.dormCapacity} </Text>
      </View>
      <View style={styles.top_containers2}>
        <Text style={styles.text_label}>Stare generală a căminului</Text>
        <Text style={{ color: "#FF2A04" }}>10 probleme urgente</Text>
        <Text style={{ color: "#FFAF3D" }}>5 probleme semi-urgente</Text>
        <Text style={{ color: "#FAD800" }}>1 problema non-urgenta</Text>
      </View>
      <View style={styles.top_containers2}>
        <Text style={styles.text_label}>Analiză costuri</Text>
        <Text>Costul Electricității în ultima lună: $200</Text>
        <Text>Costul Apei în ultima lună: $50</Text>
        <Text>Total Costuri: $250</Text>
      </View>
      <View style={styles.top_containers2}>
        <Text style={styles.text_label}>Cheltuieli de cazare</Text>
        <Text>Tarif Standard pe Lună: $300</Text>
        <Text>Total anticipat: 20000$</Text>
        <Text>Total costuri: $250</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: "#f5f5f5",
    paddingStart: isWeb ? "15%" : null,
    paddingEnd: isWeb ? "15%" : null,
  },
  welcome: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: "3%",
    marginBottom: "3%",
    marginStart: isWeb ? null : "5%",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "20%",
  },
  top_containers: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "60%",
    width: "40%",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  top_containers2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: "20%",
    width: "100%",
    marginBottom: "3%",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text_label: {
    marginBottom: "2%",
    paddingBottom: "1%",
    borderBottomColor: "#b6b6b6",
    borderBottomWidth: 3,
  },
});

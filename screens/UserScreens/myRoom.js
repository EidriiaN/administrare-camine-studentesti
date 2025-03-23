import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Platform, Button } from "react-native";
import axios from "axios";
import Loading from "../../components/Loading";
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

export default function MyRoom({ navigation }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://${ip}:3000/getRoomData`, { withCredentials: true });
        setData(response.data);
      } catch (error) {
        console.log(error, "Error getRoomData");
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  console.log(data, "data");

  if (loading) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.roomContainer}>
        <View key={data.id} style={styles.itemContainer}>
          <Text style={styles.title}>{data.full_name}</Text>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Detalii despre camera</Text>
            <Text>Camera: {data.room_number}</Text>
            <Text>Etaj: {data.floor}</Text>
            <Text>Colegi de camera: {data.roommates}</Text>
            <Text>Pret camera: {data.rent_price} ron</Text>
            <Text>Ultima renovare: {new Date(data.last_renovation).toLocaleDateString()}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informatii Camin</Text>
            <Text>Numărul caminului: {data.dorm_number}</Text>
            <Text>Administrator: {data.admin_full_name}</Text>
            <Text>Șef camin: {data.dorm_president}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact</Text>
            <Text>Email: {data.email}</Text>
            <Text>Telefon: {data.phone_number}</Text>
          </View>
        </View>

        <Button title="Permis parcare" onPress={() => navigation.navigate("ParkingRequest")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    padding: "5%",
  },
  roomContainer: {
    width: Platform.OS === "web" ? 700 : null,
    backgroundColor: "white",
    borderColor: "black",
    padding: "2%",
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
  itemContainer: {
    marginBottom: 20,
  },
  title: {
    alignSelf: "center",
    marginBottom: "3%",
    fontSize: 30,
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

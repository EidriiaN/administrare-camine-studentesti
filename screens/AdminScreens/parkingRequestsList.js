import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Platform, TouchableOpacity, Pressable, Button, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import moment from "moment";
const isWeb = Platform.OS === "web";
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

export default function ParkingRequestsList({ navigation }) {
  const [parkingData, setParkingData] = useState();
  const [sortedData, setSortedData] = useState();
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getComplainData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://${ip}:3000/getParkingRequests`, {
          withCredentials: true,
        });

        setParkingData(response.data);
        setSortedData(response.data);
      } catch (error) {
        console.error("Error getComplains:", error);
      } finally {
        setLoading(false);
      }
    };
    getComplainData();
  }, []);

  console.log(sortedData, "parking data");

  const sortDataByDate = () => {
    const sorted = [...sortedData].sort((a, b) => {
      const dateA = new Date(a.report_date).setHours(0, 0, 0, 0);
      const dateB = new Date(b.report_date).setHours(0, 0, 0, 0);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortedData(sorted);
    setSortBy("Date");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortDataByUrgency = () => {
    const urgencyOrder = { "Non-urgent": 0, "Semi-urgent": 1, Urgent: 2 };
    const sorted = [...sortedData].sort((a, b) => {
      return sortOrder === "asc" ? urgencyOrder[a.urgency] - urgencyOrder[b.urgency] : urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
    });
    setSortedData(sorted);
    setSortBy("Urgency");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortDataByStatus = () => {
    const sorted = [...sortedData].sort((a, b) => {
      return sortOrder === "asc" ? (a.status === b.status ? 0 : a.status ? 1 : -1) : a.status === b.status ? 0 : a.status ? -1 : 1;
    });
    setSortedData(sorted);
    setSortBy("Status");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  console.log(parkingData, "parkingdata");

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ margin: "1%" }}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 8,
            borderStyle: "solid",
            borderWidth: 0.8,
            padding: 10,
            backgroundColor: "white",
          }}
          onPress={() => {
            navigation.navigate("ParkingRequestScreenAdmin", { item });
          }}
        >
          <View style={{ flexDirection: "column", width: "70%", justifyContent: "center" }}>
            <View style={{ flexDirection: "row", gap: 5 }}>
              <Text style={{ fontSize: 15 }}>{item.full_name},</Text>
              <Text style={{ fontSize: 14 }}>Media: {item.average_grade}</Text>
            </View>
            <Text style={{ fontSize: 14 }}>Nr.inmatriculare: {item.vehicle_registration_number}</Text>
            {item.status === "approved" ? (
              <Text style={{ color: "#00E200" }}>rezolvat</Text>
            ) : item.status === "rejected" ? (
              <Text style={{ color: "#FF0000" }}>respins</Text>
            ) : (
              <Text style={{ color: "#FAD800" }}>in asteptare</Text>
            )}
          </View>
          <View
            style={{
              flexDirection: "collumn",
              width: "30%",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 13 }}>Camera: {item.room_number}</Text>
            <Text style={{ fontSize: 13 }}>{moment(item.report_date).format("DD:MM:YYYY")}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={Platform.OS == "web" ? 80 : "large"} color="#00BFFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.sortContainer}>
        <View
          style={{
            flexDirection: "row",
            marginBottom: "2%",
          }}
        >
          <Text style={{ fontSize: 18 }}>Sortare</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              width: "90%",
            }}
          >
            <Button title="Status" onPress={sortDataByStatus} />
            <Button title="Data" onPress={sortDataByDate} />
            {/* <Button title="Urgentare" onPress={sortDataByUrgency} /> */}
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Button title="Cereri studenti" color={"gray"} onPress={() => navigation.replace("homeAdmin", { screen: "Lista cereri" })} />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <FlatList
          data={sortedData} // Datele listei
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

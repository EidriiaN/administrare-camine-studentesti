import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity, ScrollView, Platform, Pressable, ActivityIndicator } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import moment from "moment";
const isWeb = Platform.OS === "web";
const Container = isWeb ? ScrollView : View;
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

export default function HomeTab({ navigation }) {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [announcesData, setAnnouncesData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userInfoResponse = await axios.get(`https://${ip}:3000/getUserInfo`, { withCredentials: true });
        if (userInfoResponse.data.room_number == null) {
          console.log(userInfoResponse);
          return navigation.replace("RoomLess");
        }
        setUserData(userInfoResponse.data);
        console.log(userInfoResponse.data);

        const announcesResponse = await axios.get(`https://${ip}:3000/getAnnounces`, { withCredentials: true });
        setAnnouncesData(announcesResponse.data);
      } catch (error) {
        console.error("Eroare", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item, index }) => {
    const formattedDate = moment(item.publication_date).format("DD:MM:YYYY");
    return (
      <View key={index} style={{ margin: "1%" }}>
        <TouchableOpacity
          onPress={() => setDropdownIndex(dropdownIndex === index ? null : index)}
          style={{
            flexDirection: isWeb ? "row" : "column",
            alignItems: isWeb ? "center" : null,
            justifyContent: "space-between",
            borderRadius: 8,
            borderStyle: "solid",
            borderWidth: 0.8,
            padding: 10,
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontSize: 17 }}>{item.title}</Text>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 16, marginLeft: "auto" }}>{item.author}</Text>
            <Text style={{ fontSize: 16 }}>{moment(item.publication_date).format("DD:MM:YYYY")}</Text>
            <AntDesign name={dropdownIndex === index ? "caretup" : "caretdown"} size={14} color={dropdownIndex === index ? "black" : "gray"} />
          </View>
        </TouchableOpacity>
        {dropdownIndex === index && (
          <View
            style={{
              height: "auto",
              gap: 20,
              backgroundColor: "#FBF9F1",
              padding: 8,
              margin: 5,
              shadowColor: "black",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.25,
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            <Text style={{ textAlign: "left", fontSize: 16 }}>{item.message}</Text>
          </View>
        )}
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
    <Container style={styles.container}>
      <View style={styles.welcome}>
        <Text style={{ fontSize: 28 }}>Bine ai venit, {userData.surname} 👋</Text>
      </View>
      <View style={styles.top}>
        <Pressable
          onPress={() => {
            navigation.navigate("myRoom");
          }}
          style={styles.top_containers}
        >
          <Text>Camera</Text>
          <Text>{userData.room_number}</Text>
        </Pressable>
        <View style={styles.top_containers}>
          <Text>Camere libere</Text>
          <Text>
            {userData.free_rooms}/{userData.num_total_rooms}
          </Text>
        </View>
      </View>

      <Text
        style={{
          alignSelf: "flex-start",
          fontSize: 28,
          marginStart: isWeb ? null : "3%",
        }}
      >
        Anunturi importante!
      </Text>
      <FlatList
        data={announcesData} // Datele listei
        renderItem={renderItem} // Funcția pentru a randează fiecare element
        keyExtractor={(item) => item.id} // Extrage un identificator unic pentru fiecare element
        style={styles.flatListContainer} // Adaugarea stilurilor la FlatList direct
        initialNumToRender={2}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    paddingStart: isWeb ? "15%" : null,
    paddingEnd: isWeb ? "15%" : null,
  },
  welcome: {
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 10,
    marginStart: isWeb ? null : "3%",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
  },
  top_containers: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    height: 100,
    width: "30%",
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
  flatListContainer: {
    borderRadius: 6,
    marginTop: "3%",
    margin: "2%",
    height: isWeb ? 370 : "65%",
  },
});

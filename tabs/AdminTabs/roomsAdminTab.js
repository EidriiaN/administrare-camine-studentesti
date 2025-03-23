import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Platform, TouchableOpacity, Pressable, Button, FlatList, ActivityIndicator, TextInput } from "react-native";
import Loading from "../../components/Loading";
import axios from "axios";
import moment from "moment";
const isWeb = Platform.OS === "web";

export default function RoomsAdminTab({ navigation }) {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoding] = useState(true);
  const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

  useEffect(() => {
    const getRooms = async () => {
      try {
        if (isLoading === false) {
          return;
        }
        const response = await axios.get(`https://${ip}:3000/getRooms`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setIsLoding(false);
          setData(response.data);
          setFilteredData(response.data);
        }
      } catch (error) {
        console.error("Erroare la primirea camerelor:", error);
      } finally {
        setIsLoding(false);
      }
    };

    getRooms();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filtered = data.filter((item) => {
        const itemData = `${item.room_number} ${item.students_in_room} ${item.students.map((student) => student.name).join(" ")}`.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const renderItem = ({ item, index }) => {
    const formattedDate = moment(item.last_renovation).format("DD:MM:YYYY");

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
            justifyContent: "center",
          }}
          onPress={() => {
            navigation.navigate("Room", { item });
          }}
        >
          <View style={{ width: "20%" }}>
            <Text style={{ fontSize: 16 }}>Camera: {item.room_number}</Text>
            <Text style={{ fontSize: 15 }}>Etaj: {item.floor}</Text>
          </View>
          <View style={{ width: "30%" }}>
            <Text style={{ fontSize: 16 }}>Locuri in camera: {item.room_capacity}</Text>
            <Text style={{ fontSize: 15 }}>Paturi libere: {item.free_beds}</Text>
          </View>
          <View style={{ width: "30%" }}>
            <Text style={{ fontSize: 16 }}>Studenti cazati: {item.students_in_room}</Text>
            <Text style={{ fontSize: 15 }}>Ultima renovare: {formattedDate}</Text>
          </View>
          <View style={{ width: "20%", alignItems: "flex-end" }}>
            <Text style={{ fontSize: 16 }}>Studenti:</Text>
            {item.students.map((student, index) => (student.name ? <Text key={index}>{student.name}</Text> : null))}
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
              navigation.navigate("Room", { item });
            }}
          >
            <View>
              <Text style={{ fontSize: 16 }}>Camera: {item.room_number}</Text>
              <Text style={{ fontSize: 15 }}>Etaj: {item.floor}</Text>

              <Text style={{ fontSize: 16 }}>Locuri in camera: {item.room_capacity}</Text>
              <Text style={{ fontSize: 15 }}>Paturi libere: {item.free_beds}</Text>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontSize: 14 }}>Studenti cazati: {item.students_in_room}</Text>
              <Text style={{ fontSize: 14 }}>Studenti:</Text>
              {item.students.map((students, index) => (
                <Text key={index}>{students.name}</Text>
              ))}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={{ alignSelf: "center", fontSize: 20, marginBottom: "3%" }}>Camere</Text>
        <TextInput
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderColor: "#ccc",
            borderWidth: 1,
            borderRadius: 8,
            width: "40%",
            alignSelf: "flex-end",
            marginBottom: "1%",
          }}
          placeholder="Cauta"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(text) => handleSearch(text)}
        />
        <FlatList data={filteredData} renderItem={renderItem} keyExtractor={(item) => item.id_room} />
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

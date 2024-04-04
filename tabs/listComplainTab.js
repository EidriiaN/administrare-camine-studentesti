import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
  Button,
  FlatList,
} from "react-native";
const isWeb = Platform.OS === "web";

const data = [
  {
    id: "1",
    option: "Zgomot și perturbări",
    emergency: "Non-urgent",
    status: false,
    date: "2024-10-05",
    message:
      "Colegii de la camera 3 faci galagie dupa ora 12 noapte si imi perturba somnul.",
  },
  {
    id: "2",
    option: "Probleme de întreținere",
    emergency: "Urgent",
    status: true,
    date: "2024-10-03",
    message: "Teava de la baie pierde apa",
  },
  {
    id: "3",
    option: "Comunicare sau întrebări generale",
    emergency: "Semi-urgent",
    status: true,
    date: "2023-10-20",
    message: "Cum pot rezolva cu visa de flotant?",
  },
  {
    id: "4",
    option: "Probleme legate de vecini",
    emergency: "Non-urgent",
    status: false,
    date: "2023-9-12",
    message: "Vecinul de deasupra lasa mereu gunoiul pe scara blocului.",
  },
  {
    id: "5",
    option: "Alte probleme",
    emergency: "Non-urgent",
    status: true,
    date: "2024-2-9",
    message: "Lipsa apei calde in bucatarie.",
  },
  {
    id: "6",
    option: "Probleme cu mobilierul sau echipamentul",
    emergency: "Urgent",
    status: false,
    date: "2024-3-1",
    message:
      "Scaunul de la birou este rupt și nu pot să-l folosesc în siguranță.",
  },
  {
    id: "7",
    option: "Probleme de întreținere",
    emergency: "Semi-urgent",
    status: true,
    date: "2022-12-1",
    message: "Becul din sufragerie nu funcționează și trebuie înlocuit.",
  },
  {
    id: "8",
    option: "Probleme legate de vecini",
    emergency: "Urgent",
    status: false,
    date: "2020-1-14",
    message:
      "Vecinul de la etajul doi își lasă constant animalul de companie să latre la ore târzii.",
  },
];

export default function ListComplainTab() {
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // Stare pentru a ține evidența ordinii sortării: "asc" sau "desc"

  const sortDataByDate = () => {
    const sorted = [...data].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setSortedData(sorted);
    setSortBy("Date");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortDataByUrgency = () => {
    const urgencyOrder = { "Non-urgent": 0, "Semi-urgent": 1, Urgent: 2 };
    const sorted = [...data].sort((a, b) => {
      return sortOrder === "asc"
        ? urgencyOrder[a.emergency] - urgencyOrder[b.emergency]
        : urgencyOrder[b.emergency] - urgencyOrder[a.emergency];
    });
    setSortedData(sorted);
    setSortBy("Urgency");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const sortDataByStatus = () => {
    const sorted = [...data].sort((a, b) => {
      return sortOrder === "asc"
        ? a.status === b.status
          ? 0
          : a.status
          ? 1
          : -1
        : a.status === b.status
        ? 0
        : a.status
        ? -1
        : 1;
    });
    setSortedData(sorted);
    setSortBy("Status");
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Indexul lunilor începe de la 0, așa că adăugăm 1
    const year = date.getFullYear();
    return `${day < 10 ? "0" : ""}${day}:${
      month < 10 ? "0" : ""
    }${month}:${year}`;
  };

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
            <Text style={{ fontSize: 19 }}>{item.option}</Text>
            <Text style={{ fontSize: 18 }}>{item.emergency}</Text>
            {item.status === true ? (
              <Text style={{ fontSize: 15, color: "#00E200" }}>rezolvat</Text>
            ) : (
              <Text style={{ fontSize: 15, color: "#FAD800" }}>
                in asteptare
              </Text>
            )}
            <Text style={{ fontSize: 13 }}>{item.status}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ fontSize: 15 }}>{formatDate(item.date)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.sortContainer}>
        <Text style={{ marginBottom: "3%", marginStart: "3%", fontSize: 18 }}>
          Sortare
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Button title="Status" onPress={sortDataByStatus} />
          <Button title="Data" onPress={sortDataByDate} />
          <Button title="Urgentare" onPress={sortDataByUrgency} />
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

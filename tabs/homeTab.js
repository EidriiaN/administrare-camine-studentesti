import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
const isWeb = Platform.OS === "web";
const Container = isWeb ? ScrollView : View;

export default function HomeTab({ navigation }) {
  const [dropdownIndex, setDropdownIndex] = useState(null);
  // Definirea datelor pentru lista
  const data = [
    {
      id: "1",
      title: "Deratizare",
      date: "10.05.2024",
      message:
        "Vine deratizarea - Va rugam sa parasiti caminul pana la ora 10:00 pentru efectuarea lucrarii.",
    },
    {
      id: "2",
      title: "Probleme cu zgomotul",
      date: "10.05.2024",
      message:
        "Se semnaleaza probleme cu zgomotul in camin. Va rugam sa fiti mai atenti la nivelul de zgomot produs.",
    },
    {
      id: "3",
      title: "Lucrari de reparatie",
      date: "10.05.2024",
      message:
        "Incep lucrari de reparatie la etajul 3. Va rugam sa evitati zona respectiva pentru a nu perturba lucratorii.",
    },
    {
      id: "4",
      title: "Se inchide furnizarea apei",
      date: "10.05.2024",
      message:
        "Va anuntam ca furnizarea apei va fi oprita temporar pentru efectuarea unor lucrari de mentenanta. Ne cerem scuze pentru inconvenient.",
    },
    {
      id: "5",
      title: "Vin mascatii",
      date: "10.05.2024",
      message:
        "Atentie! Echipele de securitate vor efectua o inspectie in camin. Va rugam sa fiti prezenti in camere.",
    },
    {
      id: "6",
      title: "Anunt important",
      date: "10.05.2024",
      message:
        "Va rugam sa respectati regulile de curatenie in camin si sa aruncati deseurile la cosurile special amenajate.",
    },
    {
      id: "7",
      title: "Vin mascatii",
      date: "10.05.2024",
      message:
        "Echipele de securitate vor face o verificare a incaperilor incepand cu ora 14:00. Va rugam sa va asigurati ca accesul in camere este permis.",
    },
    {
      id: "8",
      title: "Anunt important",
      date: "10.05.2024",
      message:
        "Va reamintim ca este interzis fumatul in incinta caminului. Va rugam sa respectati aceasta regula pentru confortul tuturor locatarilor.",
    },
    {
      id: "9",
      title: "Anunt important",
      date: "10.05.2024",
      message:
        "Reparatiile la reteaua electrica vor incepe in curand. Va rugam sa inchideti toate aparatele electrice inainte de inceperea lucrarilor.",
    },
    {
      id: "10",
      title: "Anunt important",
      date: "10.05.2024",
      message:
        "Va rugam sa aveti grija de cheile de la camera si sa le pastrati in siguranta. Pierderea cheilor poate duce la costuri suplimentare pentru inlocuire.",
    },
    {
      id: "11",
      title: "Anunt important",
      date: "10.05.2024",
      message:
        "Va anuntam ca accesul in camin va fi restrictionat pentru mentenanta la ascensoare in data de 12.05.2024. Va rugam sa planificati in avans.",
    },
  ];

  // Funcție pentru a randează fiecare element din listă
  const renderItem = ({ item, index }) => {
    return (
      <View style={{ margin: "1%" }}>
        <TouchableOpacity
          onPress={() =>
            setDropdownIndex(dropdownIndex === index ? null : index)
          }
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 8,
            borderStyle: "solid",
            borderWidth: 0.8,
            padding: 8,
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontSize: 20 }}>{item.title}</Text>
          <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
            <Text style={{ fontSize: 15 }}>{item.date}</Text>
            <AntDesign
              name="caretdown"
              size={14}
              color={dropdownIndex === index ? "black" : "gray"}
            />
          </View>
        </TouchableOpacity>
        {dropdownIndex === index && (
          <View style={{ height: "auto", gap: 20 }}>
            <Text style={{ textAlign: "left", fontSize: 20 }}>
              {item.message}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <Container style={styles.container}>
      <View style={styles.welcome}>
        <Text style={{ fontSize: 28 }}>Bine ai venit, Adrian 👋</Text>
      </View>
      <View style={styles.top}>
        <Pressable
          onPress={() => {
            navigation.navigate("myRoom");
          }}
          style={styles.top_camera}
        >
          <Text>Camera</Text>
          <Text>4</Text>
        </Pressable>
        <View style={styles.top_camere}>
          <Text>Mai sunt disponibile</Text>
          <Text>100/200 camere</Text>
        </View>
      </View>
      <View style={{ flex: 2 }}>
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
          data={data} // Datele listei
          renderItem={renderItem} // Funcția pentru a randează fiecare element
          keyExtractor={(item) => item.id} // Extrage un identificator unic pentru fiecare element
          style={styles.flatListContainer} // Adaugarea stilurilor la FlatList direct
          initialNumToRender={2}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF9F1",
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
    flex: 0.5,
    marginTop: 10,
  },
  top_camera: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E1DA",
    height: "75%",
    width: "40%",
    borderRadius: 15,
    elevation: 5,
  },
  top_camere: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E5E1DA",
    height: "75%",
    width: "40%",
    borderRadius: 15,
    elevation: 5,
  },
  flatListContainer: {
    backgroundColor: "#FBF9F1",
    borderRadius: 6,
    marginTop: "3%",
    margin: "2%",
  },
});

import React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import Dropdown from "../components/dropDown";

const isWeb = Platform.OS === "web";

export default function ComplainTab() {
  return (
    <View style={styles.container}>
      <View style={styles.complainContainer}>
        <Text style={{ fontSize: 30, textAlign: "center", marginBottom: "3%" }}>
          Reclamatii si plangeri
        </Text>
        <Dropdown />
        <Text style={{ marginTop: 20 }}>
          Atentie: *Pentru a asigura o gestionare eficientă a reclamațiilor, vă
          rugăm să folosiți acest canal doar pentru probleme reale și urgente,
          evitând reclamațiile fără rost sau în glumă. Mulțumim pentru
          înțelegere și colaborare!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignContent: "center",
    padding: "3%",
  },
  complainContainer: {
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
    alignSelf: "center",
  },
});

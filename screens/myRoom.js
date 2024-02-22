import React from "react";
import { View, StyleSheet, Text } from "react-native";

const data = [
  {
    id: "1",
    nume_student: "Adrian Neagu",
    numar_camin: "6",
    administrator: "Popa Ana",
    sef_camin: "Rusanda Valentin",
    numar_camera: "4",
    numar_etaj: "parter",
    colegi_camera: ["Temelie Mihai", "Rusanda Valentin"],
    pret_camera: "250",
    pret_lunar: "750",
    data_plata: "20-28 a fiecarei luni",
  },
];

export default function MyRoom() {
  return (
    <View style={styles.container}>
      <View style={styles.roomContainer}>
        {data.map((item) => (
          <View key={item.id}>
            <Text
              style={{ alignSelf: "center", marginBottom: "3%", fontSize: 30 }}
            >
              {item.nume_student}
            </Text>
            <Text>Detalii despre camera</Text>
            <Text>
              Camera {item.numar_camera}: {item.colegi_camera.join(", ")}
            </Text>
            <Text>Numărul caminului: {item.numar_camin}</Text>
            <Text>Administrator: {item.administrator}</Text>
            <Text>Șef camin: {item.sef_camin}</Text>
            <Text>Număr etaj: {item.numar_etaj}</Text>
            <Text>Pret camera: {item.pret_camera} ron</Text>
            <Text>Pret lunar: {item.pret_lunar} ron</Text>
            <Text>Data plată: {item.data_plata}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FBF9F1",
    alignContent: "center",
    padding: "5%",
  },
  roomContainer: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    padding: "2%",
  },
});

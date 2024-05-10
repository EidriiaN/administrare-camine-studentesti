import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, Button, KeyboardAvoidingView, Platform, Modal, Pressable } from "react-native";
import axios from "axios";
import moment from "moment";
const isWeb = Platform.OS === "web";
const Container = isWeb ? View : ScrollView;

export default function RequestsAccountScreen({ route, navigation }) {
  const { item } = route.params;
  const formattedDate = moment(item.register_date).format("DD:MM:YYYY");
  const [modalVisible, setModalVisible] = useState(false);
  const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

  const handleAccept = async () => {
    try {
      const studentData = { ...item };
      delete studentData.id;
      delete studentData.status;

      const response = await axios.post(`http://${ip}:3000/acceptRegisterRequest`, item);
      if (response.status === 200) {
        setModalVisible(true);
      } else {
        console.log("Cererea de înregistrare a eșuat!");
      }
    } catch (error) {
      console.error("Eroare la acceptarea cererii:", error);
    }
  };

  const handleReject = async () => {
    try {
      const studentId = item.id;
      const response = await axios.post(`http://${ip}:3000/rejectRegisterRequest`, { id: studentId });
      if (response.status === 200) {
        setModalVisible(true);
      } else {
        console.log("Respingerea contului nu a avut succes.");
      }
    } catch (error) {
      console.error("Eroare la acceptarea cererii:", error);
    }
  };

  return (
    <Container style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Studentul așteaptă aprobarea</Text>

        <View style={styles.infoContainer}>
          <View style={styles.sectionContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionContainerTitle}>Informații Personale:</Text>
              <Text style={styles.label}>
                Nume: {item.name} {item.surname}
              </Text>
              <Text style={styles.label}>E-mail: {item.email}</Text>
              <Text style={styles.label}>Număr de telefon: {item.phoneNumber}</Text>
              <Text style={styles.label}>Data nașterii: {item.birthdate}</Text>
              <Text style={styles.label}>Gen: {item.gender}</Text>
              <Text style={styles.label}>
                Locație: {item.locality}, {item.county}
              </Text>
              <Text style={styles.label}>
                Adresă: {item.street} {item.number} {item.block} {item.staircase} {item.floor} {item.apartament}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionContainerTitle}>Documente de Identitate:</Text>
              <Text style={styles.label}>Serie CI: {item.idSeries}</Text>
              <Text style={styles.label}>Număr CI: {item.idNumber}</Text>
              <Text style={styles.label}>Eliberat de: {item.issuedBy}</Text>
              <Text style={styles.label}>Data emiterii: {item.issuedAt}</Text>
              <Text style={styles.label}>CNP: {item.cnp}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionContainerTitle}>Studii:</Text>
              <Text style={styles.label}>Program de studiu: {item.studyProgram}</Text>
              <Text style={styles.label}>Facultate: {item.faculty}</Text>
              <Text style={styles.label}>An de studiu: {item.studyYear}</Text>
              <Text style={styles.label}>Specializare: {item.specialization}</Text>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <View style={styles.section}>
              <Text style={styles.sectionContainerTitle}>Preferințe Locative:</Text>
              <Text style={styles.label}>Preferință dormitor: {item.dormPreference}</Text>
              <Text style={styles.label}>Preferință cameră: {item.roomPreference}</Text>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionContainerTitle}>Persoană de Contact în Caz de Urgență:</Text>
              <Text style={styles.label}>Nume: {item.emergencyContactName}</Text>
              <Text style={styles.label}>Telefon: {item.emergencyContactPhone}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionContainerTitle}>Alte Informații:</Text>
              <Text>
                Status:{" "}
                {item.status === true ? <Text style={{ color: "#00E200" }}>rezolvat</Text> : <Text style={{ color: "#FAD800" }}>in așteptare</Text>}
              </Text>
              <Text style={styles.label}>Data înregistrării: {formattedDate}</Text>
            </View>
          </View>
        </View>
        <View style={styles.chooseContainer}>
          <Button title="Accepta" onPress={handleAccept} />
          <Button title="Respinge" onPress={handleReject} />
        </View>
      </View>

      <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
        <Pressable
          onPress={() => setModalVisible(false)}
          style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View style={{ width: "20%", backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" }}>
            <Text style={{ color: "#00E200", fontSize: 18, fontWeight: "bold", marginBottom: "10%" }}>Succes!</Text>
            <Button
              title="Inchide"
              onPress={() => {
                setModalVisible(false);
                navigation.replace("homeAdmin", { screen: "Conturi in asteptare" });
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: isWeb ? "1%" : "2%",
  },
  contentContainer: {
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
    height: "100%",
  },
  infoContainer: {
    flexDirection: "row",
    margin: "3%",
  },
  sectionContainer: { flex: 3, width: "50%", marginLeft: "5%" },
  section: { marginBottom: "5%", fontSize: 14 },
  sectionContainerTitle: {
    fontSize: 16,
    marginBottom: "1%",
    fontWeight: "bold",
  },
  chooseContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginTop: "auto",
    marginBottom: "5%",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: "5%",
  },
});

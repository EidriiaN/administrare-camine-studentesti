import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import axios from "axios";
import moment from "moment";
import OneOptionModal from "../../components/OneOptionModal";
import TwoOptionsModal from "../../components/TwoOptionsModal";
import Loading from "../../components/Loading";
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

export default function ComplainStudentScreen({ route, navigation }) {
  const { item } = route.params;
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`https://${ip}:3000/deleteComplain/${id}`, {
        withCredentials: true,
      });
      console.log("succes la stergere");
    } catch (error) {
      console.error("Eroare la ștergere:", error);
    } finally {
      setLoading(false);
    }

    setModalType("oneOption");
  };

  if (loading) {
    return <Loading />;
  }

  const handleDisableButton = () => {
    if (item.status) {
      return true;
    }
    return false;
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom: "8%" }}>{item.category}</Text>
          <View style={styles.infoContainer}>
            <View style={{ gap: 5 }}>
              <Text>
                Student: {item.name} {item.surname}
              </Text>
              <Text>Camera: {item.room_number}</Text>
              <Text>Grad de urgentare: {item.urgency}</Text>
            </View>
            <View style={{ gap: 5 }}>
              {item.status == true ? (
                <Text style={{ color: "#00E200", fontWeight: "bold" }}>rezolvat</Text>
              ) : (
                <Text style={{ color: "#FAD800", fontWeight: "bold" }}>in asteptare</Text>
              )}
              <Text>Data: {moment(item.report_date).format("DD:MM:YYYY")}</Text>
              <Text>Data raspuns: {item.resolution_date ? moment(item.resolution_date).format("DD:MM:YYYY") : "-"}</Text>
            </View>
          </View>
          <View>
            <Text>Mesaj:</Text>
            <Text
              style={{
                textAlign: "justify",
                marginTop: "1%",
                marginBottom: "2%",
                padding: "2%",
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
              }}
            >
              {item.message}
            </Text>
          </View>
          <View style={{ height: "30%" }}>
            <Text>Raspuns:</Text>
            {item.status ? (
              <Text style={{ marginTop: "1%", marginBottom: "2%", borderColor: "black", borderWidth: 1, borderRadius: 5, padding: "2%" }}>
                {item.response}
              </Text>
            ) : (
              <Text
                style={{
                  color: "gray",
                  textAlign: "center",
                  alignContent: "center",
                  height: "90%",
                  marginTop: "1%",
                  marginBottom: "2%",
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: "2%",
                }}
              >
                Inca nu ai primit raspuns...
              </Text>
            )}
          </View>
          <View style={{ marginTop: "auto", marginBottom: "5%" }}>
            <Button title="Sterge plangerea" onPress={() => setModalType("twoOptions")} disabled={handleDisableButton()} />
          </View>
        </View>
        <OneOptionModal
          visible={modalType === "oneOption"}
          onClose={() => {
            setModalType(null);
            navigation.replace("home", { screen: "Lista cereri" });
          }}
          onOption={() => {
            setModalType(modalType === "oneOption");
            navigation.replace("home", { screen: "Lista cereri" });
          }}
        />
        <TwoOptionsModal
          visible={modalType === "twoOptions"}
          text={"Esti sigur ca vrei sa stergi reclamatia?"}
          onClose={() => setModalType(null)}
          onOption1={() => handleDelete(item.id)}
          onOption2={() => setModalType(null)}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const isWeb = Platform.OS === "web";

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
    justifyContent: "space-between",
    marginBottom: "5%",
  },
});

import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button, KeyboardAvoidingView, Platform } from "react-native";
import axios from "axios";
import moment from "moment";
import OneOptionModal from "../../components/OneOptionModal";
import Loading from "../../components/Loading";
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

export default function ParkingRequestScreenAdmin({ route, navigation }) {
  const { item } = route.params;
  console.log(item, "item in parkingRequestScreenAdmin");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSendResponse = async (status) => {
    setLoading(true);
    try {
      const parkingResponse = {
        response: responseMessage,
        status: status,
      };
      const response = await axios.patch(`https://${ip}:3000/updateParkingRequest/${item.id}`, parkingResponse, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response sent successfully:", response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error sending response:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisabledButton = () => {
    if (item.status !== "pending") {
      return true;
    }
    return false;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom: "8%" }}>{item.category}</Text>
          <View style={styles.infoContainer}>
            <View style={{ gap: 5 }}>
              <Text>Student: {item.full_name}</Text>
              <Text>Facultatea: {item.faculty}</Text>
              <Text>Telefon: {item.phoneNumber}</Text>
              <Text>Media: {item.average_grade}</Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text>Trimestrul: {item.parking_trimester}</Text>
              <Text>Pentru anul: {item.academic_year_requested}</Text>
              <Text>Vehicul: {item.vehicle_brand}</Text>
              <Text>Numa inmatriculare: {item.vehicle_registration_number}</Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text>Camera: {item.room_number}</Text>
              {item.status === "approved" ? (
                <Text style={{ color: "#00E200" }}>rezolvat</Text>
              ) : item.status === "rejected" ? (
                <Text style={{ color: "#FF0000" }}>respins</Text>
              ) : (
                <Text style={{ color: "#FAD800" }}>in asteptare</Text>
              )}
              <Text>Data: {moment(item.report_date).format("DD:MM:YYYY")}</Text>
            </View>
          </View>
          <View style={{ marginTop: "5%" }}>
            <Text>Raspuns:</Text>
            {item.status !== "pending" ? (
              <View
                style={{
                  marginTop: "1%",
                  marginBottom: "2%",
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 5,
                  padding: "2%",
                  textAlign: "center",
                }}
              >
                <Text style={{ textAlign: "center", marginBottom: "1%" }}>Cererea a fost solutionata</Text>
                <Text>{item.response}</Text>
              </View>
            ) : (
              <TextInput
                placeholder={"mesaj"}
                multiline
                style={{
                  padding: 10,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 5,
                  textAlignVertical: "top",
                  height: 150,
                  marginBottom: 20,
                  marginTop: "1%",
                }}
                value={responseMessage}
                onChangeText={(text) => setResponseMessage(text)}
              />
            )}
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "50%" }}>
              <Button title="  Accepta  " onPress={() => handleSendResponse(3)} disabled={handleDisabledButton()} />
              <Button title="  Respinge  " onPress={() => handleSendResponse(1)} disabled={handleDisabledButton()} />
            </View>
          </View>
        </View>
      </View>
      <OneOptionModal
        visible={showModal}
        onOption={() => {
          setShowModal(false);
          navigation.replace("ParkingRequestsList");
        }}
        onClose={() => {
          setShowModal(false);
          navigation.replace("ParkingRequestsList");
        }}
      />
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

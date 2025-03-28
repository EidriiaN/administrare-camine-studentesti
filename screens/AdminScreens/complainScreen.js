import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button, KeyboardAvoidingView, Platform } from "react-native";
import axios from "axios";
import moment from "moment";
import OneOptionModal from "../../components/OneOptionModal";
import Loading from "../../components/Loading";
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

export default function ComplainScreen({ route, navigation }) {
  const { item } = route.params;
  console.log(item, "item in complainscreen");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [complainResponse, setComplainResponse] = useState({
    response: "",
    status: 1,
    resolution_date: moment(),
  });

  const handleSendResponse = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(`https://${ip}:3000/resolveComplain/${item.id}`, complainResponse, {
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
    if (item.status || !complainResponse.response) {
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
              <Text>
                Student: {item.name} {item.surname}
              </Text>
              <Text>Camera: {item.room_number}</Text>
              <Text>Grad de urgentare: {item.urgency}</Text>
            </View>
            <View style={{ gap: 5 }}>
              {item.status == true ? <Text style={{ color: "#00E200" }}>rezolvat</Text> : <Text style={{ color: "#FAD800" }}>in asteptare</Text>}
              <Text>Data: {moment(item.report_date).format("DD:MM:YYYY")}</Text>
            </View>
          </View>
          <View>
            <Text>Mesaj:</Text>
            <Text style={{ textAlign: "justify", padding: "2%" }}>{item.message}</Text>
          </View>
          <View>
            <Text>Raspuns:</Text>
            {item.status == true ? (
              <Text style={{ marginTop: "1%", marginBottom: "2%", borderColor: "black", borderWidth: 1, borderRadius: 5, padding: "2%" }}>
                {item.response}
              </Text>
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
                  marginBottom: 30,
                  marginTop: "1%",
                }}
                value={complainResponse.response}
                onChangeText={(text) => setComplainResponse({ ...complainResponse, response: text })}
              />
            )}
            <Button title="Trimite" onPress={handleSendResponse} disabled={handleDisabledButton()} />
          </View>
        </View>
      </View>
      <OneOptionModal
        visible={showModal}
        onOption={() => {
          setShowModal(false);
          navigation.replace("homeAdmin", { screen: "Lista cereri" });
        }}
        onClose={() => {
          setShowModal(false);
          navigation.replace("homeAdmin", { screen: "Lista cereri" });
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

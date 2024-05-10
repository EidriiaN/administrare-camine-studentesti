import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ScrollView,
  ActivityIndicator,
  Platform,
  Pressable,
  KeyboardAvoidingView,
  Modal,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import moment from "moment";
import { AntDesign } from "@expo/vector-icons";
const isWeb = Platform.OS === "web";
const Container = isWeb ? ScrollView : ScrollView;
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

export default function AnnouncesAdminTab({ navigation }) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [announcesData, setAnnouncesData] = useState([]);
  const [dropdownIndex, setDropdownIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const getAnnouncesData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://${ip}:3000/getAnnounces`, {
          withCredentials: true,
        });

        setAnnouncesData(response.data);
      } catch (error) {
        console.error("Eroare la trimiterea anunțului:", error);
      } finally {
        setLoading(false);
      }
    };
    getAnnouncesData();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const announceData = {
        title: title,
        message: message,
      };

      const response = await axios.post(`http://${ip}:3000/addAnnounce`, announceData, {
        withCredentials: true,
      });

      console.log(response.data);
      setModalVisible(true);
      setTitle("");
      setMessage("");
    } catch (error) {
      console.error("Eroare la trimiterea anunțului:", error);
      Alert.alert("Eroare", "A apărut o eroare în timpul trimiterea anunțului. Te rugăm să încerci din nou mai târziu.");
    } finally {
      setLoading(false);
    }
  };

  const showNextAnnounces = () => {
    setStartIndex((prevIndex) => prevIndex + 5);
  };

  const showPreviousAnnounces = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 5, 0));
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={Platform.OS == "web" ? 80 : "large"} color="#00BFFF" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Container style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Adauga un nou anunt</Text>
          <View style={styles.infoContainer}>
            <View style={{ gap: 5, flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 18 }}>Titlu:</Text>
              <TextInput
                placeholder={""}
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={{
                  padding: 10,
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 5,
                  textAlignVertical: "top",
                  width: 300,
                }}
              />
            </View>
          </View>
          <View>
            <Text style={{ fontSize: 18, marginBottom: "2%" }}>Mesaj:</Text>
            <TextInput
              placeholder={""}
              value={message}
              onChangeText={(text) => setMessage(text)}
              multiline
              style={{
                padding: 10,
                borderColor: "black",
                borderWidth: 1,
                borderRadius: 5,
                textAlignVertical: "top",
                height: 150,
                marginBottom: 30,
              }}
            />
            <Button title="Trimite" disabled={!title || !message} onPress={handleSubmit} />
          </View>
        </View>

        <View style={styles.contentContainer2}>
          <Text style={styles.title}>Anunturi</Text>
          {announcesData.slice(startIndex, startIndex + 5).map((item, index) => (
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
          ))}
          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: "auto", marginBottom: "1%" }}>
            {startIndex + 5 < announcesData.length && <Button title="Următoarele 5" onPress={showNextAnnounces} />}
            {startIndex > 0 && <Button title="Anterioarele 5" onPress={showPreviousAnnounces} />}
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
                  navigation.replace("homeAdmin", { screen: "Anunturi" });
                }}
              />
            </View>
          </Pressable>
        </Modal>
      </Container>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    height: isWeb ? 450 : "auto",
    marginBottom: "1%",
  },
  contentContainer2: {
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
    height: isWeb ? null : "auto",
    minHeight: 500,
    alignItems: "stretch",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "5%",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    marginBottom: "5%",
  },
});

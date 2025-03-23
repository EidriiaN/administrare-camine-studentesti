import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button, KeyboardAvoidingView, Platform, ActivityIndicator } from "react-native";
import axios from "axios";
import moment from "moment";
import OneOptionModal from "../../components/OneOptionModal";
import Loading from "../../components/Loading";
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

export default function ParkingRequest({ navigation }) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    average_grade: "",
    vehicle_registration_number: "",
    vehicle_brand: "",
    parking_trimester: "",
    academic_year_requested: "",
  });

  const handleChange = (field, value) => {
    const fieldValue = field === "vehicle_registration_number" ? value.toUpperCase() : value;

    setFormData((prevData) => ({
      ...prevData,
      [field]: fieldValue,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    const resetFormData = () => {
      setFormData({
        average_grade: "",
        vehicle_registration_number: "",
        vehicle_brand: "",
        parking_trimester: "",
        academic_year_requested: "",
      });
    };
    try {
      const response = await axios.post(`https://${ip}:3000/addParkingRequest`, formData, { withCredentials: true });
      setShowModal(true);
      resetFormData();
    } catch (error) {
      console.error("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (label, field, keyboardType = "default", inputMode = "text") => (
    <>
      <Text style={styles.label}>{label}</Text>
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
      <TextInput
        style={styles.input}
        value={formData[field]}
        onChangeText={(text) => handleChange(field, text)}
        keyboardType={keyboardType}
        inputMode={inputMode}
      />
    </>
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom: "2%" }}>Permis parcare</Text>
          <View style={styles.infoContainer}></View>
          {renderInput("Media academica", "average_grade")}
          {renderInput("Numarul de inmatriculare", "vehicle_registration_number")}
          {renderInput("Brand vehicul", "vehicle_brand")}
          {renderInput("Trimestrul", "parking_trimester", "phone-pad", "numeric")}
          {renderInput("Anul universitar", "academic_year_requested", "phone-pad", "numeric")}

          <View style={{ marginTop: "auto", marginBottom: "5%" }}>
            <Button
              title="Trimite"
              onPress={() => {
                console.log("trimis", formData);
                handleSubmit();
              }}
              disabled={!Object.values(formData).every((value) => value.trim() !== "")}
            />
          </View>
        </View>
      </View>
      <OneOptionModal visible={showModal} text={"Succes"} textColor={true} onOption={() => setShowModal(false)} />
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    justifyContent: "center",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 7,
    color: "gray",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  input_description: {
    fontSize: Platform.OS == "web" ? 18 : 15,
    textAlign: "center",
    marginTop: Platform.OS == "web" ? "2%" : "4%",
    marginBottom: Platform.OS == "web" ? "3%" : "5%",
    paddingBottom: Platform.OS == "web" ? "1%" : "2%",
    borderBottomColor: "#b6b6b6",
    borderBottomWidth: 3,
  },
});

import React from "react";
import { useState } from "react";
import axios from "axios";
import { View, Image, Text, TextInput, Button, Modal, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Pressable } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { render } from "react-dom";
const logo = require("../assets/logo-upg-2.png");

export default function Register({ navigation }) {
  const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    birthdate: dayjs(),
    gender: "",
    locality: "",
    county: "",
    street: "",
    number: "",
    block: "",
    staircase: "",
    floor: "",
    apartament: "",
    idSeries: "",
    idNumber: "",
    issuedBy: "",
    issuedAt: dayjs(),
    cnp: "",
    studyProgram: "",
    faculty: "",
    tuition: "",
    studyYear: "",
    specialization: "",
    dormPreference: "",
    roomPreference: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    register_date: new Date(),
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [errors, setErrors] = useState({});

  const [modalVisible, setModalVisible] = useState(false);

  const validateForm = () => {
    let errors = {};
    for (const field in formData) {
      if (!formData[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (validateForm()) {
      axios
        .post(`http://${ip}:3000/register-request`, formData, { withCredentials: true })
        .then((response) => {
          if (response.status === 200) {
            console.log("Cererea de înregistrare a fost trimisă cu succes!");
            setModalVisible(true);
          } else {
            console.log("Cererea de înregistrare a eșuat!");
          }
        })
        .catch((error) => {
          console.error("Eroare:", error);
        });
    }
  };

  const renderInput = (label, field, keyboardType = "default", inputMode = "text") => (
    <>
      <Text style={styles.label}>{label}</Text>
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
      <TextInput style={styles.input} value={formData[field]} onChangeText={(text) => handleChange(field, text)} keyboardType={keyboardType} inputMode={inputMode} />
    </>
  );

  const renderPicker = (label, field, options) => (
    <>
      <Text style={styles.label}>{label}</Text>
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
      <View style={styles.input}>
        <RNPickerSelect placeholder={{ label: `Select ${label.toLowerCase()}`, value: "" }} items={options} onValueChange={(value) => handleChange(field, value)} value={formData[field]} />
      </View>
    </>
  );

  const renderDatePicker = (label, field) => (
    <>
      <Text style={styles.label}>{label}</Text>
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
      <TouchableOpacity onPress={() => setShowCalendar(true)}>
        <TextInput style={styles.input} value={formData[field] ? formData[field].format("YYYY-MM-DD") : ""} placeholder="YYYY-MM-DD" editable={false} />
      </TouchableOpacity>
      {showCalendar && (
        <View style={{ backgroundColor: "#f5f5f5" }}>
          <DateTimePicker
            mode="single"
            locale="en"
            date={formData[field]}
            onChange={(params) => {
              setFormData((prevData) => ({
                ...prevData,
                [field]: params.date,
              }));
              setShowCalendar(false);
            }}
          />
        </View>
      )}
    </>
  );

  const placeholder = {
    label: "Alege o optiune...",
    value: null,
  };

  const pickerData = {
    gender: {
      label: "Sex",
      options: [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    faculty: {
      label: "Faculty",
      options: [
        { label: "INGINERIE MECANICĂ ŞI ELECTRICĂ", value: "Inginerie Mecanică și Electrică" },
        { label: "INGINERIA PETROLULUI ŞI GAZELOR", value: "Ingineria Petrolului și Gazelor" },
        { label: "TEHNOLOGIA PETROLULUI ŞI PETROCHIMIE", value: "Tehnologia Petrolului și Petrochimie" },
        { label: "LITERE ŞI ŞTIINŢE", value: "Litere și Științe" },
        { label: "STIINŢE ECONOMICE", value: "Științe Economice" },
      ],
      specialization: {
        "Inginerie Mecanică și Electrică": [
          { label: "Automatică şi Informatică Aplicată", value: "Automatică şi Informatică Aplicată" },
          { label: "Calculatoare", value: "Calculatoar" },
          { label: "Electromecanică", value: "Electromecanică" },
          { label: "Inginerie Economică în Domeniul Mecanic", value: "Inginerie Economică în Domeniul Mecanic" },
          { label: "Utilaje Petroliere și Petrochimice", value: "Utilaje Petroliere și Petrochimice" },
          {
            label: "Utilaje pentru Transportul și Depozitarea Hidrocarburilor",
            value: "Utilaje pentru Transportul și Depozitarea Hidrocarburilor",
          },
        ],
        "Ingineria Petrolului și Gazelor": [
          { label: "Inginerie de Petrol si Gaze - IF", value: "Inginerie de Petrol si Gaze - IF" },
          { label: "Inginerie de Petrol si Gaze - IFR", value: "Inginerie de Petrol si Gaze - IFR" },
          { label: "Distribuția si Depozitarea Hidrocarburilor", value: "Distribuția si Depozitarea Hidrocarburilor" },
          { label: "Geologia Resurselor Petroliere", value: "Geologia Resurselor Petroliere" },
        ],
        "Tehnologia Petrolului și Petrochimie": [
          { label: "Prelucrarea Petrolului şi Petrochimie", value: "Prelucrarea Petrolului şi Petrochimie" },
          { label: "Petroleum Processing and Petrochemistry (EN)", value: "Petroleum Processing and Petrochemistry (EN)" },
          { label: "Controlul şi Securitatea Produselor Alimentare", value: "Controlul şi Securitatea Produselor Alimentare" },
          { label: "Ingineria şi Protecția Mediului în Industrie", value: "Ingineria şi Protecția Mediului în Industrie" },
        ],
        "Litere și Științe": [
          { label: "Administraţie Publică", value: "Administraţie Publică" },
          { label: "Asistenţă Managerială şi Administrativă", value: "Asistenţă Managerială şi Administrativă" },
          { label: "Engleză - Franceză", value: "Engleză - Franceză" },
          { label: "Română - Engleză", value: "Română - Engleză" },
          { label: "Informatică", value: "Informatică" },
          { label: "Pedagogie", value: "Pedagogie" },
          {
            label: "Pedagogia Învăţământului Primar şi Preşcolar",
            value: "Pedagogia Învăţământului Primar şi Preşcolar",
          },
        ],
        "Științe Economice": [
          { label: "Economia Comerţului, Turismului şi Serviciilor", value: "Economia Comerţului, Turismului şi Serviciilor" },
          { label: "Merceologie şi Managementul Calităţii", value: "Merceologie şi Managementul Calităţii" },
          { label: "Informatică Economică", value: "Informatică Economică" },
          { label: "Contabilitate şi Informatică de Gestiune", value: "Contabilitate şi Informatică de Gestiune" },
          { label: "Finanţe şi Bănci", value: "Finanţe şi Bănci" },
          { label: "Management", value: "Management" },
        ],
      },
    },
    studyYear: {
      label: "StudyYear",
      options: [
        { label: "4", value: "4" },
        { label: "3", value: "3" },
        { label: "2", value: "2" },
        { label: "1", value: "1" },
      ],
    },
    tuition: {
      options: [
        { label: "Cu taxa", value: "1" },
        { label: "Fara taxa", value: "0" },
      ],
    },
    study_program: {
      options: [
        { label: "Licenta", value: "licenta" },
        { label: "Master", value: "master" },
      ],
    },
    dormPreference: {
      options: [
        { label: "Caminul 3", value: "3" },
        { label: "Caminul 4", value: "4" },
        { label: "Caminul 5", value: "5" },
        { label: "Caminul 6", value: "6" },
        { label: "Caminul 7", value: "7" },
        { label: "Caminul 8", value: "8" },
      ],
    },
    roomPreference: {
      options: [
        { label: "single", value: "single" },
        { label: "dublă", value: "dubla" },
        { label: "triplă", value: "tripla" },
      ],
    },
    // Add more picker data as needed
  };

  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={-160} style={styles.container}>
      <ScrollView overScrollMode="never" showsVerticalScrollIndicator={Platform.OS === "web" ? true : false}>
        <View style={styles.form}>
          <Image style={styles.logo} source={logo} resizeMode="contain" />

          <Text style={styles.input_description}>Informatii personale</Text>

          {renderInput("Nume", "name")}
          {renderInput("Prenume", "surname")}
          {renderInput("Email", "email", "email-address", "email")}
          {renderInput("Număr de telefon", "phoneNumber", "phone-pad", "numeric")}
          {renderDatePicker("Data nașterii", "birthdate")}
          {renderPicker("Sex", "gender", pickerData.gender.options)}
          {renderInput("Localitate", "locality")}
          {renderInput("Judet", "county")}
          {renderInput("Strada", "street")}
          {renderInput("Numar", "number", "phone-pad", "numeric")}
          {renderInput("Bloc", "block")}
          {renderInput("Scara", "staircase")}
          {renderInput("Etaj", "floor")}
          {renderInput("Apartament", "apartament")}

          <Text style={styles.input_description}>Informatii despre actul de indentitate</Text>

          {renderInput("Seria actului de identitate", "idSeries")}
          {renderInput("Numarul actului de identitate", "idNumber", "phone-pad", "numeric")}
          {renderInput("Eliberat de", "issuedBy")}
          {renderDatePicker("La data de", "issuedAt")}
          {renderInput("CNP (Cod Numeric Personal)", "cnp", "phone-pad", "numeric")}

          <Text style={styles.input_description}>Informații despre instituția de învățământ</Text>

          {renderPicker("Programul de studiu", "studyProgram", pickerData.study_program.options)}
          {renderPicker("Facultatea", "faculty", pickerData.faculty.options)}
          {renderPicker("Taxă de studii", "tuition", pickerData.tuition.options)}
          {renderPicker("Anul de studiu", "studyYear", pickerData.studyYear.options)}
          {renderPicker("Specializarea", "specialization", pickerData.faculty.specialization[formData.faculty] || [])}

          <Text style={styles.input_description}>Informații despre cămin</Text>

          {renderPicker("Opțiunea preferată pentru cămin", "dormPreference", pickerData.dormPreference.options)}
          {renderPicker("Tipul de cameră preferat", "roomPreference", pickerData.roomPreference.options)}

          <Text style={styles.input_description}>Informații de urgență</Text>

          {renderInput("Numele unei persoane de contact în caz de urgență", "emergencyContactName")}
          {renderInput("Număr de telefon al persoanei de contact", "emergencyContactPhone")}

          <Button title="Register" onPress={handleSubmit} />
        </View>
        <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
          <Pressable onPress={() => setModalVisible(false)} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <View style={{ width: "20%", backgroundColor: "white", padding: 20, borderRadius: 10, alignItems: "center" }}>
              <Text style={{ color: "#00E200", fontSize: 18, fontWeight: "bold", marginBottom: "10%" }}>Inregistrare cu succes!</Text>
              <Button
                title="Inchide"
                onPress={() => {
                  setModalVisible(false);
                  navigation.replace("login");
                }}
              />
            </View>
          </Pressable>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 15,
    backgroundColor: "#f5f5f5",
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 20,
  },
  form: {
    width: Platform.OS === "web" ? 700 : null,
    alignSelf: Platform.OS == "web" ? "center" : null,
    marginTop: Platform.OS == "web" ? "1%" : "5%",
    marginBottom: Platform.OS == "web" ? "4%" : "6%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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

import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  View,
  Image,
  Text,
  TextInput,
  Button,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
const logo = require("../assets/logo-upg-2.png");

export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthdate, setBirthdate] = useState(dayjs());
  const [showCalendar, setShowCalendar] = useState(false);
  const [gender, setGender] = useState("");
  const [cnp, setCNP] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [studyYear, setStudyYear] = useState("");
  const [studyProgram, setStudyProgram] = useState("");
  const [dormPreference, setDormPreference] = useState("");
  const [roomPreference, setRoomPreference] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!name) errors.name = "Name is required";
    if (!surname) errors.surname = "Surname is required";
    if (!birthdate) errors.birthdate = "Birthdate is required";

    if (!gender) errors.gender = "Gender is required";
    if (!email) errors.email = "Email is required";
    if (!phoneNumber) errors.phoneNumber = "Phone number is required";
    if (!cnp) errors.cnp = "CNP is required";
    if (!institutionName)
      errors.institutionName = "Institution name is required";
    if (!faculty) errors.faculty = "Faculty is required";
    if (!studyYear) errors.studyYear = "Study year is required";
    if (!studyProgram) errors.studyProgram = "Study program is required";
    if (!dormPreference) errors.dormPreference = "Dorm preference is required";
    if (!roomPreference) errors.roomPreference = "Room preference is required";
    if (!emergencyContactName)
      errors.emergencyContactName = "Emergency contact name is required";
    if (!emergencyContactPhone)
      errors.emergencyContactPhone = "Emergency contact phone is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleLogin();
    }
  };

  const handleLogin = () => {
    const credentials = {
      email: email,
      password: password,
    };

    axios
      .post(`http://${EXPO_PUBLIC_API_URL}:3000/login`, credentials, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Autentificare reușită!");
          setEmail("");
          setPassword("");
          setErrors({});
          navigation.navigate("home");
          // Executați acțiuni corespunzătoare pentru autentificarea reușită
        } else {
          console.log("Autentificare eșuată!");
          // Executați acțiuni corespunzătoare pentru autentificarea eșuată
        }
      })
      .catch((error) => {
        console.error("Eroare:", error);
      });
  };

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
        { label: "INGINERIE MECANICĂ ŞI ELECTRICĂ", value: "ime" },
        { label: "INGINERIA PETROLULUI ŞI GAZELOR", value: "ipg" },
        { label: "TEHNOLOGIA PETROLULUI ŞI PETROCHIMIE", value: "ipp" },
        { label: "LITERE ŞI ŞTIINŢE", value: "ls" },
        { label: "STIINŢE ECONOMICE", value: "se" },
        // Add more options as needed
      ],
      studyProgram: {
        ime: [
          { label: "Automatică şi Informatică Aplicată", value: "aia" },
          { label: "Calculatoare", value: "cal" },
          { label: "Electromecanică", value: "elm" },
          { label: "Inginerie Economică în Domeniul Mecanic", value: "iedm" },
          { label: "Utilaje Petroliere și Petrochimice", value: "utp" },
          {
            label: "Utilaje pentru Transportul și Depozitarea Hidrocarburilor",
            value: "utd",
          },
        ],
        ipg: [
          { label: "INGINERIE DE PETROL SI GAZE - IF", value: "ipgIf" },
          { label: "INGINERIE DE PETROL SI GAZE – IFR", value: "ipgIfr" },
          {
            label: "DISTRIBUȚIA SI DEPOZITAREA HIDROCARBURILOR",
            value: "ddh",
          },
          { label: "GEOLOGIA RESURSELOR PETROLIERE", value: "grp" },
        ],
        ipp: [
          { label: "Prelucrarea Petrolului și Petrochimie", value: "ppp" },
          {
            label: "Petroleum Processing and Petrochemistry (EN)",
            value: "pppen",
          },
          {
            label: "Controlul şi Securitatea Produselor Alimentare",
            value: "cspa",
          },
          {
            label: "Ingineria și Protecția Mediului în Industrie",
            value: "ipmi",
          },
        ],
        ls: [
          { label: "Administraţie Publică", value: "ap" },
          { label: "Asistenţă Managerială şi Administrativă", value: "ama" },
          { label: "Engleză - Franceză", value: "ef" },
          { label: "Română - Engleză", value: "re" },
          { label: "Informatică", value: "info" },
          { label: "Pedagogie", value: "peda" },
          {
            label: "Pedagogia Învăţământului Primar şi Preşcolar",
            value: "pipp",
          },
        ],
        se: [
          {
            label: "Economia Comerțului, Turismului și Serviciilor",
            value: "ects",
          },
          {
            label: "Merceologie și Managementul Calității",
            value: "mmc",
          },
          {
            label: "Informatică Economică",
            value: "ie",
          },
          {
            label: "Contabilitate și Informatică de Gestiune",
            value: "cig",
          },
          {
            label: "Finanțe și Bănci",
            value: "fb",
          },
          {
            label: "Management",
            value: "manag",
          },
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
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={-160}
      style={styles.container}
    >
      <ScrollView
        overScrollMode="never"
        showsVerticalScrollIndicator={Platform.OS === "web" ? true : false}
      >
        <View style={styles.form}>
          <Image style={styles.logo} source={logo} resizeMode="contain" />
          <Text style={styles.input_description}>Informatii personale</Text>
          <Text style={styles.label}>Nume</Text>
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Neagu"
          />

          <Text style={styles.label}>Prenume</Text>
          {errors.surname && (
            <Text style={styles.errorText}>{errors.surname}</Text>
          )}
          <TextInput
            style={styles.input}
            value={surname}
            onChangeText={setSurname}
            placeholder="Adrian"
          />

          <Text style={styles.label}>Adresă de e-mail</Text>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="xyz@gmail.com"
          />

          <Text style={styles.label}>Număr de telefon</Text>
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber}</Text>
          )}
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="0722196231"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Data nașterii</Text>
          {errors.birthdate && (
            <Text style={styles.errorText}>{errors.birthdate}</Text>
          )}

          <TouchableOpacity onPress={() => setShowCalendar(true)}>
            <TextInput
              style={styles.input}
              value={birthdate ? birthdate.format("YYYY-MM-DD") : ""}
              placeholder="YYYY-MM-DD"
              editable={false}
            />
          </TouchableOpacity>

          {showCalendar && (
            <View style={{ backgroundColor: "#f5f5f5" }}>
              <DateTimePicker
                mode="single"
                locale="en"
                date={birthdate}
                onChange={(params) => {
                  setBirthdate(params.date);
                  setShowCalendar(false);
                }}
              />
              {console.log(birthdate, "birthdate")}
            </View>
          )}
          <Text style={styles.label}>Sex</Text>
          {errors.gender && (
            <Text style={styles.errorText}>{errors.gender}</Text>
          )}
          <View style={styles.input}>
            <RNPickerSelect
              placeholder={placeholder}
              items={pickerData["gender"].options}
              onValueChange={(value) => setGender(value)}
              value={gender}
            />
          </View>
          <Text style={styles.label}>Seria actului de identitate</Text>
          {errors.cnp && <Text style={styles.errorText}>{errors.cnp}</Text>}
          <TextInput
            style={styles.input}
            value={cnp}
            onChangeText={setCNP}
            placeholder="seria"
          />
          <Text style={styles.label}>Numarul actului de identitate</Text>
          {errors.cnp && <Text style={styles.errorText}>{errors.cnp}</Text>}
          <TextInput
            style={styles.input}
            value={cnp}
            onChangeText={setCNP}
            keyboardType="numeric"
            placeholder="numarul"
          />
          <Text style={styles.label}>Eliberat de</Text>
          {errors.cnp && <Text style={styles.errorText}>{errors.cnp}</Text>}
          <TextInput
            style={styles.input}
            value={cnp}
            onChangeText={setCNP}
            keyboardType="numeric"
            placeholder=""
          />
          <Text style={styles.label}>CNP (Cod Numeric Personal)</Text>
          {errors.cnp && <Text style={styles.errorText}>{errors.cnp}</Text>}
          <TextInput
            style={styles.input}
            value={cnp}
            onChangeText={setCNP}
            keyboardType="numeric"
            placeholder="CNP"
          />
          <Text style={styles.input_description}>
            Informații despre instituția de învățământ
          </Text>

          <Text style={styles.label}>Numele instituției de învățământ</Text>
          {errors.institutionName ? (
            <Text style={styles.errorText}>{errors.institutionName}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            value={institutionName}
            onChangeText={setInstitutionName}
            placeholder="19/05/2000"
          />

          <Text style={styles.label}>Facultatea</Text>
          {errors.faculty ? (
            <Text style={styles.errorText}>{errors.faculty}</Text>
          ) : null}
          <View style={styles.input}>
            <RNPickerSelect
              placeholder={placeholder}
              items={pickerData["faculty"].options}
              onValueChange={(value) => setFaculty(value)}
              value={faculty}
            />
          </View>

          <Text style={styles.label}>Anul de studiu</Text>
          {errors.studyYear ? (
            <Text style={styles.errorText}>{errors.studyYear}</Text>
          ) : null}
          <View style={styles.input}>
            <RNPickerSelect
              placeholder={placeholder}
              items={pickerData["studyYear"].options}
              onValueChange={(value) => setStudyYear(value)}
              value={studyYear}
            />
          </View>

          <Text style={styles.label}>Specializarea/programul de studiu</Text>
          {errors.studyProgram ? (
            <Text style={styles.errorText}>{errors.studyProgram}</Text>
          ) : null}
          <View style={styles.input}>
            <RNPickerSelect
              placeholder={placeholder}
              items={pickerData["faculty"].studyProgram[faculty] || []}
              onValueChange={(value) => setStudyProgram(value)}
              value={studyProgram}
            />
          </View>

          <Text style={styles.input_description}>Informații despre cămin</Text>
          <Text style={styles.label}>Opțiunea preferată pentru cămin</Text>
          {errors.dormPreference ? (
            <Text style={styles.errorText}>{errors.dormPreference}</Text>
          ) : null}
          <View style={styles.input}>
            <RNPickerSelect
              placeholder={placeholder}
              items={pickerData["dormPreference"].options}
              onValueChange={(value) => setDormPreference(value)}
              value={dormPreference}
            />
          </View>

          <Text style={styles.label}>Tipul de cameră preferat</Text>
          {errors.roomPreference ? (
            <Text style={styles.errorText}>{errors.roomPreference}</Text>
          ) : null}
          <View style={styles.input}>
            <RNPickerSelect
              placeholder={placeholder}
              items={pickerData["roomPreference"].options}
              onValueChange={(value) => setRoomPreference(value)}
              value={roomPreference}
            />
          </View>

          <Text style={styles.input_description}>Informații de urgență</Text>
          <Text style={styles.label}>
            Numele unei persoane de contact în caz de urgență
          </Text>
          {errors.emergencyContactName ? (
            <Text style={styles.errorText}>{errors.emergencyContactName}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            value={emergencyContactName}
            onChangeText={setEmergencyContactName}
            placeholder="19/05/2000"
          />

          <Text style={styles.label}>
            Număr de telefon al persoanei de contact
          </Text>
          {errors.emergencyContactPhone ? (
            <Text style={styles.errorText}>{errors.emergencyContactPhone}</Text>
          ) : null}
          <TextInput
            style={styles.input}
            value={emergencyContactPhone}
            onChangeText={setEmergencyContactPhone}
            placeholder="19/05/2000"
          />
          <Button title="Register" onPress={handleSubmit} />
        </View>
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

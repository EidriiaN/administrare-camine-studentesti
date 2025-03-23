import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform, Button, Modal, TextInput, TouchableOpacity, FlatList } from "react-native";
import axios from "axios";
import moment from "moment";
import OneOptionModal from "../../components/OneOptionModal";
import Loading from "../../components/Loading";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
const isWeb = Platform.OS === "web";
const ip = Platform.OS === "web" ? process.env.EXPO_PUBLIC_LOCAL : process.env.EXPO_PUBLIC_URL;

export default function Room({ route, navigation }) {
  const { item } = route.params;
  const [allRoomsStudents, setAllRoomsStudents] = useState([]);
  const [studentsRoomData, setStudentsRoomData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState({
    room_capacity: item.room_capacity,
  });
  const [date, setDate] = useState(dayjs());
  const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);
  const [studentDeleteData, setStudentDeleteData] = useState({
    id_room: item.id_room,
    student_name: "",
  });
  const [addStudentInRoom, setAddStudentInRoom] = useState({
    id_room: item.id_room,
    email: item.email,
    id: "",
  });

  useEffect(() => {
    const getStudentsRoomData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://${ip}:3000/getStudentsRoomData/${item.id_room}`, {
          withCredentials: true,
        });
        setStudentsRoomData(response.data);

        const response2 = await axios.get(`https://${ip}:3000/getAllRoomsStudents`, {
          withCredentials: true,
        });

        setAllRoomsStudents(response2.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false);
      }
    };
    getStudentsRoomData();
  }, []);

  const modifyRoom = async () => {
    setLoading(true);
    try {
      await axios.put(`https://${ip}:3000/modifyRoom/${item.id_room}`, roomData, {
        withCredentials: true,
      });

      const response = await axios.get(`https://${ip}:3000/getStudentsRoomData/${item.id_room}`, {
        withCredentials: true,
      });
      setStudentsRoomData(response.data);
      setShowModifyModal(false);
      setShowModal(true);

      setRoomData(roomData);
    } catch (error) {
      console.error("Error modifying room:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async () => {
    setLoading(true);
    try {
      await axios.put(`https://${ip}:3000/deleteStudentRoom/${item.id_room}`, studentDeleteData, {
        withCredentials: true,
      });

      const response = await axios.get(`https://${ip}:3000/getStudentsRoomData/${item.id_room}`, {
        withCredentials: true,
      });
      setStudentsRoomData(response.data);
      setShowDeleteStudentModal(false);
      setShowModal(true);
    } catch (error) {
      console.error("Error delete student:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudentInRoom = async () => {
    setLoading(true);
    try {
      await axios.put(`https://${ip}:3000/addStudentInRoom`, addStudentInRoom, {
        withCredentials: true,
      });

      const response = await axios.get(`https://${ip}:3000/getStudentsRoomData/${item.id_room}`, {
        withCredentials: true,
      });
      setAllRoomsStudents(response.data);
      setShowAddStudentModal(false);
      setShowModal(true);
    } catch (error) {
      console.error("Error delete student:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderModifyRoomModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={showModifyModal} onRequestClose={() => setShowModifyModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Modificare Camera</Text>
            <TextInput
              style={styles.input}
              placeholder={"Capacitatea camerei"}
              onChangeText={(text) => setRoomData({ ...roomData, room_capacity: text })}
            />

            {/* <TouchableOpacity onPress={() => setShowCalendar(true)}>
              <TextInput style={styles.input} value={date.format("DD-MM-YYYY")} placeholder="YYYY-MM-DD" editable={false} />
            </TouchableOpacity>
            {showCalendar && (
              <View style={{ backgroundColor: "#f5f5f5" }}>
                <DateTimePicker
                  mode="single"
                  locale="en"
                  date={roomData.last_renovation}
                  onChange={(params) => {
                    console.log(params, "params");
                    const newDate = dayjs(params.date).add(1, "day");
                    setRoomData((prevData) => ({
                      ...prevData,
                      last_renovation: newDate,
                    }));
                    setDate(params.date);
                    setShowCalendar(false);
                  }}
                />
              </View>
            )} */}

            <View style={{ flexDirection: "row", gap: 10, marginTop: "5%" }}>
              <Button title="Salveaza" onPress={() => modifyRoom()} />
              <Button title="Anuleaza" onPress={() => setShowModifyModal(false)} />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const renderDeleteStudentModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={showDeleteStudentModal} onRequestClose={() => setShowDeleteStudentModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Sterge student din camera</Text>
            {item.students.map((student, index) =>
              student.name ? (
                <TouchableOpacity
                  key={index}
                  style={[styles.input2, selectedStudentIndex === index && { backgroundColor: "lightblue" }]}
                  onPress={() => {
                    setSelectedStudentIndex(index);
                    setStudentDeleteData({
                      ...studentDeleteData,
                      student_name: student.name,
                    });
                  }}
                >
                  <Text>{student.name}</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <Text key={index}>Nu sunt studenți alocați in cameră.</Text>
                </>
              )
            )}
            {item.students[0].name ? (
              <View style={{ flexDirection: "row", gap: 15, marginTop: "8%" }}>
                <Button title="Salveaza" onPress={() => handleDeleteStudent()} />
                <Button
                  title="Anuleaza"
                  onPress={() => {
                    setShowDeleteStudentModal(false);
                    setSelectedStudentIndex("");
                  }}
                />
              </View>
            ) : (
              <View style={{ flexDirection: "row", gap: 15, marginTop: "8%" }}>
                <Button title="Anuleaza" onPress={() => setShowDeleteStudentModal(false)} />
              </View>
            )}
          </View>
        </View>
      </Modal>
    );
  };

  const renderAddStudentModal = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={showAddStudentModal} onRequestClose={() => setShowAddStudentModal(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Adauga student in camera</Text>
            {allRoomsStudents.map((student) =>
              item.free_beds == 0 ? (
                <Text key={student.id}>Nu mai sunt paturi disponibile in camera.</Text>
              ) : (
                <TouchableOpacity
                  key={student.id}
                  style={[styles.input2, selectedStudentIndex === student.id && { backgroundColor: "lightblue" }]}
                  onPress={() => {
                    setSelectedStudentIndex(student.id);
                    setAddStudentInRoom({
                      ...addStudentInRoom,
                      id: student.id,
                    });
                  }}
                >
                  <Text>
                    {student.name} {student.surname} - {student.specialization} - {student.roomPreference}
                  </Text>
                </TouchableOpacity>
              )
            )}
            <View style={{ flexDirection: "row", gap: 15, marginTop: "8%" }}>
              <Button title="Salveaza" onPress={() => handleAddStudentInRoom()} disabled={item.free_beds == 0} />
              <Button
                title="Anuleaza"
                onPress={() => {
                  setShowAddStudentModal(false);
                  setSelectedStudentIndex("");
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  if (loading) {
    return <Loading />;
  }

  console.log(allRoomsStudents);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={{ textAlign: "center", fontSize: 20, marginBottom: "5%" }}>Camera {item.room_number}</Text>
          <View style={styles.infoContainer}>
            <View style={{ gap: 5 }}>
              <Text>Etaj: {item.floor}</Text>
              <Text>Locuri libere: {item.free_beds}</Text>
              <Text>Capacitatea camerei: {roomData.room_capacity}</Text>
              <Text>Data ultimei renovari: {moment(item.last_renovation).format("DD-MM-YYYY")}</Text>
            </View>
            {studentsRoomData.map((student, index) => (
              <StudentInfo key={index} student={student} />
            ))}
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: "5%" }}>
            <View style={styles.buttons}>
              <Button title="Modifica camera" onPress={() => setShowModifyModal(true)} />
            </View>
            <View style={styles.buttons}>
              <Button title="Sterge student" onPress={() => setShowDeleteStudentModal(true)} />
            </View>
            <View style={styles.buttons}>
              <Button title="Adauga student" onPress={() => setShowAddStudentModal(true)} />
            </View>
          </View>
          {renderModifyRoomModal()}
          {renderDeleteStudentModal()}
          {renderAddStudentModal()}
        </View>
      </View>
      <OneOptionModal
        visible={showModal}
        onOption={() => {
          setShowModal(false);
        }}
        onClose={() => {
          setShowModal(false);
        }}
      />
    </KeyboardAvoidingView>
  );
}

const StudentInfo = ({ student }) => {
  if (!student) return null;
  return (
    <View style={styles.studentContainer}>
      <Text>Student: {`${student.name} ${student.surname}`}</Text>
      <Text>{student.faculty}</Text>
      <Text>{student.specialization}</Text>
      <Text>{student.studyProgram}</Text>
    </View>
  );
};

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
    flexDirection: isWeb ? "row" : "column",
    justifyContent: "space-between",
    marginBottom: "5%",
    gap: 10,
  },
  studentContainer: {
    flexDirection: "column",
  },
  buttons: {
    width: "25%",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  input2: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
});

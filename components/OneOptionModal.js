import React from "react";
import { View, Text, Button, Modal, StyleSheet, TouchableOpacity, Pressable, Platform } from "react-native";
const isWeb = Platform.OS === "web";

const OneOptionModal = ({ visible, text = "Succes", textColor = true, onClose, onOption }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={() => onClose()}>
      <Pressable onPress={() => onClose()} style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={[styles.optionText, { color: textColor ? "#00E200" : "#FF2A04" }]}>{text}</Text>
          <Button title="Inchide" onPress={() => onOption()} />
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: isWeb ? "16%" : "50%",
  },
  modalOptions: { flexDirection: "row" },
  optionButton: {
    padding: 10,
    marginVertical: 5,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: "10%",
  },
});

export default OneOptionModal;

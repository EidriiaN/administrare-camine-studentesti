import React from "react";
import { View, Text, Button, Modal, StyleSheet, Platform } from "react-native";
const isWeb = Platform.OS === "web";

const TwoOptionsModal = ({ visible, text, onClose, onOption1, onOption2 }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={() => onClose()}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>{text}</Text>
          <View style={styles.modalOptions}>
            <View style={styles.optionButton}>
              <Button title="Da" onPress={() => onOption1()} />
            </View>
            <View style={styles.optionButton}>
              <Button title="Nu" onPress={() => onOption2()} />
            </View>
          </View>

          {/* <Button title="Anulează" onPress={() => onClose()} /> */}
        </View>
      </View>
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
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: isWeb ? "20%" : "50",
    height: "15%",
  },
  modalOptions: { flexDirection: "row", gap: 15 },
  optionButton: {
    padding: 10,
    marginVertical: 5,
    width: 120,
  },
  optionText: {
    fontSize: 18,
  },
});

export default TwoOptionsModal;

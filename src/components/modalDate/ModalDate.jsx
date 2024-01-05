import React from "react";
import { Calendar } from "react-native-calendars";
import { View, Modal, StyleSheet, TouchableOpacity } from "react-native";

const ModalDate = ({
  visible,
  setShowModal,
  setPrestamo,
  prestamo,
  typeDatePrestamo,
}) => {
  // Setea los datos del préstamo
  const handleChangeData = (day) => {
    setPrestamo({ ...prestamo, [typeDatePrestamo]: day.dateString });
    setShowModal(false);
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      transparent
      animationType="slide"
      // onBackdropP={() => setShowModal(false)}
    >
      <TouchableOpacity style={styles.conteiner}>
        <Calendar
          style={{ borderRadius: 10, elevation: 4, margin: 40 }}
          onDayPress={(day) => handleChangeData(day)}
        />
      </TouchableOpacity>
    </Modal>
  );
};

export default ModalDate;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: "75%",
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

//! AVERIGUA OVERLAY DE react-native-elements

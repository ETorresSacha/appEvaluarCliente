import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import {
  compareAsc,
  format,
  add,
  formatDistance,
  getDate,
  isFuture,
  isEqual,
  differenceInDays,
} from "date-fns";
import {
  View,
  Modal,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Text,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
const ModalDate = ({
  visible,
  setShowModal,
  setPrestamo,
  prestamo,
  typeDatePrestamo,
}) => {
  // Setea los datos del préstamo

  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    setShowModal(false);
    const currentDate = selectedDate;
    setDate(currentDate);
    setPrestamo({
      ...prestamo,
      [typeDatePrestamo]: format(currentDate, "yyyy-MM-dd"),
    });
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      transparent
      animationType="slide"
      onBackdropP={() => setShowModal(false)}
    >
      {visible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}
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
//! primero ver si el modal ya no se usaria, optimizar el codigo
//! AVERIGUA OVERLAY DE react-native-elements

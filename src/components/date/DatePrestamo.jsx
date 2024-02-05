import React, { useState } from "react";
import ModalDate from "../modalDate/ModalDate";
import { Input } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { formatDate } from "../../utils/thunks/Thunks";

const DatePrestamo = ({
  prestamo,
  setPrestamo,
  setErrorsPrestamo,
  errorsPrestamo,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [typeDatePrestamo, setTypeDatePrestamo] = useState("");

  // setea los errores
  const handleTypeDatePrestamo = (element) => {
    setErrorsPrestamo((errorsPrestamo) => ({
      ...errorsPrestamo,
      [element]: "",
    }));
    setShowModal(true);
    setTypeDatePrestamo(element);
  };

  return (
    <View>
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Fecha de desembolso: </Text>
        </View>
        <View style={styles.inputContainerDate}>
          <Input
            style={
              !errorsPrestamo.fechaDesembolso ? styles.input : styles.alertError
            }
            value={
              !prestamo.fechaDesembolso
                ? null
                : formatDate(prestamo?.fechaDesembolso)
            }
            defaultValue={prestamo?.fechaDesembolso}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleTypeDatePrestamo("fechaDesembolso")}
          style={styles.inputDateContainer}
        >
          <Ionicons name="calendar" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Fecha de la primera cuota: </Text>
        </View>
        <View style={styles.inputContainerDate}>
          <Input
            style={
              !errorsPrestamo.fechaPrimeraCuota
                ? styles.input
                : styles.alertError
            }
            value={
              !prestamo?.fechaPrimeraCuota
                ? null
                : formatDate(prestamo?.fechaPrimeraCuota)
            }
            defaultValue={prestamo?.fechaPrimeraCuota}
          />
        </View>
        <TouchableOpacity
          onPress={() => handleTypeDatePrestamo("fechaPrimeraCuota")}
          style={styles.inputDateContainer}
        >
          <Ionicons name="calendar" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ModalDate
        visible={showModal}
        setShowModal={setShowModal}
        setPrestamo={setPrestamo}
        prestamo={prestamo}
        typeDatePrestamo={typeDatePrestamo}
      />
    </View>
  );
};

export default DatePrestamo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
  },

  formItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
  },

  inputContainerDate: {
    flex: 1,
  },
  input: {
    textAlign: "center",
    color: "cornsilk",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  alertError: {
    textAlign: "center",
    color: "cornsilk",
    borderBottomWidth: 2,
    borderColor: "red",
  },
  inputDateContainer: {
    backgroundColor: "rgb(68, 132, 222)",
    borderRadius: 10,
    width: 40,
    alignItems: "center",
  },
  legend: {
    fontWeight: "500",
    paddingLeft: 10,
    fontSize: 16,
    paddingRight: 40,
    color: "white",
  },
  legendContainer: {
    flex: 1,
  },
});

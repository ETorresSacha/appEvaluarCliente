import React, { useState } from "react";
import ModalDate from "../modalDate/ModalDate";
import { Input } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const DatePrestamo = ({ dataPrestamo, setDataPrestamo }) => {
  const dataDate = [
    {
      typeDate: "fechaDesembolso",
      title: "Fecha de desembolso:",
      fecha: dataPrestamo.fechaDesembolso,
    },
    {
      typeDate: "fechaPrimeraCuota",
      title: "Fecha de la primera cuota:",
      fecha: dataPrestamo.fechaPrimeraCuota,
    },
  ];
  const [showModal, setShowModal] = useState(false);
  const [typeDatePrestamo, setTypeDatePrestamo] = useState("");

  const handleTypeDatePrestamo = (element) => {
    setShowModal(true);
    setTypeDatePrestamo(element);
  };

  return (
    <View>
      {dataDate.map((element, index) => {
        return (
          <View key={index} style={styles.formItem}>
            <View style={styles.legendContainer}>
              <Text style={styles.legend}>{element.title} </Text>
            </View>
            <View style={styles.inputContainerDate}>
              <Input style={styles.input} value={element.fecha} />
            </View>
            <TouchableOpacity
              onPress={() => handleTypeDatePrestamo(element.typeDate)}
              style={styles.inputDateContainer}
            >
              <Ionicons name="calendar" size={32} color="white" />
            </TouchableOpacity>
          </View>
        );
      })}
      <ModalDate
        visible={showModal}
        setShowModal={setShowModal}
        setDataPrestamo={setDataPrestamo}
        dataPrestamo={dataPrestamo}
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
  },

  inputContainerDate: {
    flex: 1,
  },
  input: {
    textAlign: "center",
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
  },
  legendContainer: {
    flex: 1,
  },
});

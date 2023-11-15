import React, { useState } from "react";
import { Button, Icon, Input } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import ModalDate from "../modalDate/ModalDate";

const Prestamo = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({
    capital: "",
    tiempo: "",
    interes: "",
    fecha: "",
  });

  return (
    <View style={styles.container}>
      <Text>PRESTAMO</Text>

      {/* ------------------ CAPITAL ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Capital: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            value={data.capital}
            onChangeText={(text) => setData({ ...data, capital: text })}
          />
        </View>
      </View>

      {/* ------------------ TIEMPO ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Tiempo: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            value={data.tiempo}
            onChangeText={(text) => setData({ ...data, tiempo: text })}
          />
        </View>
      </View>

      {/* ------------------ INTERES ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Interes: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            value={data.interes}
            onChangeText={(text) => setData({ ...data, interes: text })}
          />
        </View>
      </View>

      {/* ------------------ FECHA ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Fecha de primera cuota: </Text>
        </View>
        <View style={styles.inputContainerDate}>
          <Input style={styles.input} value={data.fecha} />
        </View>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={styles.inputDateContainer}
        >
          <Ionicons name="calendar" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ModalDate
        visible={showModal}
        setShowModal={setShowModal}
        setData={setData}
        data={data}
      />

      {/* ------------------ CUOTA ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Cuota: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input style={styles.input} value="HOLA" />
        </View>
      </View>
    </View>
  );
};

export default Prestamo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },

  content: {
    marginVertical: 16,
  },

  formItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    paddingRight: 40,
    textAlign: "center",
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
  },
  legendContainer: {
    flex: 1,
  },
});

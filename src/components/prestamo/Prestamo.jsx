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
import { Calendar, LocaleConfig } from "react-native-calendars";
import ModalDate from "../modalDate/ModalDate";

const Prestamo = () => {
  const [showModal, setShowModal] = useState(false);
  const [dateNow, setDateNow] = useState("");

  return (
    <View style={styles.container}>
      <Text>PRESTAMO</Text>
      {/* <View style={styles.item}>
        <View style={styles.item1}>
          <Text style={styles.title}>Capital: </Text>
          <Input style={styles.input} value="" />
        </View>
      <View>
          <Input style={styles.input} value="" />
        </View> 
      </View>  */}

      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Capital: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input value="" />
        </View>
      </View>

      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Tiempo: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input value="" />
        </View>
      </View>

      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Interes: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input value="" />
        </View>
      </View>

      {/* ------------- FECHA ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Fecha de primera cuota: </Text>
        </View>
        <View style={styles.inputContainerDate}>
          <Input value={dateNow} />
        </View>
        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={{
            backgroundColor: "rgb(68, 132, 222)",
            borderRadius: 10,
            width: 40,
            alignItems: "center",
          }}
        >
          <Ionicons name="calendar" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ModalDate
        visible={showModal}
        setShowModal={setShowModal}
        setDateNow={setDateNow}
      />
      {/* ------------------------------------*/}

      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Cuota: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input value="" />
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
  title: {
    flex: 1,
    fontSize: 16,
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
  },
  inputContainerDate: {
    flex: 1,
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

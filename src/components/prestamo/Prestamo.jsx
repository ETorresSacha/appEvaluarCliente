import React, { useState } from "react";
import { Button, Icon, Input } from "@rneui/themed";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

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
import OptionsSure from "../checkBoxs/OptionsSure";

const infoPeriod = [
  { label: "Diario", value: "1" },
  { label: "Semanal", value: "2" },
  { label: "Quincenal", value: "3" },
  { label: "Mensual", value: "4" },
];

const Prestamo = ({ dataPrestamo, setDataPrestamo }) => {
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState(null);

  // tipo de fecha

  const [typeDatePrestamo, setTypeDatePrestamo] = useState("");

  const handleTypeDatePrestamo = (element) => {
    setShowModal(true);
    setTypeDatePrestamo(element);
  };

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="rgb(68, 132, 222)"
            name="check"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>PRESTAMO</Text>
      {/* ------------------ PERIODO ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Periodo: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={infoPeriod}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder="Seleccione"
            value={value}
            onChange={(item) => {
              setValue(item.value);
              setDataPrestamo({ ...dataPrestamo, periodo: item.value });
            }}
            renderItem={renderItem}
          />
        </View>
      </View>

      {/* ------------------ CAPITAL ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Capital: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="soles"
            style={styles.input}
            value={dataPrestamo.capital}
            onChangeText={(text) =>
              setDataPrestamo({ ...dataPrestamo, capital: text })
            }
          />
        </View>
      </View>

      {/* ------------------ INTERES ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>TEA: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="%"
            style={styles.input}
            value={dataPrestamo.tea}
            onChangeText={(text) =>
              setDataPrestamo({ ...dataPrestamo, tea: text })
            }
          />
        </View>
      </View>

      {/* ------------------ NUMERO DE CUOTAS ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>N° Cuotas: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input
            placeholder="meses"
            style={styles.input}
            value={dataPrestamo.tiempo}
            onChangeText={(text) =>
              setDataPrestamo({ ...dataPrestamo, tiempo: text })
            }
          />
        </View>
      </View>

      {/* ------------------ FECHA DE DESEMBOLSO ------------------*/}
      {[
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
      ].map((element, index) => {
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

      {/* ------------------ CUOTA ------------------*/}
      {/* <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Cuota: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input style={styles.input} value="" />
        </View>
      </View> */}

      {/* ------------------ OPTIONS SURE ------------------*/}
      {/* <OptionsSure /> */}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.btnCalcular}>
          <Text style={styles.text}>Calcular</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Prestamo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
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
    paddingRight: 40,
  },
  legendContainer: {
    flex: 1,
  },
  icon: {
    marginRight: 5,
  },

  item: {
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  dropdown: {
    margin: 16,
    height: 30,
    width: 170,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  btnCalcular: {
    marginTop: 15,

    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4ecb71",
    width: 200,
    height: 40,
    borderRadius: 15,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});

import React, { useState, useEffect } from "react";
import { Button, Icon, Input } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import DatePrestamo from "../date/DatePrestamo";

const infoPeriod = [
  { label: "Diario", value: "1" },
  { label: "Semanal", value: "2" },
  { label: "Quincenal", value: "3" },
  { label: "Mensual", value: "4" },
];

const Prestamo = ({ dataPrestamo, setDataPrestamo }) => {
  const [value, setValue] = useState(null);

  const [placeholderNumCuotas, setPlaceholderNumCuotas] = useState("");

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
              setPlaceholderNumCuotas(item.label);
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
            placeholder="Soles"
            style={styles.input}
            value={dataPrestamo.capital}
            defaultValue={dataPrestamo.capital}
            onChangeText={(text) =>
              setDataPrestamo({ ...dataPrestamo, capital: text })
            }
            keyboardType="numeric"
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
            defaultValue={dataPrestamo.tea}
            onChangeText={(text) =>
              setDataPrestamo({ ...dataPrestamo, tea: text })
            }
            keyboardType="numeric"
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
            placeholder={placeholderNumCuotas}
            style={styles.input}
            value={dataPrestamo.nCuotas}
            defaultValue={dataPrestamo.nCuotas}
            onChangeText={(text) =>
              setDataPrestamo({ ...dataPrestamo, nCuotas: text })
            }
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* ------------------ FECHA DE DESEMBOLSO ------------------*/}
      <DatePrestamo
        dataPrestamo={dataPrestamo}
        setDataPrestamo={setDataPrestamo}
      />
    </View>
  );
};

export default Prestamo;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
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

  input: {
    textAlign: "center",
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
});

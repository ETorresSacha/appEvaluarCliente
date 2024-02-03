import React, { useState } from "react";
import { Input } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, StyleSheet, Text } from "react-native";
import DatePrestamo from "../date/DatePrestamo";

const infoPeriod = [
  { label: "Diario", value: "1" },
  { label: "Semanal", value: "2" },
  { label: "Quincenal", value: "3" },
  { label: "Mensual", value: "4" },
];

const Prestamo = ({
  errorsPrestamo,
  setErrorsPrestamo,
  prestamo,
  setPrestamo,
}) => {
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

  // Setea el estado y los errores
  const handleChangeData = (event, type) => {
    setPrestamo({ ...prestamo, [type]: event.nativeEvent.text });
    setErrorsPrestamo((errorsPrestamo) => ({
      ...errorsPrestamo,
      [type]: "",
    }));
  };

  return (
    <View style={styles.container}>
      {/* ------------------ PERIODO ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Periodo: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Dropdown
            style={
              !errorsPrestamo.periodo
                ? styles.dropdown
                : styles.alertErrordropdown
            }
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
              setPrestamo({ ...prestamo, periodo: item.value });
              setPlaceholderNumCuotas(item.label);
              setErrorsPrestamo((errorsPrestamo) => ({
                ...errorsPrestamo,
                periodo: "",
              }));
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
            style={!errorsPrestamo.capital ? styles.input : styles.alertError}
            value={prestamo.capital}
            defaultValue={prestamo.capital}
            onChange={(event) => {
              handleChangeData(event, "capital");
            }}
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
            style={!errorsPrestamo.tea ? styles.input : styles.alertError}
            value={prestamo.tea}
            defaultValue={prestamo.tea}
            onChange={(event) => {
              handleChangeData(event, "tea");
            }}
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
            style={!errorsPrestamo.cuotas ? styles.input : styles.alertError}
            value={prestamo.cuotas}
            defaultValue={prestamo.cuotas}
            onChange={(event) => {
              handleChangeData(event, "cuotas");
            }}
            //onChangeText={(text) => setPrestamo({ ...prestamo, nCuotas: text })}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* ------------------ FECHA DE DESEMBOLSO ------------------*/}
      <DatePrestamo
        prestamo={prestamo}
        setPrestamo={setPrestamo}
        setErrorsPrestamo={setErrorsPrestamo}
        errorsPrestamo={errorsPrestamo}
      />
    </View>
  );
};

export default Prestamo;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 17,
    color: "white",
    paddingVertical: 5,
    fontWeight: "bold",
  },
  titleEvaluar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 7,
    backgroundColor: "rgba(36, 146, 224, 0.625)",
  },

  formItem: {
    paddingHorizontal: 5,
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
    borderColor: "red",
  },
  alertErrordropdown: {
    margin: 16,
    height: 30,
    width: 170,
    backgroundColor: "red",
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
    borderColor: "red",
  },
});

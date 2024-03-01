import React, { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import DatePrestamo from "../date/DatePrestamo";
import { useFocusEffect } from "@react-navigation/native";

import UseStorageTPM from "../hooks/UseHookTasaPrimaMensual";
import ModalCofigTPM from "../../modals/modalCofigTPM/ModalCofigTPM";

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
  editValue,
  valuePrest,
}) => {
  const { onGetTPM } = UseStorageTPM();

  const [isVisible, setIsVisible] = useState(false);
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

  // Carga el valor de la Tasa Prima Mensual
  const loadTPM = async () => {
    try {
      let result = await onGetTPM();
      console.log("result: " + result);
      if (!editValue) {
        result = !result ? "0.08" : result;
      }
      if (editValue) {
        result = prestamo.tasaPrimaMensual;
      }
      setPrestamo({ ...prestamo, tasaPrimaMensual: result });
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadTPM();
    }, [isVisible, valuePrest])
  );
  // useEffect(() => {
  //   loadTPM();
  // }, [isVisible]);

  return (
    <View style={styles.container}>
      {/* ------------------ TASA PRIMA MENSUAL ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Tasa Prima Mensual: </Text>
        </View>
        <View
          style={[
            {
              display: "flex",
              flexDirection: "row",
              marginRight: 10,
            },
          ]}
        >
          <View>
            <Text style={[styles.legend, { fontSize: 20 }]}>
              {prestamo.tasaPrimaMensual} {" %"}
            </Text>
          </View>
          <TouchableOpacity onPress={() => setIsVisible(true)}>
            <AntDesign style={styles.icon} color="#FFF" name="edit" size={30} />
          </TouchableOpacity>
        </View>
      </View>

      {/* -- CONFIGURACIÓN DEL MODAL (TASA PRIMA MENSUAL) --*/}
      <ModalCofigTPM
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        editValue={editValue}
        setPrestamo={setPrestamo}
        prestamo={prestamo}
      />

      {/* ------------------ PERIODO ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Periodo: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Dropdown
            style={
              !errorsPrestamo.periodo
                ? [styles.dropdown, { backgroundColor: "white" }]
                : [styles.dropdown, { backgroundColor: "red" }]
            }
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={infoPeriod}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={!prestamo.periodo ? "Seleccione" : prestamo.periodo}
            value={value}
            onChange={(item) => {
              setValue(item.value);
              setPrestamo({ ...prestamo, periodo: item.label });
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
          <TextInput
            placeholder="Soles"
            placeholderTextColor="gray"
            style={
              !errorsPrestamo.capital
                ? [styles.input, { borderBottomColor: "white" }]
                : [styles.input, { borderBottomColor: "red" }]
            }
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
          <TextInput
            placeholder="%"
            placeholderTextColor="gray"
            style={
              !errorsPrestamo.tea
                ? [styles.input, { borderBottomColor: "white" }]
                : [styles.input, { borderBottomColor: "red" }]
            }
            value={prestamo.tea}
            defaultValue={prestamo.tea}
            onChange={(event) => {
              handleChangeData(event, "tea");
            }}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* ------------------ NÚMERO DE CUOTAS ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>N° Cuotas: </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={placeholderNumCuotas}
            placeholderTextColor="gray"
            style={
              !errorsPrestamo.cuotas
                ? [styles.input, { borderBottomColor: "white" }]
                : [styles.input, { borderBottomColor: "red" }]
            }
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
  container: { flex: 1, paddingTop: 15, gap: 25 },
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
    alignItems: "center",
    textAlign: "center",
    color: "cornsilk",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 160,
    fontSize: 17,
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
});

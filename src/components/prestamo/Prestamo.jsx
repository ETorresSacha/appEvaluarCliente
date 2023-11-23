import React, { useState, useEffect } from "react";
import { Button, Icon, Input } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import DatePrestamo from "../date/DatePrestamo";
import {
  Calculos,
  OJO,
  calculoParaCambiar,
  result,
  resultCuotas,
  resutCronograma,
} from "../../utils/calculoCuota/CalculosCuota";
import UseStorage from "../hooks/UseHookStorage";
import {
  validationDataPerson,
  validationDataPrestamo,
} from "../../utils/validation/Validation";

const infoPeriod = [
  { label: "Diario", value: "1" },
  { label: "Semanal", value: "2" },
  { label: "Quincenal", value: "3" },
  { label: "Mensual", value: "4" },
];

const Prestamo = ({ setResultCuota, setEnabled }) => {
  const [value, setValue] = useState(null);
  const [errorsPrestamo, setErrorsPrestamo] = useState({});
  const [placeholderNumCuotas, setPlaceholderNumCuotas] = useState("");
  const { onSaveCronograma } = UseStorage();
  const [dataPrestamo, setDataPrestamo] = useState({
    capital: "",
    nCuotas: "",
    tea: "",
    fechaDesembolso: "",
    fechaPrimeraCuota: "",
    periodo: "",
  });

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

  useFocusEffect(
    React.useCallback(() => {
      setErrorsPrestamo(validationDataPrestamo(dataPrestamo));
      //return () => unsubscribe();
    }, [dataPrestamo])
  );

  const handleCalcular = async (data) => {
    //! OJO: FALTA CUADRAR BIEN LAS CUOTAS CON EL CRONOGRAMA REAL
    setErrorsPrestamo(validationDataPrestamo(data));

    if (errorsPrestamo.incompletos === "") {
      const result = resutCronograma(data);
      setResultCuota(result);
      setEnabled(true);

      try {
        await onSaveCronograma(result);
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert("Datos incompletos");
    }
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

      {/* ------------------ OPTIONS SURE ------------------*/}
      {/* <OptionsSure /> */}

      {/* ------------------ CALCULAR ------------------*/}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.btnCalcular}
          onPress={() => handleCalcular(dataPrestamo)}
        >
          <Text style={styles.text}>Calcular</Text>
        </TouchableOpacity>
      </View>
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

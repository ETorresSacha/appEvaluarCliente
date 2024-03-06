import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import DataCustomer from "../../components/dataCustomer/DataCustomer";
import UseStorage from "../../components/hooks/UseHookStorage";
import Calculator from "../calculator/Calculator";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";
import { validationDataPerson } from "../../utils/validation/Validation";
import Header from "../../components/header/Header";

const NewForm = (props) => {
  const uuid = uuidv4();
  const navigation = useNavigation();
  const { onSaveCronograma } = UseStorage();

  const [errorsP, setErrorsP] = useState({});
  const [errores, setErrores] = useState({});
  const [clean, setClean] = useState(false);
  const [valuePrest, setValuePrest] = useState(false);
  const [dataPrestamo, setDataPrestamo] = useState({});
  const [valueError, setValueError] = useState(false);

  // TODO --> Editar los datos
  // *** Propiedades que se usan para editar ***
  const user = props.route.params ? props.route.params.user : null;
  const editValue = props.route.params ? props.route.params.editValue : null;
  const color = props.route.params ? props.route.params.typeColor : null;
  const id = props.route.params ? props.route.params.id : null;
  const enable = props.route.params ? props.route.params.enable : null;
  // ****/

  const [dataPerson, setDataPerson] = useState({
    uuid: !user ? uuid : user[0].uuid,
    nombre: !user ? "" : user[0].nombre,
    apellido: !user ? "" : user[0].apellido,
    dni: !user ? "" : user[0].dni,
    correo: !user ? "" : user[0].correo,
    direccion: !user ? "" : user[0].direccion,
    celular: !user ? "" : user[0].celular,
    cancelled: !user ? false : user[0].cancelled,
    // Datos del préstamo
    capital: !user ? "" : user[0].capital,
    cuotas: !user ? "" : user[0].cuotas,
    tea: !user ? "" : user[0].tea,
    fechaDesembolso: !user ? "" : user[0].fechaDesembolso,
    fechaPrimeraCuota: !user ? "" : user[0].fechaPrimeraCuota,
    periodo: !user ? "" : user[0].periodo,
    tasaPrimaMensual: !user ? "" : user[0].tasaPrimaMensual,
    resultPrestamo: !user ? [] : user[0].resultPrestamo,
  });

  useEffect(() => {
    // Limpia es estado
    if (clean) {
      setDataPerson({
        uuid,
        nombre: "",
        apellido: "",
        dni: "",
        correo: "",
        direccion: "",
        celular: "",
        cancelled: false,
        capital: "",
        cuotas: "",
        tea: "",
        fechaDesembolso: "",
        fechaPrimeraCuota: "",
        periodo: "",
        tasaPrimaMensual: "",
        resultPrestamo: [],
      });
    }
  }, [clean]);

  // TODO ---> Guardar los datos
  const handleDataKeep = async () => {
    // Validación
    setValuePrest(true);
    setErrores(validationDataPerson(dataPerson));

    //Guardar datos
    let errorCustomer = validationDataPerson(dataPerson);
    let valuesErrorDataCustomer = Object.values(errorCustomer); // Errores del componente DataCuatomer
    let valuesErrorPrestamos = Object.values(errorsP); // Errores del componente Prestamo

    if (valuesErrorDataCustomer.some((error) => error !== "") || !valueError) {
      let typeError = valuesErrorDataCustomer.find((element) => element != ""); // Busca el tipo de error que existe en dataCustomer
      let typeError2 = valuesErrorPrestamos.find((element) => element != ""); // Busca el tipo de error que existe en Prestamo

      Alert.alert(typeError ? typeError : typeError2);
    } else {
      try {
        Alert.alert("GUARDAR", "¿Desea continuar?", [
          {
            text: "Si",
            onPress: async () => {
              await onSaveCronograma(dataPerson, editValue);
              if (editValue) {
                navigation.navigate("Detalle", {
                  id: id,
                  typeColor: null,
                  enable: enable ? enable : null,
                });
              } else {
                setClean(true);
                setValuePrest(false);
              }
            },
            style: "destructive",
          },
          {
            text: "No",
            style: "destructive",
          },
        ]);
      } catch (error) {
        console.log(error);
        Alert.alert("Ocurrió un error");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Header
        title={editValue ? " Editar cliente" : "Nuevo cliente"}
        back={"Clientes"}
        id={id}
        color={color}
        enable={enable}
      />
      <DataCustomer
        setErrores={setErrores}
        errores={errores}
        setDataPerson={setDataPerson}
        dataPerson={dataPerson}
        setClean={setClean}
        editValue={editValue}
      />
      <Calculator
        dataPrestamo={dataPrestamo}
        errorsP={errorsP}
        setErrorsP={setErrorsP}
        clean={clean}
        setClean={setClean}
        dataPerson={dataPerson}
        setDataPerson={setDataPerson}
        valuePrest={valuePrest}
        setValueError={setValueError}
        setValuePrest={setValuePrest}
        editValue={editValue}
        user={user}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={handleDataKeep}>
        <Text style={styles.text}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default NewForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
    display: "flex",
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: "center",
    width: 250,
    height: 40,
    marginLeft: 80,
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#4ecb71",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

//! 4. carga pero se demora en visaulaixar, eso tenemos que corregir

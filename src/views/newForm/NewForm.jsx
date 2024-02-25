import React, { useCallback, useEffect, useState } from "react";
import {
  View,
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
  console.log(props);
  const navigation = useNavigation();
  const { onSaveCronograma } = UseStorage();

  const [errorsP, setErrorsP] = useState({});
  const [errores, setErrores] = useState({});
  const [clean, setClean] = useState(false);
  const [valuePrest, setValuePrest] = useState(false);
  const [dataPrestamo, setDataPrestamo] = useState({});
  const [valueError, setValueError] = useState(false);
  const [edit, setEdit] = useState(false);

  const user = props.route.params ? props.route.params.user : null;
  const editValue = props.route.params ? props.route.params.editValue : null;
  //console.log(user);
  useEffect(() => {
    if (user) {
      setEdit(true);
    }
  }, []);

  const [dataPerson, setDataPerson] = useState({
    uuid: !user ? uuid : user[0].uuid,
    nombre: !user ? "" : user[0].nombre,
    apellido: !user ? "" : user[0].apellido,
    dni: !user ? "" : user[0].dni,
    correo: !user ? "" : user[0].correo,
    direccion: !user ? "" : user[0].direccion,
    celular: !user ? "" : user[0].celular,
    cancelled: !user ? false : user[0].celular,
    // Datos del préstamo
    capital: !user ? "" : user[0].capital,
    cuotas: !user ? "" : user[0].cuotas,
    tea: !user ? "" : user[0].tea,
    fechaDesembolso: !user ? "" : user[0].fechaDesembolso,
    fechaPrimeraCuota: !user ? "" : user[0].fechaPrimeraCuota,
    periodo: !user ? "" : user[0].periodo,
    tasaPrimaMensual: !user ? "" : user[0].tasaPrimaMensual,
    resultPrestamo: [],
  });

  ///console.log(dataPerson);
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
              await onSaveCronograma({
                uuid,
                nombre: dataPerson?.nombre,
                apellido: dataPerson?.apellido,
                dni: dataPerson?.dni,
                correo: dataPerson?.correo,
                direccion: dataPerson?.direccion,
                celular: dataPerson?.celular,
                cancelled: dataPerson?.cancelled,
                capital: dataPerson?.capital,
                cuotas: dataPerson?.cuotas,
                tea: dataPerson?.tea,
                fechaDesembolso: dataPerson?.fechaDesembolso,
                fechaPrimeraCuota: dataPerson?.fechaPrimeraCuota,
                periodo: dataPerson?.periodo,
                tasaPrimaMensual: dataPerson.tasaPrimaMensual,
                resultPrestamo: dataPerson.resultPrestamo,
              });

              Alert.alert(
                "Se guardo correctamente",
                "¿Desea agregar un nuevo cliente?",
                [
                  {
                    text: "Si",
                    onPress: () => {
                      setClean(true);
                      setValuePrest(false);
                    },
                    style: "destructive",
                  },
                  {
                    text: "No",
                    onPress: () => navigation.navigate("Clientes"),
                    style: "destructive",
                  },
                ]
              );
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

  // TODO --> Editar los datos
  //console.log(props);

  return (
    <ScrollView style={styles.container}>
      <Header title={"Nuevo cliente"} back={"Clientes"} />
      <DataCustomer
        setErrores={setErrores}
        errores={errores}
        setDataPerson={setDataPerson}
        dataPerson={dataPerson}
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
        edit={edit}
        setEdit={setEdit}
        editValue={editValue}
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

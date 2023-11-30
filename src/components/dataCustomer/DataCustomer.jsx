import React, { useEffect, useState } from "react";
import { Button, Icon, Input } from "@rneui/themed";
import { View, Text, StyleSheet, Alert, TextInput } from "react-native";
import { validationDataPerson } from "../../utils/validation/Validation";
import { useFocusEffect } from "@react-navigation/native";

const DataCustomer = ({ setValuePerson, dataPerson, setDataPerson }) => {
  const [errors, setErrors] = useState({});
  const handleChangeData = (event, type) => {
    setDataPerson({ ...dataPerson, [type]: event.nativeEvent.text });
    // setErrors(validationDataPerson(dataPerson));
  };
  //console.log(dataPerson);

  useEffect(() => {
    let resultVal = Object.values(errors);
    if (resultVal.some((error) => error !== "")) {
      setValuePerson(false);
    } else {
      setValuePerson(true);
    }
  }, [errors, errors.length]);

  useFocusEffect(
    React.useCallback(() => {
      setErrors(validationDataPerson(dataPerson));
      //return () => unsubscribe();
    }, [dataPerson])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DATOS</Text>
      <View style={styles.containerInput}>
        {/* ------------------- Nombre ------------------ */}
        <View>
          <View>
            <Text style={styles.subTitle}>Nombre</Text>
          </View>
          <View style={styles.containerInputText}>
            <TextInput
              value={dataPerson.nombre}
              style={styles.input}
              placeholder="Nombre"
              onChange={(event) => {
                handleChangeData(event, "nombre");
              }}
              errorMessage="Error"
              defaultValue={dataPerson.nombre}
              onChangeText={(text) => {
                setDataPerson({ ...dataPerson, nombre: text });
                setErrors(dataPerson);
              }}
            />
          </View>
        </View>

        {/* ------------------- Apellido ------------------ */}
        <View>
          <View>
            <Text style={styles.subTitle}>Apellido</Text>
          </View>
          <View style={styles.containerInputText}>
            <TextInput
              value={dataPerson.apellido}
              style={styles.input}
              placeholder="Apellido"
              // onChange={(event) => {
              //   handleChangeData(event, "apellido");
              // }}
              errorMessage="Error"
              defaultValue={dataPerson.apellido}
              onChangeText={(text) =>
                setDataPerson({ ...dataPerson, apellido: text })
              }
            />
          </View>
        </View>

        {/* ------------------- DNI ------------------ */}
        <View>
          <View>
            <Text style={styles.subTitle}>DNI</Text>
          </View>
          <View style={styles.containerInputText}>
            <TextInput
              value={dataPerson.dni}
              style={styles.input}
              placeholder="DNI"
              // onChange={(event) => {
              //   handleChangeData(event, "dni");
              // }}
              errorMessage="Error"
              defaultValue={dataPerson.dni}
              onChangeText={(text) => {
                setDataPerson({ ...dataPerson, dni: text });
                setErrors(dataPerson);
              }}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* ------------------- Correo ------------------ */}
        <View>
          <View>
            <Text style={styles.subTitle}>Correo</Text>
          </View>
          <View style={styles.containerInputText}>
            <TextInput
              value={dataPerson.correo}
              style={styles.input}
              placeholder="Correo"
              // onChange={(event) => {
              //   handleChangeData(event, "correo");
              // }}
              errorMessage="Error"
              defaultValue={dataPerson.correo}
              onChangeText={(text) =>
                setDataPerson({ ...dataPerson, correo: text })
              }
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* ------------------- Dirección ------------------ */}
        <View>
          <View>
            <Text style={styles.subTitle}>Dirección</Text>
          </View>
          <View style={styles.containerInputText}>
            <TextInput
              value={dataPerson.direccion}
              style={styles.input}
              placeholder="Dirección"
              // onChange={(event) => {
              //   handleChangeData(event, "direccion");
              // }}
              errorMessage="Error"
              defaultValue={dataPerson.direccion}
              onChangeText={(text) =>
                setDataPerson({ ...dataPerson, direccion: text })
              }
            />
          </View>
        </View>

        {/* ------------------- Celular ------------------ */}
        <View>
          <View>
            <Text style={styles.subTitle}>Celular</Text>
          </View>
          <View style={styles.containerInputText}>
            <TextInput
              value={dataPerson.celular}
              style={styles.input}
              placeholder="Celular"
              // onChange={(event) => {
              //   handleChangeData(event, "celular");
              // }}
              errorMessage="Error"
              defaultValue={dataPerson.celular}
              onChangeText={(text) =>
                setDataPerson({ ...dataPerson, celular: text })
              }
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DataCustomer;

const styles = StyleSheet.create({
  container: {
    //padding: 10,
  },
  title: {
    fontSize: 17,
    color: "white",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    paddingLeft: 7,
    paddingVertical: 5,
    fontWeight: "bold",
  },
  containerInput: {
    paddingTop: 10,
    gap: 7,
    display: "flex",
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  subTitle: {
    fontSize: 15,
    color: "white",
  },
  containerInputText: {
    marginTop: 3,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "honeydew",
  },
  input: {
    height: 30,
    width: 185,
    borderWidth: 1,
    borderRadius: 15,
    padding: 2,
    paddingLeft: 10,
  },
});

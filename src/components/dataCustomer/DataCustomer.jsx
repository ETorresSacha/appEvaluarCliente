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
      <Text>DATOS</Text>
      <View style={styles.containerInput}>
        {/* ------------------- Nombre ------------------ */}
        <View>
          <View>
            <Text style={styles.title}>Nombre</Text>
          </View>
          <View>
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
            <Text style={styles.title}>Apellido</Text>
          </View>
          <View>
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
            <Text style={styles.title}>DNI</Text>
          </View>
          <View>
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
            <Text style={styles.title}>Correo</Text>
          </View>
          <View>
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
            <Text style={styles.title}>Dirección</Text>
          </View>
          <View>
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
            <Text style={styles.title}>Celular</Text>
          </View>
          <View>
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
  container: {},
  containerInput: {
    gap: 5,
    display: "flex",
    paddingHorizontal: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 15,
  },
  input: {
    height: 30,
    width: 180,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
  },
});

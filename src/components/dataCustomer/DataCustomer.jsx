import React from "react";
import { Button, Icon, Input } from "@rneui/themed";
import { View, Text, StyleSheet, Alert, TextInput } from "react-native";
import { validationDataPerson } from "../../utils/validation/Validation";

const DataCustomer = ({ errors, setErrors, dataPerson, setDataPerson }) => {
  const handleChangeData = (event, type) => {
    setDataPerson({ ...dataPerson, [type]: event.nativeEvent.text });
    //setErrors(validationDataPerson(dataPerson)); ---> ESTO ES OTRA FORMA DE VALIDAR
  };

  // const register = () => {
  //   if (!validateData()) {
  //     return;
  //   }
  //   console.log("validado");
  // };

  // const validateData = () => {
  //   setErrors({
  //     nombre: "",
  //     apellido: "",
  //     dni: "",
  //     correo: "",
  //     direccion: "",
  //     celular: "",
  //   });
  //   let isValid = true;

  //   if (validationDataPerson) {
  //   }
  // };

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
              // onChangeText={(text) => {
              //   console.log(text);
              //   setDataPerson({ ...dataPerson, nombre: text });
              //   setErrors(dataPerson);
              // }}
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
              onChange={(event) => {
                handleChangeData(event, "apellido");
              }}
              errorMessage="Error"
              defaultValue={dataPerson.apellido}
              // onChangeText={(text) =>
              //   setDataPerson({ ...dataPerson, apellido: text })
              // }
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
              onChange={(event) => {
                handleChangeData(event, "dni");
              }}
              errorMessage="Error"
              defaultValue={dataPerson.dni}
              // onChangeText={(text) => {
              //   setDataPerson({ ...dataPerson, dni: text });
              //   setErrors(dataPerson);
              // }}
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
              onChange={(event) => {
                handleChangeData(event, "correo");
              }}
              errorMessage="Error"
              defaultValue={dataPerson.correo}
              // onChangeText={(text) =>
              //   setDataPerson({ ...dataPerson, correo: text })
              // }
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
              onChange={(event) => {
                handleChangeData(event, "direccion");
              }}
              errorMessage="Error"
              defaultValue={dataPerson.direccion}
              // onChangeText={(text) =>
              //   setDataPerson({ ...dataPerson, direccion: text })
              // }
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
              onChange={(event) => {
                handleChangeData(event, "celular");
              }}
              errorMessage="Error"
              defaultValue={dataPerson.celular}
              // onChangeText={(text) =>
              //   setDataPerson({ ...dataPerson, celular: text })
              // }
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

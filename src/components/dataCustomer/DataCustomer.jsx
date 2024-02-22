import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { validationDataPerson } from "../../utils/validation/Validation";

const DataCustomer = ({ errores, setErrores, dataPerson, setDataPerson }) => {
  //Todo--> Esta es otra forma de setear y validar los datos (SOLO COMO RECORDATORIO)
  const handleChangeData = (event, type) => {
    setDataPerson({ ...dataPerson, [type]: event.nativeEvent.text });
    setErrores(validationDataPerson(dataPerson));
  };
  //Todo--> ****************************************************

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DATOS</Text>
      <View style={styles.containerInput}>
        {/* ------------------- Nombre ------------------ */}
        <View>
          <View>
            <Text style={styles.subTitle}>Nombre</Text>
          </View>
          <View
            style={
              !errores.nombre ? styles.containerInputText : styles.alertError
            }
          >
            <TextInput
              value={dataPerson.nombre}
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor="gray"
              // onChange={(event) => {
              //   handleChangeData(event, "nombre");
              // }}
              errorMessage="Error"
              defaultValue={dataPerson.nombre}
              onChangeText={(text) => {
                setDataPerson({ ...dataPerson, nombre: text });
                setErrores((errores) => ({ ...errores, nombre: "" }));
              }}
            />
          </View>
        </View>

        {/* ------------------- Apellido ------------------ */}
        <View>
          <View>
            <Text style={styles.subTitle}>Apellidos</Text>
          </View>
          <View
            style={
              !errores.apellidos ? styles.containerInputText : styles.alertError
            }
          >
            <TextInput
              value={dataPerson.apellido}
              style={styles.input}
              placeholder="Apellido"
              placeholderTextColor="gray"
              errorMessage="Error"
              defaultValue={dataPerson.apellido}
              onChangeText={(text) => {
                setDataPerson({ ...dataPerson, apellido: text });
                setErrores((errores) => ({ ...errores, apellidos: "" }));
              }}
            />
          </View>
        </View>

        {/* ------------------- DNI ------------------ */}
        <View>
          <View>
            <Text style={styles.subTitle}>DNI</Text>
          </View>
          <View
            style={
              !errores.dni && !errores.dniError
                ? styles.containerInputText
                : styles.alertError
            }
          >
            <TextInput
              value={dataPerson.dni}
              style={styles.input}
              placeholder="DNI"
              placeholderTextColor="gray"
              errorMessage="Error"
              defaultValue={dataPerson.dni}
              onChangeText={(text) => {
                setDataPerson({ ...dataPerson, dni: text });
                setErrores((errores) => ({
                  ...errores,
                  dni: "",
                  dniError: "",
                }));
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
          <View
            style={
              !errores.correo && !errores.correoError
                ? styles.containerInputText
                : styles.alertError
            }
          >
            <TextInput
              value={dataPerson.correo}
              style={styles.input}
              placeholder="Correo"
              placeholderTextColor="gray"
              errorMessage="Error"
              defaultValue={dataPerson.correo}
              onChangeText={(text) => {
                setDataPerson({ ...dataPerson, correo: text });
                setErrores((errores) => ({
                  ...errores,
                  correo: "",
                  correoError: "",
                }));
              }}
              keyboardType="email-address"
            />
          </View>
        </View>

        {/* ------------------- Dirección ------------------ */}
        <View>
          <View>
            <Text style={styles.subTitle}>Dirección</Text>
          </View>
          <View
            style={
              !errores.direccion ? styles.containerInputText : styles.alertError
            }
          >
            <TextInput
              value={dataPerson.direccion}
              style={styles.input}
              placeholder="Dirección"
              placeholderTextColor="gray"
              errorMessage="Error"
              defaultValue={dataPerson.direccion}
              onChangeText={(text) => {
                setDataPerson({ ...dataPerson, direccion: text });
                setErrores((errores) => ({ ...errores, direccion: "" }));
              }}
            />
          </View>
        </View>

        {/* ------------------- Celular ------------------ */}
        <View>
          <View>
            <Text style={styles.subTitle}>Celular</Text>
          </View>
          <View
            style={
              !errores.celular && !errores.celularError
                ? styles.containerInputText
                : styles.alertError
            }
          >
            <TextInput
              value={dataPerson.celular}
              style={styles.input}
              placeholder="Celular"
              placeholderTextColor="gray"
              errorMessage="Error"
              defaultValue={dataPerson.celular}
              onChangeText={(text) => {
                setDataPerson({ ...dataPerson, celular: text });
                setErrores((errores) => ({
                  ...errores,
                  celular: "",
                  celularError: "",
                }));
              }}
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
    marginBottom: 20,
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
    fontWeight: "bold",
  },
  containerInputText: {
    marginTop: 3,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    alignContent: "center",
    //backgroundColor: "honeydew",
  },
  alertError: {
    marginTop: 3,
    borderColor: "red",
    borderWidth: 1,
    borderRadius: 15,
    alignItems: "center",
    alignContent: "center",
    //backgroundColor: "honeydew",
  },
  input: {
    height: 30,
    width: 185,
    borderWidth: 1,
    borderRadius: 15,
    padding: 2,
    paddingLeft: 10,
    color: "cornsilk",
  },
});

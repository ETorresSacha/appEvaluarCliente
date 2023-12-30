import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Header from "../header/Header";
const nameData = ["negocio", "Moneda", "Dirección", "Celular"];

const InfNegocio = () => {
  const [data, setData] = useState({
    negocio: "",
    moneda: "",
    direccion: "",
    celular: "",
  });
  console.log(data);
  const handleDataKeep = () => {};
  return (
    <ScrollView style={styles.container}>
      <Header title={"Configuración del negocio"} back={"Home"} />
      <View style={styles.containerLogo}>
        <TextInput
          // value={dataPerson.nombre}
          style={styles.logo}
          placeholder="foto"
          placeholderTextColor="gray"
          // onChange={(event) => {
          //   handleChangeData(event, "nombre");
          // }}
          errorMessage="Error"
          //defaultValue={dataPerson.nombre}
          // onChangeText={(text) => {
          //   setDataPerson({ ...dataPerson, nombre: text });
          //   setErrores((errores) => ({ ...errores, nombre: "" }));
          // }}
        />
      </View>
      <View>
        <View style={styles.containerText}>
          <Text style={styles.titleText}>Nombre del negocio</Text>
          <TextInput
            value={data.negocio}
            style={styles.text}
            placeholder={"Nombre del negocio"}
            placeholderTextColor="gray"
            onChangeText={(text) => {
              setData({ ...data, negocio: text });
            }}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.titleText}>Moneda</Text>
          <TextInput
            value={data.moneda}
            style={styles.text}
            placeholder={"Moneda"}
            placeholderTextColor="gray"
            onChangeText={(text) => {
              setData({ ...data, moneda: text });
            }}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.titleText}>Dirección</Text>
          <TextInput
            value={data.direccion}
            style={styles.text}
            placeholder={"Dirección"}
            placeholderTextColor="gray"
            onChangeText={(text) => {
              setData({ ...data, direccion: text });
            }}
          />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.titleText}>Celular</Text>
          <TextInput
            value={data.celular}
            style={styles.text}
            placeholder={"Celular"}
            placeholderTextColor="gray"
            onChangeText={(text) => {
              setData({ ...data, celular: text });
            }}
          />
        </View>
      </View>
      <Pressable style={styles.buttonContainer} onPress={handleDataKeep}>
        <Text style={styles.textGuardar}>Guardar</Text>
      </Pressable>
    </ScrollView>
  );
};

export default InfNegocio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
  containerLogo: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  logo: {
    height: 185,
    width: 185,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "white",
    padding: 2,
    paddingLeft: 10,
    color: "cornsilk",
  },
  containerText: {
    marginTop: 20,
    gap: 5,
  },
  titleText: {
    paddingLeft: 20,
    fontSize: 20,
    color: "cornsilk",
  },
  text: {
    height: 40,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "white",
    padding: 2,
    marginVertical: 5,
    marginHorizontal: 25,
    paddingLeft: 10,
    fontSize: 18,
    color: "cornsilk",
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
    width: 250,
    height: 40,
    marginLeft: 80,
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#4ecb71",
  },
  textGuardar: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

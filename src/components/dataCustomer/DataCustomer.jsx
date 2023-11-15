import React from "react";
import { Button, Icon, Input } from "@rneui/themed";
import { View, Text, StyleSheet, Alert, TextInput } from "react-native";

const data = [
  { title: "Nombre" },
  { title: "Apellido" },
  { title: "DNI" },
  { title: "Correo" },
  { title: "Dirección" },
  { title: "Celular" },
];

const DataCustomer = ({ dataCuatomer, setDataCustomer }) => {
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
            <TextInput style={styles.input} placeholder="Nombre" />
          </View>
        </View>

        {/* ------------------- Apellido ------------------ */}
        <View>
          <View>
            <Text style={styles.title}>Apellido</Text>
          </View>
          <View>
            <TextInput style={styles.input} placeholder="Apellido" />
          </View>
        </View>

        {/* ------------------- DNI ------------------ */}
        <View>
          <View>
            <Text style={styles.title}>DNI</Text>
          </View>
          <View>
            <TextInput style={styles.input} placeholder="DNI" />
          </View>
        </View>

        {/* ------------------- Correo ------------------ */}
        <View>
          <View>
            <Text style={styles.title}>Correo</Text>
          </View>
          <View>
            <TextInput style={styles.input} placeholder="Correo" />
          </View>
        </View>

        {/* ------------------- Dirección ------------------ */}
        <View>
          <View>
            <Text style={styles.title}>Dirección</Text>
          </View>
          <View>
            <TextInput style={styles.input} placeholder="Dirección" />
          </View>
        </View>

        {/* ------------------- Celular ------------------ */}
        <View>
          <View>
            <Text style={styles.title}>Celular</Text>
          </View>
          <View>
            <TextInput style={styles.input} placeholder="Celular" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default DataCustomer;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
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

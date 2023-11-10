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

const DataCustomer = () => {
  return (
    <View>
      <Text>DATOS</Text>
      <View style={styles.containerInput}>
        {data?.map((element, index) => {
          return (
            <View key={index}>
              <View>
                <Text style={styles.title}>{element.title}</Text>
              </View>
              <View>
                <TextInput style={styles.input} placeholder={element.title} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default DataCustomer;

const styles = StyleSheet.create({
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

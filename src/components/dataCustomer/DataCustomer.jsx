import React from "react";
import { Button, Icon, Input } from "@rneui/themed";
import { View, Text, StyleSheet, Alert, TextInput } from "react-native";

const DataCustomer = () => {
  return (
    <View>
      <Text>DATOS</Text>
      <View>
        <View>
          <Text>Nombre</Text>
        </View>
        <View>
          <TextInput style={styles.input} placeholder="Nombre" />
        </View>
      </View>
    </View>
  );
};

export default DataCustomer;

const styles = StyleSheet.create({
  input: {
    height: 30,
    width: 150,
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 5,
    padding: 2,
  },
});

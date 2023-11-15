import React from "react";
import { Button, Icon, Input } from "@rneui/themed";
import { View, Text, StyleSheet, Alert, TextInput } from "react-native";

const DataCustomer = ({ dataPerson, setDataPerson }) => {
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
              onChangeText={(text) =>
                setDataPerson({ ...dataPerson, nombre: text })
              }
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
              onChangeText={(text) =>
                setDataPerson({ ...dataPerson, dni: text })
              }
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
              onChangeText={(text) =>
                setDataPerson({ ...dataPerson, correo: text })
              }
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
              onChangeText={(text) =>
                setDataPerson({ ...dataPerson, celular: text })
              }
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

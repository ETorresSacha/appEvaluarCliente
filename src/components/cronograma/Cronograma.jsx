import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import UseStorage from "../hooks/UseHookStorage";
import { useFocusEffect } from "@react-navigation/native";

const Cronograma = ({ dataPrestamo }) => {
  console.log(dataPrestamo);
  return (
    <View style={styles.container}>
      <View>
        <Text>CRONOGRAMA</Text>
      </View>

      <ScrollView style={styles.containerCuotas}>
        <View style={styles.containerTitle}>
          <View style={styles.title}>
            <Text style={{ fontWeight: "bold" }}>CUOTA</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>FECHA</Text>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>MONTO CUOTA</Text>
          </View>
        </View>
        {dataPrestamo?.map((element, index) => {
          return (
            <View
              key={index}
              style={index % 2 == 0 ? styles.dataPar : styles.dataImpar}
            >
              <Text style={styles.dataText}>
                {element.cuota.toString().padStart(2, "0")}
              </Text>
              <Text style={styles.dataText}>{element.fechaPago}</Text>
              <Text style={styles.dataText}>{element.montoCuota}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Cronograma;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  containerTitle: {
    fontSize: 16,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 4,
    justifyContent: "space-evenly",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
  },
  title: {
    fontSize: 16,
    width: 60,
    paddingRight: 10,
    alignItems: "center",
    fontWeight: "bold",
  },
  containerCuotas: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  dataPar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(189, 238, 247, 0.888)",
    padding: 5,
  },
  dataImpar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(123, 220, 231)",
    padding: 5,
  },
  dataText: {
    fontSize: 15,
    paddingHorizontal: 5,
    marginHorizontal: 2,
  },
});

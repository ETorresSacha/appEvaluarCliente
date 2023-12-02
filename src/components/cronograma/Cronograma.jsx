import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import UseStorage from "../hooks/UseHookStorage";
import { useFocusEffect } from "@react-navigation/native";

const Cronograma = ({ dataPrestamo }) => {
  //console.log(dataPrestamo);
  return (
    <View style={styles.container}>
      <View style={styles.resumen}>
        <Text style={styles.resumTitle}>RESUMEN</Text>
        <View style={styles.resumDetalle}></View>
      </View>
      <View style={styles.cronograma}>
        {/* <Text style={styles.titleCrono}>Cronograma</Text> */}

        <ScrollView style={styles.containerCuotas}>
          <View style={styles.containerTitle}>
            <View style={styles.title}>
              <Text style={styles.tilteText}>CUOTA</Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.tilteText}>FECHA</Text>
            </View>
            <View style={styles.title}>
              <Text style={styles.tilteText}>MONTO CUOTA</Text>
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
    display: "flex",
    flexDirection: "row",
    paddingVertical: 8,
    justifyContent: "space-evenly",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    paddingRight: 10,
    alignItems: "center",
    fontWeight: "bold",
  },
  tilteText: {
    color: "cornsilk",
    paddingLeft: 10,
    fontSize: 17,
    fontWeight: "bold",
  },
  containerCuotas: {
    //display: "flex",
    //flex: 1,
    flexDirection: "column",
    //borderColor: "white",

    //margin: 10,
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
  resumen: {},
  resumTitle: {
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    paddingLeft: 10,
    paddingVertical: 10,
    fontSize: 17,
    color: "cornsilk",
    fontWeight: "bold",
  },
  resumDetalle: {
    height: 120,
    backgroundColor: "gray",
  },

  titleCrono: {
    color: "white",
    fontSize: 17,
  },
});

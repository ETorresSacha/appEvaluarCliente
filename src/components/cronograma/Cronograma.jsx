import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";
import UseStorage from "../hooks/UseHookStorage";
import { useFocusEffect } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const Cronograma = ({ dataPrestamo }) => {
  //console.log(dataPrestamo);
  return (
    <View style={styles.container}>
      <View style={styles.resumen}>
        <Text style={styles.resumTitle}>RESUMEN</Text>
        <View style={styles.resumDetalle}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              paddingBottom: 15,
            }}
          >
            <View style={[styles.containerSubTitle, { gap: 15 }]}>
              <Text
                style={{ color: "cornsilk", fontSize: 18, fontWeight: "bold" }}
              >
                Fecha de pago:
              </Text>
              <Text
                style={{ color: "orange", fontSize: 17, fontWeight: "bold" }}
              >
                12-20-2023
              </Text>
            </View>
            <View style={[styles.containerSubTitle, { gap: 15 }]}>
              <Text
                style={{ color: "cornsilk", fontSize: 18, fontWeight: "bold" }}
              >
                Cuota:
              </Text>
              <Text
                style={{ color: "orange", fontSize: 17, fontWeight: "bold" }}
              >
                517.5
              </Text>
            </View>
          </View>
          <View style={{ paddingHorizontal: 15, gap: 2 }}>
            <View
              style={[
                styles.containerSubTitle,
                { justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.subTitle}>Fecha de desembolso</Text>
              <Text style={{ color: "white", fontSize: 17 }}>12-20-2023</Text>
            </View>
            <View
              style={[
                styles.containerSubTitle,
                { justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.subTitle}>Pago pendiente</Text>
              <Text style={{ color: "white", fontSize: 17 }}>517.5</Text>
            </View>
            <View
              style={[
                styles.containerSubTitle,
                { justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.subTitle}>Cuota pendiente</Text>
              <Text style={{ color: "white", fontSize: 17 }}>2</Text>
            </View>
          </View>
        </View>
        <Pressable style={styles.buttonContainer}>
          <FontAwesome
            name="money"
            style={{ color: "cornsilk", fontSize: 40 }}
          />
          <Text style={styles.subTitle}>Pagar</Text>
        </Pressable>
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
    fontSize: 17,
    fontWeight: "bold",
    paddingLeft: 10,
  },
  containerCuotas: {
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
    marginVertical: 15,
  },

  subTitle: {
    //width: 180,
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
  containerSubTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    //marginTop: 15,
    alignItems: "center",
    alignContent: "center",
    width: 250,
    height: 40,
    marginLeft: 80,
    justifyContent: "center",
    borderRadius: 10,
    gap: 10,
    elevation: 5,
    borderWidth: 1,
    //borderColor: "white",
    marginBottom: 15,
    backgroundColor: "orange",
  },
});

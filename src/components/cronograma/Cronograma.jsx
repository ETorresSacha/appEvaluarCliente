import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";
import { formatDate } from "../../utils/thunks/Thunks";

const Cronograma = ({ data }) => {
  const [updatePrestamo, setUpdatePrestamo] = useState([]); // ResultPrestamo

  useEffect(() => {
    setUpdatePrestamo(data[0]?.resultPrestamo);
  }, [data]);

  return (
    <View style={styles.containerContainer}>
      {updatePrestamo == undefined ? (
        <Text>cargando</Text>
      ) : (
        <View style={styles.container}>
          <View>
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
              {updatePrestamo?.map((element, index) => {
                return (
                  <View
                    key={index}
                    style={index % 2 == 0 ? styles.dataPar : styles.dataImpar}
                  >
                    <Text style={styles.dataText}>
                      {element.cuota.toString().padStart(2, "0")}
                    </Text>
                    <Text style={styles.dataText}>
                      {formatDate(element.fechaPago)}
                    </Text>
                    <Text style={styles.dataText}>{element.montoCuota}</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default Cronograma;

const styles = StyleSheet.create({
  containerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
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
});
//! EN ESTA PARTE FALTA, CUANDO SE CANCELA TODA LA DEUDA SE TIENE QUE MODIFICAR
//! EL VALOR DE CANCELLED A TRUE, PAR FILTAR LOS DATOS MAS FACIL

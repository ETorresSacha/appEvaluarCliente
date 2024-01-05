import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text, Pressable } from "react-native";
import { formatDate } from "../../utils/thunks/Thunks";
import Checkbox from "expo-checkbox";

const Cronograma = ({ data }) => {
  const [updatePrestamo, setUpdatePrestamo] = useState([]); // ResultPrestamo
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setUpdatePrestamo(data);
  }, [data]);

  return (
    <View style={styles.containerContainer}>
      {updatePrestamo == undefined ? (
        <Text>cargando</Text>
      ) : (
        <View>
          <ScrollView style={styles.containerCuotas}>
            <View style={styles.containerTitle}>
              <View style={styles.title}>
                <Text style={styles.tilteText}> N° CUOTA</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.tilteText}>FECHA</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.tilteText}> MON. CUOTA</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.tilteText}>PAGOS</Text>
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
                  <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={setChecked}
                  />
                </View>
              );
            })}
          </ScrollView>
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
  },
  title: {
    // paddingRight: 10,
    // alignItems: "center",
    fontWeight: "bold",
  },
  tilteText: {
    color: "cornsilk",
    fontSize: 15,
    fontWeight: "bold",
    //paddingLeft: 10,
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
    // paddingHorizontal: 40,
    paddingVertical: 10,
  },
  dataImpar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(123, 220, 231)",
    paddingVertical: 10,
  },
  dataText: {
    fontSize: 17,
    //paddingHorizontal: 5,
    // marginHorizontal: 2,
  },
  checkbox: {
    padding: 5,
    marginLeft: 15,
  },
});
//! EN ESTA PARTE FALTA, CUANDO SE CANCELA TODA LA DEUDA SE TIENE QUE MODIFICAR
//! EL VALOR DE CANCELLED A TRUE, PAR FILTAR LOS DATOS MAS FACIL

import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Prestamo from "../../components/prestamo/Prestamo";

const Credit = () => {
  const [dataPrestamo, setDataPrestamo] = useState({
    capital: "",
    tiempo: "",
    tea: "",
    fechaDesembolso: "",
    fechaPrimeraCuota: "",
    periodo: "",
  });

  console.log(dataPrestamo);

  return (
    <View style={styles.container}>
      <Prestamo dataPrestamo={dataPrestamo} setDataPrestamo={setDataPrestamo} />
    </View>
  );
};

export default Credit;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

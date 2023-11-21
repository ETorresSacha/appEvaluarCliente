import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Prestamo from "../../components/prestamo/Prestamo";
import Cuota from "../../components/cuota/Cuota";

const Credit = () => {
  const [resultCuota, setResultCuota] = useState([]);
  const [enabled, setEnabled] = useState(false);
  const [dataPrestamo, setDataPrestamo] = useState({
    capital: "",
    nCuotas: "",
    tea: "",
    fechaDesembolso: "",
    fechaPrimeraCuota: "",
    periodo: "",
  });

  //console.log(dataPrestamo);
  // console.log(dataPrestamo);
  return (
    <View style={styles.container}>
      <Prestamo
        dataPrestamo={dataPrestamo}
        setDataPrestamo={setDataPrestamo}
        setResultCuota={setResultCuota}
        setEnabled={setEnabled}
      />
      {enabled ? <Cuota resultCuota={resultCuota} /> : ""}
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

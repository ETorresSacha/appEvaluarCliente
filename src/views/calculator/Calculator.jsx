import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Prestamo from "../../components/prestamo/Prestamo";
import Cuota from "../../components/cuota/Cuota";
import DetailCalculator from "../../components/detailCalculator/DetailCalculator";

const Calculator = () => {
  const [resultCuota, setResultCuota] = useState();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    console.log(resultCuota);
  }, [resultCuota]);
  return (
    <View style={styles.container}>
      <Prestamo setResultCuota={setResultCuota} setEnabled={setEnabled} />
      {enabled ? <DetailCalculator resultCuota={resultCuota} /> : ""}
    </View>
  );
};

export default Calculator;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Prestamo from "../../components/prestamo/Prestamo";
import Cuota from "../../components/cuota/Cuota";

const Credit = ({ setValuePrest }) => {
  const [resultCuota, setResultCuota] = useState();
  const [enabled, setEnabled] = useState(false);

  // useEffect(() => {
  //   setCuota !== undefined ? setCuota(resultCuota) : null;
  //   // let resultVal = Object.values(errorsPrestamo);
  //   // if (setValuePrest !== undefined) {
  //   //   if (resultVal.some((error) => error === "")) {
  //   //     setValuePrest(true);
  //   //   } else {
  //   //     setValuePrest(false);
  //   //   }
  //   // } else {
  //   //   null;
  //   // }
  // }, [resultCuota]);
  //console.log(resultCuota);

  return (
    <View style={styles.container}>
      <Prestamo
        setResultCuota={setResultCuota}
        setEnabled={setEnabled}
        setValuePrest={setValuePrest}
      />
      {enabled ? <Cuota resultCuota={resultCuota} /> : ""}
    </View>
  );
};

export default Credit;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

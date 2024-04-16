import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Customer from "../customer/Customer";

const CanceledCustomer = () => {
  const [enable, setEnable] = useState(true); //  Habilita el componente de los clientes cancelados

  return (
    <View style={styles.container}>
      <Customer enable={enable} />
    </View>
  );
};

export default CanceledCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
});

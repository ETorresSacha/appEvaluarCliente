import React from "react";
import Cronograma from "../../components/cronograma/Cronograma";
import { StyleSheet, View } from "react-native";
import Header from "../../components/header/Header";

const VerCronograma = (props) => {
  const user = props.route.params.data;
  const id = props.route.params.id;
  const enable = props.route.params.enable;

  return (
    <View style={styles.container}>
      <Header
        title={"Cronograma"}
        back={id ? "Detalle" : "Nuevo cliente"}
        id={id}
        enable={enable}
      />
      <Cronograma data={user} />
    </View>
  );
};

export default VerCronograma;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
});

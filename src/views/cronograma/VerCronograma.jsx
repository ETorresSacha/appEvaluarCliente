import React from "react";
import Cronograma from "../../components/cronograma/Cronograma";
import { StyleSheet, View } from "react-native";
import Header from "../../components/header/Header";

const VerCronograma = (props) => {
  const user = props.route.params.data;
  const id = props.route.params.id;

  return (
    <View style={styles.container}>
      <Header title={"Cronograma"} back={"Detalle"} id={id} />
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

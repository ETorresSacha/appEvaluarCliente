import React from "react";
import Cronograma from "../../components/cronograma/Cronograma";
import { StyleSheet, View } from "react-native";
import Header from "../../components/header/Header";

const VerCronograma = (props) => {
  const user = props.route.params?.user;
  const id = props.route.params?.id;
  const enable = props.route.params?.enable;
  const editValue = props.route.params?.editValue;
  const typeColor = props.route.params?.typeColor;
  const dataConfiguration = props.route.params?.dataConfiguration;

  const ccv = props.route.params?.ccv;
  console.log("props: ", props.route.params);
  // user: valueProps?.user,
  // id: valueProps?.id,
  // enable: valueProps?.enable,
  // editValue: valueProps?.editValue,
  // typeColor: valueProps?.typeColor,

  return (
    <View style={styles.container}>
      <Header
        title={"Cronograma"}
        back={ccv ? "Nuevo cliente" : editValue ? "Nuevo cliente" : "Detalle"}
        //back={!id ? "Nuevo cliente" : "Detalle"}
        id={id}
        enable={enable}
        data={props.route.params}
      />
      {/* <Cronograma data={user} /> */}
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

import React from "react";
import { View, StyleSheet, Alert, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Cuota = ({
  cuota,
  changeValue,
  dataPerson,
  dataConfiguration,
  editValue,
  valueProps,
  user,
}) => {
  const navigation = useNavigation();
  const cuota2 = dataPerson.resultPrestamo[0]?.montoCuota;
  console.log("user: ", user);
  const handleRouteCronograma = () => {
    navigation.navigate(
      "Cronograma",
      valueProps
      // data: {
      //   dataConfiguration: !valueProps?.id
      //     ? valueProps?.dataConfiguration
      //     : {
      //         user: valueProps?.user,
      //         id: valueProps?.id,
      //         enable: valueProps?.enable,
      //         editValue: valueProps?.editValue,
      //         typeColor: valueProps?.typeColor,
      //         dataConfiguration: valueProps?.dataConfiguration,
      //       },
      // },

      // user: valueProps?.user,
      // id: valueProps?.id,
      // enable: valueProps?.enable,
      // editValue: valueProps?.editValue,
      // typeColor: valueProps?.typeColor,
      // dataConfiguration: valueProps?.dataConfiguration,
      //valueProps
    );

    // dataPerson: dataPerson.resultPrestamo,
    // dataConfiguration: dataConfiguration,
    // editValue: editValue,
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable style={styles.button}>
          <Text style={styles.text}>{changeValue ? cuota : cuota2}</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          style={styles.buttonCronograma}
          onPress={handleRouteCronograma}
        >
          <Text style={styles.textCronograma}>Cronograma</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Cuota;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 20,
  },

  button: {
    alignItems: "center",
    width: 120,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "orange",
  },
  buttonCronograma: {
    alignItems: "center",
    width: 150,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "orange",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },

  textCronograma: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});

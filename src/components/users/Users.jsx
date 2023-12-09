import { View, StyleSheet, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { fechaPagoAtomatico } from "../../utils/thunks/Thunks";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { format } from "date-fns";

const Users = ({ data, red, setRed, green, setGreen }) => {
  const navigation = useNavigation();
  const [day, setDay] = useState("");

  useEffect(() => {
    setDay(format(new Date(), "MM-dd-yyyy"));
    // let result = alertDatePay(data.dataResult, day);
    // result?.map((element) => {
    //   idCustomerPay.push(element.uuid);
    //   //setIdCustomerPay([...idCustomerPay, element.uuid]);
    // });
  }, [day, data]);
  return (
    <View>
      {data?.map((element, index) => {
        // useEffect(() => {
        //   let result = idCustomerPay.find((ele) => ele == element.uuid);
        //   if (result !== undefined) alertaIcon = true;
        //   else alertaIcon = false;
        // }, []);

        return (
          <View
            key={element.uuid}
            style={index % 2 == 0 ? styles.dataPar : styles.dataImpar}
          >
            <Pressable
              style={{ display: "flex", flexDirection: "row" }}
              onPress={() =>
                navigation.navigate("Detalle", {
                  id: element.uuid,
                })
              }
            >
              <Text style={styles.dataText}>{element.dni}</Text>
              <Text
                style={{
                  width: 80,
                  fontSize: 17,
                  color: "cornsilk",
                }}
              >{`${element.nombre.split(" ")[0]}`}</Text>
              <Text style={styles.dataText}>
                {fechaPagoAtomatico(element?.resultPrestamo)}
              </Text>
              <Text
                style={{
                  fontSize: 17,
                  color: "cornsilk",
                  width: 80,
                  paddingLeft: 10,
                }}
              >
                {element?.resultPrestamo[0]?.montoCuota}
              </Text>
            </Pressable>
            <Pressable
              style={{
                width: 40,
                color: "white",
                fontSize: 30,
              }}
            >
              <MaterialIcons
                name="notifications"
                style={red ? styles.iconAlertOn : styles.iconAlertOff}
              />
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
  containerTitle: {
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
  },
  titleText: {
    width: 320,
    display: "flex",
    flexDirection: "row",
    height: 50,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    textAlign: "center",
  },
  titleAlert: {
    justifyContent: "center",
  },
  texTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 14,
    color: "white",
  },
  containerCuotas: {
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginHorizontal: 7,
  },
  dataPar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    paddingVertical: 7,
    backgroundColor: "rgb(31, 36, 36)",
  },
  dataImpar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    alignItems: "center",
    paddingVertical: 7,
    tintColor: "blue",
    backgroundColor: "rgba(55, 59, 59, 0.757)",
  },
  dataText: {
    fontSize: 17,
    width: 90,
    justifyContent: "flex-start",
    color: "cornsilk",
  },
  iconAlertOff: {
    //color: "cornsilk",
    color: "#4ecb71",
    fontSize: 30,
  },
  iconAlertOn: {
    color: "red",
    fontSize: 30,
  },
});

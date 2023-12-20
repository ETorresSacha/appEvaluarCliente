import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import UseStorage from "../../components/hooks/UseHookStorage";
import NavBar from "../../components/navBar/NavBar";
import { customerData, orderData } from "../../utils/thunks/Thunks";
import { format, add } from "date-fns";

import Users from "../../components/users/Users";

const Customer = () => {
  const { onGetCronograma } = UseStorage();
  const [order, setOrder] = useState(false);
  const [day, setDay] = useState("");
  const [data, setData] = useState({
    dataResult: [],
    dataResultCopy: [],
  });
  const [customer, SetCustomer] = useState({
    customerGreen: [],
    customerYellow: [],
    customerRed: [],
    customer: [],
    customerCancelled: [],
  });

  // Trae los datos guardados del local storage
  const loadCustomer = async () => {
    try {
      const resultCustomer = await onGetCronograma();

      setData({
        ...data,
        dataResult: resultCustomer,
        dataResultCopy: resultCustomer,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCustomer();
      //return () => unsubscribe();
    }, [])
  );

  // Ordenar
  const handleSort = (type, value) => {
    const result = orderData(type, data.dataResult, value);
    setData({ ...data, dataResult: result });
    setOrder(!value);
  };

  // Verifica en que condición se encuentra cada cliente

  const resultCustomer = () => {
    setDay(format(new Date(), "MM-dd-yyyy"));
    let result = customerData(data.dataResult, day);

    if (result.resultCustomer) {
      SetCustomer({
        ...customer,
        customerGreen: result.resultCustumerGreen,
        customerYellow: result.resultCustomerYellow,
        customerRed: result.resultCustomerRed,
        customer: result.resultCustomer,
        customerCancelled: result.resultCustomerCancelled,
      });
    }
  };
  // console.log("green: ", customer.customerGreen[0].resultPrestamo);
  // console.log("yellow: ", customer.customerYellow[0].resultPrestamo);
  // console.log("red: ", customer.customerRed);
  // console.log("ok: ", customer.customer);
  // console.log("cancelled: ", customer.customerCancelled);
  useEffect(() => {
    resultCustomer();
  }, [data]);

  return (
    <View style={styles.container}>
      <NavBar data={data} setData={setData} />
      <ScrollView style={styles.containerCuotas}>
        <View style={styles.containerTitle}>
          <View style={styles.titleText}>
            <Pressable
              style={styles.title}
              onPress={() => handleSort("dni", order)}
            >
              <Text style={styles.texTitle}>DNI</Text>
            </Pressable>
            <Pressable
              style={styles.title}
              onPress={() => handleSort("nombre", order)}
            >
              <Text style={styles.texTitle}>NOMBRE</Text>
            </Pressable>
            <Pressable
              style={styles.title}
              onPress={() => handleSort("fecha", order)}
            >
              <Text style={styles.texTitle}>FECHA DE PAGO</Text>
            </Pressable>
            <Pressable
              style={styles.title}
              onPress={() => handleSort("cuota", order)}
            >
              <Text style={styles.texTitle}>CUOTA</Text>
            </Pressable>
          </View>

          <View
            style={styles.titleAlert}
            //onPress={() => handleSort("cuota", order)}
          >
            <Text style={styles.texTitle}>ALERTA</Text>
          </View>
        </View>

        <Users data={customer.customerRed} color={"red"} />
        <Users data={customer.customerYellow} color={"yellow"} />
        <Users data={customer.customerGreen} color={"rgb(66, 242, 46)"} />
        <Users data={customer.customer} />
      </ScrollView>
    </View>
  );
};

export default Customer;
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
    color: "cornsilk",
    fontSize: 30,
  },
  iconAlertOn: {
    color: "red",
    fontSize: 30,
  },
});

//! falta  LA ALERTA DE PAGO
//! puede dar la posibilidad de que se resuma el codigo uniendo es SetCustomer y setData

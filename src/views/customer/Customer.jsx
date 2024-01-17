import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import UseStorage from "../../components/hooks/UseHookStorage";
import NavBar from "../../components/navBar/NavBar";
import { customerData, date, orderData } from "../../utils/thunks/Thunks";
import { format, add } from "date-fns";

import Users from "../../components/users/Users";
import Header from "../../components/header/Header";

const img =
  "https://i.pinimg.com/originals/fe/6f/35/fe6f35a1ceedf8421c5fd776390bee12.jpg";

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
    dataResult: [],
  });

  // Trae los datos del local storage
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

  // Ordenar
  const handleSort = (type, value) => {
    let result = orderData(type, customer.dataResult, value);
    setData({ ...data, dataResult: result });
    setOrder(!value);
  };

  // clasificación de los clientes de acuerdo a la fecha de pago

  const resultCustomer = () => {
    setDay(format(new Date(), "yyyy-MM-dd"));
    let result = customerData(data.dataResult, day);

    if (result.resultCustomer) {
      SetCustomer({
        ...customer,
        customerGreen: result.resultCustumerGreen,
        customerYellow: result.resultCustomerYellow,
        customerRed: result.resultCustomerRed,
        customer: result.resultCustomer,
        customerCancelled: result.resultCustomerCancelled,
        dataResult: result.resultDataResult,
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCustomer();
      //return () => unsubscribe();
    }, [])
  );
  useEffect(() => {
    resultCustomer();
  }, [data]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={[StyleSheet.absoluteFill]}></Image>
      <Header title={"Clientes"} />
      <NavBar data={data} setData={setData} />
      <ScrollView style={styles.containerCuotas}>
        <View style={styles.containerTitle}>
          <View style={styles.titleText}>
            <TouchableOpacity
              style={styles.title}
              onPress={() => handleSort("dni", order)}
            >
              <Text style={styles.texTitle}>DNI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.title}
              onPress={() => handleSort("nombre", order)}
            >
              <Text style={styles.texTitle}>NOMBRE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.title}
              onPress={() => handleSort("fecha", order)}
            >
              <Text style={styles.texTitle}>FECHA DE PAGO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.title}
              onPress={() => handleSort("cuota", order)}
            >
              <Text style={styles.texTitle}>CUOTA</Text>
            </TouchableOpacity>
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
        {/* <Users data={data.dataResult} /> */}
      </ScrollView>
    </View>
  );
};
//
export default Customer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
  containerTitle: {
    borderTopStartRadius: 13,
    borderTopEndRadius: 13,
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
    borderColor: "rgb(198, 198, 198)",
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
// CUANDO ENTRA A ESTE COMPONENTE LA FECHA SALE ERROR, TENEMOS QUE CORREGIR ESO

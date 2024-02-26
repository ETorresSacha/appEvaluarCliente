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
import Loading from "../../components/loading/Loading";

const img =
  "https://i.pinimg.com/originals/fe/6f/35/fe6f35a1ceedf8421c5fd776390bee12.jpg";

const Customer = ({ enable }) => {
  const { onGetCronograma } = UseStorage();
  const [order, setOrder] = useState(false);
  const [day, setDay] = useState("");
  const [on, setOn] = useState(false);
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

  // Traer los datos del local storage
  const loadCustomer = async () => {
    try {
      const resultCustomer = await onGetCronograma();
      console.log("length: " + resultCustomer.length);

      setData({
        ...data,
        dataResult: resultCustomer, // == undefined ? data.dataResult : resultCustomer,
        dataResultCopy: resultCustomer, //== undefined ? data.dataResult : resultCustomer,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Ordenar
  const handleSort = (type, value) => {
    // dataFilter toma los valores dependiendo de que componente es llamado la función, "clientes" o "clientes cancelados"
    let dataFilter = !enable
      ? customer?.dataResult
      : customer?.customerCancelled;

    let result = orderData(type, dataFilter, value, enable);
    setData({ ...data, dataResult: result });
    setOrder(!value);
  };

  // clasificación de los clientes de acuerdo a la fecha de pago

  const resultCustomer = () => {
    setDay(format(new Date(), "yyyy-MM-dd"));
    let result = customerData(data.dataResult, day);

    if (result?.resultCustomer) {
      SetCustomer({
        ...customer,
        customerGreen: result.resultCustumerGreen,
        customerYellow: result.resultCustomerYellow,
        customerRed: result.resultCustomerRed,
        customer: result.resultCustomer,
        customerCancelled: result?.resultCustomerCancelled,
        dataResult: result.resultDataResult,
      });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCustomer();
      setTimeout(setOn, 1000, true);

      //return () => unsubscribe();
    }, [])
  );
  useEffect(() => {
    resultCustomer();
  }, [data]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={[StyleSheet.absoluteFill]}></Image>
      <Header title={!enable ? "Clientes" : "Clientes cancelados"} />
      <NavBar data={data} setData={setData} enable={enable} />
      {on == false ? (
        <Loading />
      ) : (
        <ScrollView style={styles.containerCuotas}>
          <View style={styles.containerTitle}>
            <View
              style={
                !enable
                  ? [styles.titleText, { gap: 20 }]
                  : [styles.titleText, { justifyContent: "space-around" }]
              }
            >
              <TouchableOpacity
                style={
                  !enable
                    ? [styles.title, { marginLeft: 26 }]
                    : [styles.title, { width: 90 }]
                }
                onPress={() => handleSort("dni", order, enable)}
              >
                <Text style={styles.texTitle}>DNI</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  !enable
                    ? [styles.title, { width: 60, marginLeft: 18 }]
                    : [styles.title, { width: 60 }]
                }
                onPress={() => handleSort("nombre", order)}
              >
                <Text style={styles.texTitle}>NOMBRE</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  !enable
                    ? [styles.title, { width: 60, marginLeft: 25 }]
                    : [styles.title, { width: 100 }]
                }
                onPress={() => handleSort("fecha", order)}
              >
                <Text style={styles.texTitle}>
                  {!enable ? "FECHA DE PAGO" : "FECHA DESEMBOLSO"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.title]}
                onPress={() => handleSort("cuota", order)}
              >
                <Text style={styles.texTitle}>
                  {!enable ? "CUOTA" : "MONTO"}
                </Text>
              </TouchableOpacity>

              {!enable ? (
                <View
                  style={[styles.title, { marginRight: 50 }]}
                  //onPress={() => handleSort("cuota", order)}
                >
                  <Text style={styles.texTitle}>ALERTA</Text>
                </View>
              ) : null}
            </View>
          </View>
          {/* Renderza los datos */}
          {
            // Cuando no existe ningun cliente guardado
            data.dataResult == undefined ||
            (enable
              ? customer.customerCancelled.length == 0
              : customer.customer.length == 0) ? (
              <View style={styles.containerNoCustomers}>
                <Text style={{ color: "cornsilk" }}>
                  {enable
                    ? "No hay clientes cancelados"
                    : "No hay clientes guardados"}
                </Text>
              </View>
            ) : !enable ? (
              //  clienteS guardadoS
              <View>
                <Users data={customer.customerRed} color={"red"} />
                <Users data={customer.customerYellow} color={"yellow"} />
                <Users
                  data={customer.customerGreen}
                  color={"rgb(66, 242, 46)"}
                />
                <Users data={customer.customer} />
              </View>
            ) : (
              <Users data={customer?.customerCancelled} enable={enable} />
            )
          }
        </ScrollView>
      )}
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
    display: "flex",
    flex: 1,
    flexDirection: "row",
    height: 50,
  },
  title: {
    fontSize: 16,
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
  containerNoCustomers: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 200,
  },
});

//! puede dar la posibilidad de que se resuma el codigo uniendo es SetCustomer y setData

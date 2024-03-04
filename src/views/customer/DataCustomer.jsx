import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Users from "../../components/users/Users";
import UseStorage from "../../components/hooks/UseHookStorage";
import { format, add } from "date-fns";
import { customerData, orderData } from "../../utils/thunks/Thunks";

const DataCustomer = ({ data, setData, customer, enable }) => {
  //   const { onGetCronograma } = UseStorage();
  const [order, setOrder] = useState(false);
  //   const [day, setDay] = useState("");
  //   const [on, setOn] = useState(false);
  //   //   const [data, setData] = useState({
  //   //     dataResult: [],
  //   //     dataResultCopy: [],
  //   //   });
  //   const [customer, SetCustomer] = useState({
  //     customerGreen: [],
  //     customerYellow: [],
  //     customerRed: [],
  //     customer: [],
  //     customerCancelled: [],
  //     dataResult: [],
  //   });

  //   //   // Traer los datos del local storage
  //   //   const loadCustomer = async () => {
  //   //     try {
  //   //       const resultCustomer = await onGetCronograma();
  //   //       //console.log("length: " + resultCustomer.length);

  //   //       setData({
  //   //         ...data,
  //   //         dataResult: resultCustomer, // == undefined ? data.dataResult : resultCustomer,
  //   //         dataResultCopy: resultCustomer, //== undefined ? data.dataResult : resultCustomer,
  //   //       });
  //   //     } catch (error) {
  //   //       console.error(error);
  //   //     }
  //   //   };

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

  //   // clasificación de los clientes de acuerdo a la fecha de pago

  //   const resultCustomer = () => {
  //     setDay(format(new Date(), "yyyy-MM-dd"));
  //     let result = customerData(data.dataResult, day);

  //     if (result?.resultCustomer) {
  //       SetCustomer({
  //         ...customer,
  //         customerGreen: result.resultCustumerGreen,
  //         customerYellow: result.resultCustomerYellow,
  //         customerRed: result.resultCustomerRed,
  //         customer: result.resultCustomer,
  //         customerCancelled: result?.resultCustomerCancelled,
  //         dataResult: result.resultDataResult,
  //       });
  //     }
  //   };

  //   //   useFocusEffect(
  //   //     React.useCallback(() => {
  //   //       loadCustomer();
  //   //       setTimeout(setOn, 1000, true);

  //   //       //return () => unsubscribe();
  //   //     }, [])
  //   //   );
  //   useEffect(() => {
  //     resultCustomer();
  //   }, [data]);
  return (
    <View style={styles.container}>
      <View
        style={
          !enable
            ? [styles.containerTitle]
            : [styles.containerTitle, { justifyContent: "space-around" }]
        }
      >
        <TouchableOpacity
          style={!enable ? [styles.title, {}] : [styles.title, {}]}
          onPress={() => handleSort("dni", order, enable)}
        >
          <Text style={styles.texTitle}>DNI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={!enable ? [styles.title, {}] : [styles.title, {}]}
          onPress={() => handleSort("nombre", order)}
        >
          <Text style={styles.texTitle}>NOMBRE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={!enable ? [styles.title, {}] : [styles.title, {}]}
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
          <Text style={[styles.texTitle, { width: enable ? 100 : null }]}>
            {!enable ? "CUOTA" : "MONTO PRESTAMO"}
          </Text>
        </TouchableOpacity>

        {!enable ? (
          <View
            style={[styles.title, {}]}
            //onPress={() => handleSort("cuota", order)}
          >
            <Text style={styles.texTitle}>ALERTA</Text>
          </View>
        ) : null}
      </View>
      <ScrollView style={styles.containerCuotas}>
        {/* Renderza los datos */}
        {
          // Cuando no existe ningun cliente guardado
          data.dataResult == undefined ||
          (enable
            ? customer.customerCancelled.length == 0
            : customer.dataResult.length == 0) ? (
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
              <Users data={customer.customerGreen} color={"rgb(66, 242, 46)"} />
              <Users data={customer.customer} />
            </View>
          ) : (
            <Users data={customer?.customerCancelled} enable={enable} />
          )
        }
      </ScrollView>
      <View style={[styles.piePagina]}>
        <Text style={styles.piePaginaText}>
          {!enable ? "Total de clientes: " : "Total de clientes cancelados: "}
          {!enable
            ? customer.dataResult.length
            : customer.customerCancelled.length}
        </Text>
      </View>
    </View>
  );
};

export default DataCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(36, 146, 224, 0.625)",
    marginHorizontal: 5,
    marginTop: 15,
    marginBottom: 5,
  },
  containerTitle: {
    borderTopStartRadius: 13,
    borderTopEndRadius: 13,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    //flex: 1,
    height: 50,
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
    backgroundColor: "red",
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
    borderColor: "rgb(198, 198, 198)",
    display: "flex",
    flex: 1,
    flexDirection: "column",
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
  piePagina: {
    display: "flex",
    borderBottomStartRadius: 13,
    borderBottomEndRadius: 13,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    //flex: 1,
    height: 30,
  },
  piePaginaText: {
    fontSize: 13,
    color: "white",
  },
});

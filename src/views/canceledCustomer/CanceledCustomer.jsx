import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import NavBar from "../../components/navBar/NavBar";
import UseStorage from "../../components/hooks/UseHookStorage";
import { customerData } from "../../utils/thunks/Thunks";
import { format } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";
import Users from "../../components/users/Users";
import UseStorageBusiness from "../../components/hooks/UseHookDataNeg";
import Customer from "../customer/Customer";

const img =
  "https://i.pinimg.com/originals/fe/6f/35/fe6f35a1ceedf8421c5fd776390bee12.jpg";
const CanceledCustomer = () => {
  const [enable, setEnable] = useState(true);
  const { onGetCronograma } = UseStorage();
  const [customer, SetCustomer] = useState([]);
  const [day, setDay] = useState("");
  const [data, setData] = useState({
    dataResult: [],
    dataResultCopy: [],
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

  // cargar los clientes que cancelaron su deuda
  const resultCanceledCustomer = () => {
    setDay(format(new Date(), "yyyy-MM-dd"));
    let result = customerData(data.dataResult, day);

    SetCustomer(result?.resultCustomerCancelled);
  };
  useFocusEffect(
    React.useCallback(() => {
      loadCustomer();
      //return () => unsubscribe();
    }, [])
  );
  useEffect(() => {
    resultCanceledCustomer();
  }, [data]);

  //! CORREGIR LOS FILTROS DEL COMPONENTE CLIENTES CANCELADOS
  return (
    <View style={styles.container}>
      <Customer enable={enable} />

      {/* <Image source={{ uri: img }} style={[StyleSheet.absoluteFill]}></Image> */}
      {/* <Header title={"Clientes Cancelados"} /> */}
      {/* <ScrollView style={styles.containerCuotas}>
        <View style={styles.containerTitle}>
          <View style={styles.titleText}>
            <TouchableOpacity
              style={styles.title}
              //onPress={() => handleSort("dni", order)}
            >
              <Text style={styles.texTitle}>DNI</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.title}
              //onPress={() => handleSort("nombre", order)}
            >
              <Text style={styles.texTitle}>NOMBRE</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.title}
              //onPress={() => handleSort("fecha", order)}
            >
              <Text style={styles.texTitle}>FECHA DESEMBOLSO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.title}
              //onPress={() => handleSort("cuota", order)}
            >
              <Text style={styles.texTitle}>MONTO</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Users data={customer} />
        
      </ScrollView> */}
    </View>
  );
};

export default CanceledCustomer;

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
    justifyContent: "space-around",
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
    //width: 60,
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

//! FALTA DETERMINAR DE DONDE TRAES LOS CLIENTES QUE YA PAGARON

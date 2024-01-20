import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import Header from "../../components/header/Header";
import NavBar from "../../components/navBar/NavBar";
import UseStorage from "../../components/hooks/UseHookStorage";
import { customerData } from "../../utils/thunks/Thunks";
import { format } from "date-fns";
import { useFocusEffect } from "@react-navigation/native";

const img =
  "https://i.pinimg.com/originals/fe/6f/35/fe6f35a1ceedf8421c5fd776390bee12.jpg";
const CanceledCustomer = () => {
  const [customer, SetCustomer] = useState([]);
  const [day, setDay] = useState("");
  const { onGetCronograma } = UseStorage();
  const [data, setData] = useState({
    dataResult: [],
    dataResultCopy: [],
  });
  // Trae los datos del local storage
  const loadCustomer = async () => {
    try {
      const resultCustomer = await onGetCronograma();
      console.log(resultCustomer);
      //   setData({
      //     ...data,
      //     dataResult: resultCustomer,
      //     dataResultCopy: resultCustomer,
      //   });
    } catch (error) {
      console.error(error);
    }
  };
  //loadCustomer();

  // cargar los clientes que cancelaron su deuda
  const resultCanceledCustomer = () => {
    setDay(format(new Date(), "yyyy-MM-dd"));
    let result = customerData(data.dataResult, day);

    SetCustomer(result?.resultCustomerCancelled);
  };
  useFocusEffect(
    React.useCallback(() => {
      resultCanceledCustomer();
      //return () => unsubscribe();
    }, [])
  );
  console.log(customer);
  return (
    <View style={styles.container}>
      <Image source={{ uri: img }} style={[StyleSheet.absoluteFill]}></Image>
      <Header title={"Clientes Cancelados"} />
    </View>
  );
};

export default CanceledCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
});

//! FALTA DETERMINAR DE DONDE TRAES LOS CLIENTES QUE YA PAGARON

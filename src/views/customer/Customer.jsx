import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import UseStorage from "../../components/hooks/UseHookStorage";
import NavBar from "../../components/navBar/NavBar";
import { customerData } from "../../utils/thunks/Thunks";
import { format } from "date-fns";
import Header from "../../components/header/Header";
import Loading from "../../components/loading/Loading";
import DataCustomer from "./DataCustomer";

const Customer = ({ enable }) => {
  const { onGetCronograma } = UseStorage();
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

      setData({
        ...data,
        dataResult: resultCustomer, // == undefined ? data.dataResult : resultCustomer,
        dataResultCopy: resultCustomer, //== undefined ? data.dataResult : resultCustomer,
      });
    } catch (error) {
      console.error(error);
    }
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
      setTimeout(setOn, 1, true); //! Esta observado, parece que no afecta en nada si se elimina

      //return () => unsubscribe();
    }, [])
  );
  useEffect(() => {
    resultCustomer();
  }, [data]);

  return (
    <View style={styles.container}>
      <Header title={!enable ? "Clientes" : "Clientes cancelados"} />
      <NavBar data={data} setData={setData} enable={enable} />
      {on == false ? (
        <Loading />
      ) : (
        <DataCustomer
          data={data}
          setData={setData}
          customer={customer}
          enable={enable}
        />
      )}
    </View>
  );
};
//
export default Customer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

//! puede dar la posibilidad de que se resuma el codigo uniendo es SetCustomer y setData

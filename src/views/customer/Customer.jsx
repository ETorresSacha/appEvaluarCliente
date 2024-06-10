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
import UseStorageConfiguration from "../../components/hooks/UseHookConfiguration";
import Alerta from "../alert/Alerta";
import { renderImportData } from "./renderImportData";

const Customer = ({ enable }) => {
  const { onGetCronograma } = UseStorage();
  const { onGetConfiguration } = UseStorageConfiguration();
  const [dataConfiguration, setDataConfiguration] = useState({}); // Datos de la configuración
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
  const [valueImport, setValueImport] = useState(false); // Necesario para importar la data

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
  // Cargar los datos de la configuración
  const loadCongiguration = async () => {
    try {
      let result = await onGetConfiguration();

      setDataConfiguration({
        ...dataConfiguration,
        tpm: !result ? "0.08" : result[0]?.tpm,
        ccv: !result ? "2" : result[0]?.ccv,
        intMoratorio: !result ? "20" : result[0]?.intMoratorio,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Renderiza
  useFocusEffect(
    React.useCallback(() => {
      loadCustomer();
      setTimeout(setOn, 1, true);
      loadCongiguration();

      //return () => unsubscribe();
    }, [])
  );
  useEffect(() => {
    resultCustomer();
  }, [data]);

  // Función para importar data
  useFocusEffect(
    React.useCallback(() => {
      renderImportData(valueImport, setValueImport, data, setData);
    }, [valueImport])
  );

  return (
    <View style={styles.container}>
      <Header
        title={!enable ? "Clientes" : "Clientes cancelados"}
        setValueImport={setValueImport}
      />
      <NavBar
        data={data}
        setData={setData}
        enable={enable}
        dataConfiguration={dataConfiguration}
      />

      {/* Notificaciones de los clientes por cobrar */}
      {customer.customerYellow?.length != 0 ||
      customer.customerRed?.length != 0 ? (
        <Alerta
          dataRed={customer.customerRed}
          dataYellow={customer.customerYellow}
        />
      ) : null}

      {on == false ? (
        <Loading />
      ) : (
        <DataCustomer
          data={data}
          setData={setData}
          customer={customer}
          enable={enable}
          dataConfiguration={dataConfiguration}
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

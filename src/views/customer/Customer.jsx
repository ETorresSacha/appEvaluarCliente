import React, { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
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
import { editImportData } from "./editImportData";
import { importExcel } from "../../modals/modalOptionsCustomer/importExcel";
import UseStorageBusiness from "../../components/hooks/UseHookDataNeg";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MY_DATA_KEY = "@data_customerr"; //! tenemos que poner esta variable en ignorar
// este array solo es prueba, se eliminará
const dataExcel = [
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "Los Angeles" },
  { name: "Peter", age: 40, city: "Chicago" },
  { name: "Erik", age: 32, city: "Perú" },
];

const Customer = ({ enable }) => {
  const { onGetCronograma, onSaveCronograma } = UseStorage();
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

  //! PRUEBA PARA IMPORT DATA, ESTA PARA CAMBIAR
  const [dataImport, setDataImport] = useState([]); //TODO--> Sirve para importar la data y los guarda en esta constante
  const [valueImport, setValueImport] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (valueImport) {
        if (data.dataResult == undefined) {
          importExcel(setDataImport);
          //onSaveCronograma(dataImport);
        } else {
          Alert.alert(
            "¡ALERTA!",
            "Existen datos guardados. Si continúa, se borrarán los datos actuales.",
            [
              {
                text: "Si",
                //! CUANDO EXISTEN DATOS EN LA APLICACION, Y SE QUIERE IMPORTAR DATOS,
                //!DEBE DAR UN AVISO QUE SE BORRARAN TODOS, CUANDO SE EJECUTA PRIMERO DEBE DE ELIMINAR
                //! TODOS LOS DATOS Y DESPUES SETEAR EL ESTADO PARA FINALMENTE GUARDAR TODOS LOS DATOS EN EL STORAGE
                onPress: async () => {
                  await AsyncStorage.clear();
                  importExcel(setDataImport);
                  //!NOTA: tengo que crear una nuevo hook que ayude a guardar todos loas datos en el storage
                  //onSaveCronograma(dataImport);
                },
                style: "destructive",
              },
              {
                text: "No",
                style: "destructive",
              },
            ]
          );
        }
        setValueImport(false);
      }

      //return async () => await onSaveCronograma(dataImport);
    }, [valueImport, data])
  );
  //!

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

  return (
    <View style={styles.container}>
      <Header
        title={!enable ? "Clientes" : "Clientes cancelados"}
        dataExcelExport={!enable ? data?.dataResult : null}
        setDataImport={!enable ? setDataImport : null}
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

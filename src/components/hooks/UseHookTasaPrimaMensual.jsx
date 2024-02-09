import AsyncStorage from "@react-native-async-storage/async-storage";

const TASA_PRIMA_KEY = "@data_tasaPrima";

const UseStorageTPM = () => {
  // GUARDAR INFORMACION
  const saveInfoStorage = async (storageKey, meal) => {
    try {
      //await AsyncStorage.clear(TASA_PRIMA_KEY);

      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  //TODO--> CRONOGRAMA DE PAGO

  //! POST
  const handleSaveTPM = async ({ tasaPrimaMedia }) => {
    try {
      const result = await saveInfoStorage(TASA_PRIMA_KEY, { tasaPrimaMedia });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  //! GET
  const handleGetTPM = async () => {
    try {
      let result = await AsyncStorage.getItem(TASA_PRIMA_KEY);
      if (result != null) {
        const parseCronograma = JSON.parse(result);

        return Promise.resolve(parseCronograma);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
  //   //! DELETE
  //   const handleDeleteBusiness = async (celular) => {
  //     try {
  //       const resultGet = await handleGetCronograma();

  //       const filterItem = resultGet?.filter((element) => {
  //         return element.celular !== celular;
  //       });
  //       await AsyncStorage.setItem(TASA_PRIMA_KEY, JSON.stringify(filterItem));

  //       return Promise.resolve();
  //     } catch (error) {
  //       return console.error(error);
  //     }
  //   };

  //   //! UPDATE//

  //   const handleUpdateBusiness = async (data) => {
  //     // try {
  //     //   const resultGet = await handleGetCronograma();
  //     //   let indice;
  //     //   resultGet?.find((element, index) => {
  //     //     if (
  //     //       element.uuid == (data?.uuid == undefined ? data[0].uuid : data?.uuid)
  //     //     ) {
  //     //       indice = index;
  //     //     }
  //     //   });
  //     //   let newObjeto = data?.uuid == undefined ? data[0] : data;
  //     //   resultGet.splice(indice, 1, newObjeto);
  //     //   await AsyncStorage.setItem(MY_DATA_KEY, JSON.stringify(resultGet));
  //     //   return Promise.resolve();
  //     //   // return resultGet;
  //     // } catch (error) {
  //     //   return console.error(error);
  //     // }
  //     //! esta para verificar
  //   };
  return {
    onSaveDataTPM: handleSaveTPM,
    onGetTPM: handleGetTPM,
    // onDeleteBusiness: handleDeleteBusiness,
    // onUpdateBusiness: handleUpdateBusiness,
  };
};
export default UseStorageTPM;

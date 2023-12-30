import AsyncStorage from "@react-native-async-storage/async-storage";

const MY_BUSINESS_KEY = "@data_business";

const UseStorageBusiness = () => {
  // GUARDAR INFORMACION
  const saveInfoStorage = async (storageKey, meal) => {
    try {
      const currentSave = await AsyncStorage.getItem(storageKey); // Trae los datos guardados

      // Si hay datos guardados
      if (currentSave !== null) {
        const currentSaveParsed = JSON.parse(currentSave);
        currentSaveParsed.push(meal);

        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSaveParsed)
        );

        return Promise.resolve();
      }

      // Editar
      // Editar el status

      // Si la lista esta vacia
      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  //TODO--> CRONOGRAMA DE PAGO

  //! POST
  const handleSaveBusiness = async ({
    nombre,
    direccion,
    celular,
    notification,
  }) => {
    try {
      const result = await saveInfoStorage(MY_BUSINESS_KEY, {
        nombre,
        direccion,
        celular,
        notification,
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  //! GET
  const handleGetBusiness = async () => {
    try {
      let result = await AsyncStorage.getItem(MY_BUSINESS_KEY);
      if (result !== null) {
        const parseCronograma = JSON.parse(result);

        return Promise.resolve(parseCronograma);
      }

      //! QUE PASA SI SE HACE UN PEDIDO GET Y NO SALE NADA, VERIFICAR ESO
    } catch (error) {
      return Promise.reject(error);
    }
  };
  //! DELETE
  const handleDeleteBusiness = async (celular) => {
    try {
      const resultGet = await handleGetCronograma();

      const filterItem = resultGet?.filter((element) => {
        return element.celular !== celular;
      });
      await AsyncStorage.setItem(MY_BUSINESS_KEY, JSON.stringify(filterItem));

      return Promise.resolve();
    } catch (error) {
      return console.error(error);
    }
  };

  //! UPDATE//

  const handleUpdateBusiness = async (data) => {
    // try {
    //   const resultGet = await handleGetCronograma();
    //   let indice;
    //   resultGet?.find((element, index) => {
    //     if (
    //       element.uuid == (data?.uuid == undefined ? data[0].uuid : data?.uuid)
    //     ) {
    //       indice = index;
    //     }
    //   });
    //   let newObjeto = data?.uuid == undefined ? data[0] : data;
    //   resultGet.splice(indice, 1, newObjeto);
    //   await AsyncStorage.setItem(MY_DATA_KEY, JSON.stringify(resultGet));
    //   return Promise.resolve();
    //   // return resultGet;
    // } catch (error) {
    //   return console.error(error);
    // }
    //! esta para verificar
  };
  return {
    onSaveDataBusiness: handleSaveBusiness,
    onGetBusiness: handleGetBusiness,
    onDeleteBusiness: handleDeleteBusiness,
    onUpdateBusiness: handleUpdateBusiness,
  };
};
export default UseStorageBusiness;

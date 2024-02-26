import AsyncStorage from "@react-native-async-storage/async-storage";

const MY_DATA_KEY = "@data_customerr";

const UseStorage = () => {
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
  const handleSaveCronograma = async (dataPerson) => {
    //console.log(dataPerson);
    //console.log("length: " + dataPerson[0].length);
    let indice;
    try {
      // Edit

      // let resultGet = await handleGetCronograma();
      // //console.log(resultGet.length);

      // let resultRESULT = resultGet?.find((element, index) => {
      //   if (element.uuid == dataPerson?.uuid) {
      //     indice = index;
      //   }
      // });
      // console.log("RESIL: " + resultRESULT.length); //! AUI SALE ERROR, ESTAMOS EN EDITAR, COMPARAR CUANDO SE HACE UN GET, SI NO SE RESUELVE DE AQUI REALIZARLO DESDE EL MISMO COMPONENTE
      // resultGet.splice(indice, 1, dataPerson);
      // await AsyncStorage.setItem(MY_DATA_KEY, JSON.stringify(resultGet));

      const result = await saveInfoStorage(MY_DATA_KEY, dataPerson);
      //console.log("index: " + index);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  //! GET
  const handleGetCronograma = async () => {
    //await AsyncStorage.clear(MY_DATA_KEY);
    try {
      let result = await AsyncStorage.getItem(MY_DATA_KEY);
      //console.log(result.length);
      //console.log(result);

      if (result !== null) {
        const parseCronograma = JSON.parse(result);

        return Promise.resolve(parseCronograma);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  //! DELETE
  const handleDeleteCustomer = async (uuid) => {
    try {
      const resultGet = await handleGetCronograma();

      const filterItem = resultGet?.filter((element) => {
        return element.uuid !== uuid;
      });
      await AsyncStorage.setItem(MY_DATA_KEY, JSON.stringify(filterItem));

      return Promise.resolve();
    } catch (error) {
      return console.error(error);
    }
  };

  //! UPDATE
  // UPDATE STATUS DEL PRESTAMO
  const handleUpdateStatusPay = async (data) => {
    //console.log(data);
    try {
      const resultGet = await handleGetCronograma();
      let indice;
      resultGet?.find((element, index) => {
        if (
          element.uuid == (data?.uuid == undefined ? data[0].uuid : data?.uuid)
        ) {
          indice = index;
        }
      });
      let newObjeto = data?.uuid == undefined ? data[0] : data;
      resultGet.splice(indice, 1, newObjeto);
      await AsyncStorage.setItem(MY_DATA_KEY, JSON.stringify(resultGet));

      return Promise.resolve();
    } catch (error) {
      return console.error(error);
    }
  };

  return {
    onSaveCronograma: handleSaveCronograma,
    onGetCronograma: handleGetCronograma,
    onDeleteCustomer: handleDeleteCustomer,
    onUpdateStatusPay: handleUpdateStatusPay,
  };
};

export default UseStorage;

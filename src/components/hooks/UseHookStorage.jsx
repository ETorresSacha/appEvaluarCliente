import AsyncStorage from "@react-native-async-storage/async-storage";
import { orderData } from "../../utils/thunks/Thunks";

const MY_CRONOGRAMA_KEY = "@data";
const MY_DATA_KEY = "@data_customerr";
const MY_KEY_DATA = "@data";

const UseStorage = () => {
  // GUARDAR INFORMACION
  const saveInfoStorage = async (storageKey, meal, indice) => {
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
  const handleSaveCronograma = async ({
    uuid,
    nombre,
    apellido,
    dni,
    correo,
    direccion,
    celular,
    resultPrestamo,
  }) => {
    try {
      const result = await saveInfoStorage(MY_DATA_KEY, {
        uuid,
        nombre,
        apellido,
        dni,
        correo,
        direccion,
        celular,
        resultPrestamo,
      });

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  //! GET
  const handleGetCronograma = async () => {
    try {
      let result = await AsyncStorage.getItem(MY_DATA_KEY);
      //console.log(result);
      // resultData = result.sort(
      //   (a, b) =>
      //     new Date(b.resultPrestamo[0]?.fechaPago).getTime() -
      //     new Date(a.resultPrestamo[0]?.fechaPago).getTime()
      // );
      //resultData = orderData("fecha", result, true);
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
  const handleUpdateStatusPay = async (data) => {
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

import AsyncStorage from "@react-native-async-storage/async-storage";

const MY_CRONOGRAMA_KEY = "@data";
const MY_DATA_KEY = "@data_customer";

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
    //console.log(data);
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
      const result = await AsyncStorage.getItem(MY_DATA_KEY);
      if (result !== null) {
        const parseCronograma = JSON.parse(result);

        return Promise.resolve(parseCronograma);
      }

      //! QUE PASA SI SE HACE UN PEDIDO GET Y NO SALE NADA, VERIFICAR ESO
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    onSaveCronograma: handleSaveCronograma,
    onGetCronograma: handleGetCronograma,
  };
};

export default UseStorage;

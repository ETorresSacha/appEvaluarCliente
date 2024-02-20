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

  //TODO--> TASA PRIMA MENSUAL

  //! POST
  const handleSaveTPM = async (tasaPrimaMedia) => {
    try {
      await saveInfoStorage(TASA_PRIMA_KEY, tasaPrimaMedia);

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

  return {
    onSaveDataTPM: handleSaveTPM,
    onGetTPM: handleGetTPM,
  };
};
export default UseStorageTPM;

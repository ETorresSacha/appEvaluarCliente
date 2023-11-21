import React, { useCallback, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import UseStorage from "../hooks/UseHookStorage";
import { useFocusEffect } from "@react-navigation/native";

const Cronograma = () => {
  const [dataCronograma, setDataCronograma] = useState("");
  const { onGetCronograma } = UseStorage();

  const addDaraCronograma = useCallback(async () => {
    try {
      const result = await onGetCronograma();
      setDataCronograma(result);
    } catch (error) {
      setDataCronograma([]);
      console.error(error);
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      addDaraCronograma().catch(null);
    }, [addDaraCronograma])
  );

  console.log(dataCronograma[0]);
  return (
    <ScrollView>
      <Text>Cronograma</Text>
    </ScrollView>
  );
};

export default Cronograma;

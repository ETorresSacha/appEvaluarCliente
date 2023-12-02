import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import UseStorage from "../../components/hooks/UseHookStorage";

const Detail = (props) => {
  const id = props.route.params.id;
  const { onGetCronograma } = UseStorage();
  const [user, setUser] = useState({});

  const loadCustomerId = async (id) => {
    // Trae los datos guardados del local storage
    try {
      const resultCustomer = await onGetCronograma();
      const result = resultCustomer.filter((element) => element.uuid == id);
      setUser(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCustomerId(id);
  }, []);
  console.log(id);
  console.log(user);
  return (
    <View style={styles.container}>
      <Text>Detail</Text>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {},
});

import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const Detail = (props) => {
  const id = props.route.params.id;
  console.log(id);

  useEffect(() => {
    const loadCustomer = async () => {
      // Trae los datos guardados del local storage
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
  }, []);
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

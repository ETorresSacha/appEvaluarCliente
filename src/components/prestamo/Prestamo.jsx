import React, { useState } from "react";
import { Button, Icon, Input } from "@rneui/themed";
import { View, StyleSheet, ScrollView, Text, TextInput } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

const Prestamo = () => {
  const [selected, setSelected] = useState("");
  return (
    <View style={styles.container}>
      <Text>PRESTAMO</Text>
      {/* <View style={styles.item}>
        <View style={styles.item1}>
          <Text style={styles.title}>Capital: </Text>
          <Input style={styles.input} value="" />
        </View>
      <View>
          <Input style={styles.input} value="" />
        </View> 
      </View>  */}
      <Calendar
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
      />
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Capital: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input value="" />
        </View>
      </View>

      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Tiempo: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input value="" />
        </View>
      </View>

      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Interes: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input value="" />
        </View>
      </View>

      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Fecha de primera cuota: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input value="" />
        </View>
      </View>

      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Cuota: </Text>
        </View>
        <View style={styles.inputContainer}>
          <Input value="" />
        </View>
      </View>
    </View>
  );
};

export default Prestamo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  title: {
    flex: 1,
    fontSize: 16,
    paddingTop: 10,
  },
  content: {
    marginVertical: 16,
  },

  formItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 2,
    paddingRight: 40,
  },
  legend: {
    fontWeight: "500",
    paddingLeft: 40,
    fontSize: 16,
  },
  legendContainer: {
    flex: 1,
  },
});

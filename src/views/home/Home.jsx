import React from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import Header from "../../components/header/Header";

const Home = () => {
  return (
    <View style={styles.container}>
      <Header />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 16,
    paddingTop: 10,
  },
  content: {
    marginVertical: 16,
  },
});

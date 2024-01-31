import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { useState, CSSProperties } from "react";
//import ClipLoader from "react-spinners/ClipLoader";

const Loading = () => {
  //   let [loading, setLoading] = useState(true);
  //   let [color, setColor] = useState("#ffffff");
  const getContent = () => {
    return <ActivityIndicator size="large" color="#00ff00" />;
  };
  return (
    <View style={[styles.container, styles.horizontal]}>{getContent()}</View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

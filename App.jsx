import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import Routes from "./src/routes/Routes";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" && 30,
      }}
    >
      <Routes />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

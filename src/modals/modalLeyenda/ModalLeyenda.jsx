import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import PieChart from "./PieChart";

const data = [30, 40, 20, 10]; // Datos para el diagrama de pastel
const colors = ["#FF5733", "#C70039", "#900C3F", "#581845"]; // Colores para cada segmento

const ModalLeyenda = ({ isVisible, setIsVisible }) => {
  return (
    <Modal
      style={styles.container}
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <View>
          <Text>INFORMACION</Text>
        </View>
        {/* <Pie data={data} /> */}
        <View style={styles.leftContainer}>
          {/* <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <PieChart
              style={{ height: 200, width: 200 }}
              data={data}
              innerRadius={50}
              outerRadius={"80%"}
              padAngle={0.04}
            />
          </View> */}
          {/* <PieChart
            style={{ height: 200, width: 200 }}
            data={data}
            innerRadius={"50%"} // Radio del centro
          /> */}
          <PieChart data={data} colors={colors} size={300} />
        </View>

        <View style={styles.leyendaIcono}>
          <MaterialIcons name="notifications" style={{ color: "red" }} />
          <Text>Leyenda</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLeyenda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "beige",
    borderRadius: 2,
    position: "absolute",
    top: "45%",
    left: "10%",
    right: "10%",
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
  },
  leyendaIcono: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContainer: {
    flex: 1,
    //backgroundColor: "black",
  },
});

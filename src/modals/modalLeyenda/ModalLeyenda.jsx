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

//const data = [30, 40, 20, 10]; // Datos para el diagrama de pastel
// const colors = ["#FF5733", "#C70039", "#900C3F", "#581845"]; // Colores para cada segmento

const ModalLeyenda = ({ isVisible, setIsVisible, customer }) => {
  console.log(typeof customer?.customer?.length);
  console.log(customer?.customerGreen?.length);
  console.log(customer?.customerYellow?.length);
  console.log(customer?.customerRed?.length);

  const data = [
    customer?.customer ? customer?.customer?.length : 0,
    customer?.customerGreen ? customer?.customerGreen?.length : 0,
    customer?.customerYellow ? customer?.customerYellow?.length : 0,
    customer?.customerRed ? customer?.customerRed?.length : 0,
  ]; // Datos para el diagrama de pastel
  console.log(data);
  const colors = ["#FF0000", "#FFFF00", "#008000", "#FFF8DC"]; // Colores para cada segmento
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
          <Text
            style={{
              color: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            INFORMACION
          </Text>
        </View>
        <View style={styles.graficoContainer}>
          <PieChart data={data} colors={colors} size={200} />
          <View style={styles.containerLeyendaIcono}>
            {["Vencidos", "Hoy", "Mañana", "Al día"].map((element, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <MaterialIcons
                  name="notifications"
                  style={{ color: `${colors[index]}`, fontSize: 30 }}
                />
                <Text
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    color: "white",
                    width: 60,
                    paddingTop: 5,
                  }}
                >
                  {element}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLeyenda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "rgb(31, 36, 36)",
    //backgroundColor: "black",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "rgba(6, 18, 20, 0.836)",
    borderRadius: 2,
    borderColor: "white",
    position: "absolute",
    top: "30%",
    left: "10%",
    right: "10%",
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
  },
  containerLeyendaIcono: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    //justifyContent: "space-between",
    backgroundColor: "blue",
  },
  graficoContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    //backgroundColor: "black",
  },
});

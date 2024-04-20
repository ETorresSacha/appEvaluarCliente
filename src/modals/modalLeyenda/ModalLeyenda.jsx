import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Pie } from "react-chartjs-2";
import { getDataColors } from "./thunks";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

//import { PieChart } from "react-native-svg-charts";
//! aquis
const renderChart = () => {
  // new Chart("modelsChart", { type: "doughnut", data });
};
// const data = [
//   {
//     key: 1,
//     value: 30,
//     svg: { fill: "orange" },
//     arc: { outerRadius: "110%", padAngle: 0.02 },
//   },
//   {|
//     key: 2,
//     value: 70,
//     svg: { fill: "skyblue" },
//     arc: { outerRadius: "100%", padAngle: 0.02 },
//   },
// ];

// ChartJS.register(ArcElement, Tooltip, Legend);

// const data = {
//   labels: ["uno", "dos", "tres"],
//   datasets: [
//     {
//       data: [10, 20, 30],
//       // borderColor: getDataColors(),
//       // backgroundColor: getDataColors(20),
//     },
//   ],
// };

// const opciones = {
//   // plugins: {
//   //   Legend: { position: "left" },
//   // },
//   responsive: true,
// };

const ModalLeyenda = ({ isVisible, setIsVisible }) => {
  const data = {
    labels: ["uno", "dos", "tres"],
    datasets: [
      {
        data: [10, 20, 30],
        // borderColor: getDataColors(),
        // backgroundColor: getDataColors(20),
      },
    ],
  };
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
  },
});

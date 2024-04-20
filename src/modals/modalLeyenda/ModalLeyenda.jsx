import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import { Pie } from "react-chartjs-2";
import { getDataColors } from "./thunks";
//import Svg, { G, Path } from "react-native-svg";
import Svg, { Circle, G, Path, Text as SvgText } from "react-native-svg";
//import { PieChart } from "react-native-svg-charts";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Doughnut } from "react-chartjs-2";

//import { PieChart } from "react-native-svg-charts";
//! aquis

const data = [30, 40, 20, 10]; // Datos para el diagrama de pastel
const colors = ["#FF5733", "#C70039", "#900C3F", "#581845"]; // Colores para cada segmento

const PieChart = ({ data, colors, size = 200 }) => {
  const total = data.reduce((acc, value) => acc + value, 0);
  let startAngle = 0;

  return (
    <View>
      <Svg width={size} height={size}>
        {data.map((value, index) => {
          const percentage = (value / total) * 100;
          const endAngle = startAngle + (percentage * Math.PI * 2) / 100;
          const radius = size / 2;
          const x1 = radius + radius * Math.cos(startAngle);
          const y1 = radius + radius * Math.sin(startAngle);
          const x2 = radius + radius * Math.cos(endAngle);
          const y2 = radius + radius * Math.sin(endAngle);

          const largeArcFlag = percentage > 50 ? 1 : 0;
          const pathData = `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

          startAngle = endAngle;

          return (
            <G key={index}>
              <Path d={pathData} fill={colors[index % colors.length]} />
              <SvgText
                fill="white"
                fontSize="12"
                fontWeight="bold"
                x={
                  radius +
                  radius *
                    0.7 *
                    Math.cos(startAngle - (percentage * Math.PI) / 360)
                }
                y={
                  radius +
                  radius *
                    0.7 *
                    Math.sin(startAngle - (percentage * Math.PI) / 360)
                }
                textAnchor="middle"
              >
                {`${percentage.toFixed(1)}%`}
              </SvgText>
            </G>
          );
        })}
      </Svg>
    </View>
  );
};

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

  // const data = [
  //   {
  //     key: 1,
  //     value: 30, // Porcentaje
  //     svg: { fill: "orange" },
  //   },
  //   {
  //     key: 2,
  //     value: 50, // Porcentaje
  //     svg: { fill: "green" },
  //   },
  //   {
  //     key: 3,
  //     value: 20, // Porcentaje
  //     svg: { fill: "blue" },
  //   },
  // ];
  const total = data.reduce((acc, value) => acc + value, 0);
  let startAngle = 0;
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
  },
});

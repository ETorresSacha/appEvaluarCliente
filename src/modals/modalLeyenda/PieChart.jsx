import React from "react";
import { View } from "react-native";
import Svg, {
  G,
  Path,
  Circle,
  Rect,
  Text,
  Text as SvgText,
} from "react-native-svg";

const PieChart = ({ data, colors, size = 200, transparency = 1.0 }) => {
  const total = data.reduce((acc, value) => acc + value, 0);
  console.log("total: " + total);
  const radius = size / 2;
  let startAngle = 0;

  // Cantidad de datos diferentes de cero
  const numDatos = [];
  data.map((element) => {
    if (element != 0) numDatos.push(element);
  });

  // Cuando solo hay un dato
  const centerX = radius + 5; // X-coordinate del centro del círculo
  const centerY = radius + 5; // Y-coordinate del centro del círculo
  const resultColor = (element) => element != 0; // color del círculo
  const resultIndexColor = data.findIndex(resultColor);
  //
  return (
    <View style={{ backgroundColor: "grey" }}>
      {numDatos.length == 1 || numDatos.length == 0 ? (
        <Svg height={2 * radius + 10} width={2 * radius + 10}>
          {/* Círculo */}
          <Circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill={numDatos.length == 1 ? colors[resultIndexColor] : null}
            stroke={numDatos.length == 0 ? "white" : null}
          />

          {/* Etiqueta en el centro del círculo */}
          <Text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            fontSize="16"
            fill="black"
          >
            100 %
          </Text>
        </Svg>
      ) : (
        <Svg width={size} height={size}>
          {data.map((value, index) => {
            const percentage = (value / total) * 100;

            const endAngle = startAngle + (percentage * Math.PI * 2) / 100;
            const x1 = radius + radius * Math.cos(startAngle);
            const y1 = radius + radius * Math.sin(startAngle);
            const x2 = radius + radius * Math.cos(endAngle);
            const y2 = radius + radius * Math.sin(endAngle);

            const largeArcFlag = percentage > 50 ? 1 : 0;
            const pathData = `M${radius},${radius} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;

            startAngle = endAngle;

            // Aplicar transparencia al color
            const colorWithTransparency = `${
              colors[index % colors.length]
            }${Math.round(transparency * 255).toString(16)}`;

            return (
              <G key={index}>
                <Path d={pathData} fill={colorWithTransparency} />

                {/* Etiqueta de porcentaje */}
                {/* <SvgText
                fill="black"
                fontSize="12"
                fontWeight="bold"
                //alienItem="center"
                x={
                  radius +
                  radius *
                    0.6 *
                    Math.cos(startAngle - (percentage * Math.PI) / 360)
                }
                y={
                  radius +
                  radius *
                    0.6 *
                    Math.sin(startAngle - (percentage * Math.PI) / 360)
                }
                textAnchor="middle"
              >
                {`${percentage.toFixed(1)}%`}
              </SvgText> */}
              </G>
            );
          })}
        </Svg>
      )}
    </View>
  );
};

export default PieChart;

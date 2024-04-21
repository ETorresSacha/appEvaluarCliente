import React from "react";
import { View } from "react-native";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";

const PieChart = ({ data, colors, size = 200, transparency = 1.0 }) => {
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

          // Aplicar transparencia al color
          const colorWithTransparency = `${
            colors[index % colors.length]
          }${Math.round(transparency * 255).toString(16)}`;

          return (
            <G key={index}>
              <Path d={pathData} fill={colorWithTransparency} />

              {/* Etiqueta de porcentaje */}
              <SvgText
                fill="black"
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

      {/* Leyenda */}
      {/* <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}
      >
        {data.map((value, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <View
              style={{
                width: 10,
                height: 10,
                backgroundColor: colors[index % colors.length],
                marginRight: 5,
              }}
            />
            <SvgText>{`Segmento ${index + 1}`}</SvgText>
          </View>
        ))}
      </View> */}
    </View>
  );
};

export default PieChart;
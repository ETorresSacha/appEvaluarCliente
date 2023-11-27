import React from "react";
import Cronograma from "../../components/cronograma/Cronograma";
import { resutCronograma } from "../../utils/calculoCuota/CalculosCuota";

const VerCronograma = (props) => {
  console.log(props.route.params);
  return <Cronograma />;
};

export default VerCronograma;

import React from "react";
import Cronograma from "../../components/cronograma/Cronograma";
import { resutCronograma } from "../../utils/calculoCuota/CalculosCuota";

const VerCronograma = (props) => {
  const id = props.route.params.id;
  return <Cronograma id={id} />;
};

export default VerCronograma;

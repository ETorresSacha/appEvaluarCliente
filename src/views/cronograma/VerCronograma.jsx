import React from "react";
import Cronograma from "../../components/cronograma/Cronograma";

const VerCronograma = (props) => {
  const user = props.route.params.data;
  return <Cronograma data={user} />;
};

export default VerCronograma;

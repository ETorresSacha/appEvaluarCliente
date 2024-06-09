export const editImportData =(data)=>{
  console.log("importttt");
  // data.map((element) => {
  //   //console.log(typeof element.resultPrestamo);
  //   element.resultPrestamo = element?.resultPrestamo.replace(/\\/g, "");
  //   element.resultPrestamo = element?.resultPrestamo.slice(1, -1);
  //   return (element.resultPrestamo = element?.resultPrestamo.slice(1, -1));
  //   });
  
  data.map(
    (element) => (element.resultPrestamo = JSON.parse(element?.resultPrestamo))
    );
           return data
}
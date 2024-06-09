export const editImportData =(data)=>{
  try {
    data.map(
      (element) => (element.resultPrestamo = JSON.parse(element?.resultPrestamo))
    );
    return data
    
  } catch (error) {
    return error
  }
        // data.map((element) => {
        //     element.resultPrestamo = element?.resultPrestamo.replace(/\\/g, "");
        //     element.resultPrestamo = element?.resultPrestamo.slice(1, -1);
        //     return (element.resultPrestamo = element?.resultPrestamo.slice(1, -1));
        //   });
        
          
}
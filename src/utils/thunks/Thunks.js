export const orderData = (type,data,value)=>{
    let result
    switch (type) {
        case 'dni':
            if (value) {
               result = data.sort((a, b) => a.dni - b.dni);
            
              } else {
                result = data.sort((a, b) => b.dni - a.dni);
              }
          break;

          case 'nombre':
            if (value) {
                
               result = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
            
              } else {
                result = data.sort((a, b) => b.nombre.localeCompare(a.nombre));
              }
          break;
          case 'fecha':

            if (value) {
                result = data.sort((a, b) => new Date(a.resultPrestamo[0]?.fechaPago).getTime() - new Date(b.resultPrestamo[0]?.fechaPago).getTime());
             
               } else {
                 result = data.sort((a, b) => new Date(b.resultPrestamo[0]?.fechaPago).getTime() - new Date(a.resultPrestamo[0]?.fechaPago).getTime());
               }
          break;
          case 'cuota':
            if (value) {
                result = data.sort((a, b) => a.resultPrestamo[0].montoCuota - b.resultPrestamo[0].montoCuota);
             
               } else {
                 result = data.sort((a, b) => b.resultPrestamo[0].montoCuota - a.resultPrestamo[0].montoCuota);
               }
          break;
        
        default:
          result
            }
            return result
}
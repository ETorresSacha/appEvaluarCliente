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
        
        default:
          result
            }
            return result
}
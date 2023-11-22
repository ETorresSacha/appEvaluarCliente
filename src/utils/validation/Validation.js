//Todo--> Validación

//! Validación de los datos del cliente
export const validationDataPerson = (dataPerson) =>{
    const error = {}
    
    // Datos en blanco
    if(dataPerson.nombre.trim() === "" || dataPerson.apellido.trim() === "" || dataPerson.dni.trim() === "" || dataPerson.correo.trim() === ""  || dataPerson.direccion.trim() === "" || dataPerson.celular.trim() === "" ) {
         error.incompletos = "Datos incompletos"
    }

    // Datos solo número
    //Expresion Regular Solo Números
    var ExpRegSoloNumeros="^[0-9]+$";

    if(dataPerson.dni.match(ExpRegSoloNumeros) == null || dataPerson.celular.match(ExpRegSoloNumeros) == null){
         error.noEsNumero = "Formato incorrecto"
    }

    // Correo
    //Expresión Regular Email
    let ExpRegEmail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

    if(dataPerson.correo.match(ExpRegEmail) == null ){
         error.noEsCorreo = "Correo incorrecto"
    }
    return error
}

//! Validación de los datos del préstamo
export const validationDataPrestamo = (dataPrestamo) =>{
    const error = {}

     // Datos en blanco
     if(dataPrestamo.capital?.trim() === "" || dataPrestamo.nCuotas?.trim() === "" || dataPrestamo.tea?.trim() === "" || dataPrestamo.periodo?.trim() === "" ) {
          error.incompletos = "Datos incompletos"
     }
     else if(dataPrestamo.capital?.trim() !== "" || dataPrestamo.nCuotas?.trim() !== "" || dataPrestamo.tea?.trim() !== "" || dataPrestamo.periodo?.trim() !== "" ) {
          error = {}
     }

     // Datos solo número
    //Expresion Regular Solo Números
//     let ExpRegSoloNumeros="^[0-9]+$";

//     if(dataPrestamo.capital.match(ExpRegSoloNumeros) == null || dataPrestamo.nCuotas.match(ExpRegSoloNumeros) == null || dataPrestamo.tea.match(ExpRegSoloNumeros) == null){
//          error.noEsNumero = "Solo se aceptan números"
//     }

    return error

}


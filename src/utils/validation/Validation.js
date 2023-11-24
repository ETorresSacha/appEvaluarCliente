//Todo--> Validación

//! Validación de los datos del cliente
export const validationDataPerson = (dataPerson) =>{
    let error = {
     incompletos:"",
     noEsNumero:"",
     CanNumeroDni:"",
     CanNumeroCel:"",
     noEsCorreo:""

    }
    
    // Datos en blanco
    if(dataPerson.nombre.trim() === "" || dataPerson.apellido.trim() === "" || dataPerson.dni.trim() === "" || dataPerson.correo.trim() === ""  || dataPerson.direccion.trim() === "" || dataPerson.celular.trim() === "" ) {
         error = {...error,incompletos:"Datos incompletos"}
    }

    // Datos solo número
    //Expresion Regular Solo Números
    var ExpRegSoloNumeros="^[0-9]+$";

    if(dataPerson.dni.match(ExpRegSoloNumeros) == null || dataPerson.celular.match(ExpRegSoloNumeros) == null){

         error = {...error,noEsNumero : "Formato incorrecto"}
    }
    if(dataPerson.dni.trim().length !== 8){

     error = {...error,CanNumeroDni : "Solo debe tener 8 caracteres"}
     }
     if(dataPerson.celular.trim().length !== 9){

          error = {...error,CanNumeroCel : "Solo debe tener 9 caracteres"}
     }

    // Correo
    //Expresión Regular Email
    let ExpRegEmail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

    if(dataPerson.correo.match(ExpRegEmail) == null ){

         error = {...error, noEsCorreo:"No es correo"}
    }
    return error
}

//! Validación de los datos del préstamo
export const validationDataPrestamo = (dataPrestamo) =>{
    
    const error = {}

      if(dataPrestamo.capital?.trim() === "" || dataPrestamo.nCuotas?.trim() === "" || dataPrestamo.tea.trim() === "" || dataPrestamo.periodo.trim() === "" || dataPrestamo.fechaDesembolso.trim() === "" || dataPrestamo.fechaPrimeraCuota.trim() === "" ) {
          error.incompletos = "Datos incompletos"
      }

      else {error.incompletos = ""}

    return error

}


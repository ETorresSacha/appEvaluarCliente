//Todo--> Validación

//! Validación de los datos del cliente
export const validationDataPerson = (dataPerson) =>{
    const error = {}
    
    // Datos en blanco
    if(dataPerson.nombre.trim() === "" || dataPerson.apellido.trim() === "" || dataPerson.dni.trim() === "" || dataPerson.correo.trim() === ""  || dataPerson.direccion.trim() === "" || dataPerson.celular.trim() === "" ) {
         error.incompletos = "Datos incompletos"
    }

    // Datos solo texto

    // Datos solo número
    //Expresion Regular Solo Números
    var ExpRegSoloNumeros="^[0-9]+$";

    if(dataPerson.dni.match(ExpRegSoloNumeros) == null || dataPerson.celular.match(ExpRegSoloNumeros) == null){
         error.noEsNumero = "Formato incorrecto"
    }

    // Correo

    //Expresión Regular Email
    var ExpRegEmail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

    if(dataPerson.correo.match(ExpRegEmail) == null ){
         error.noEsCorreo = "Correo incorrecto"
    }
    return error





}

//! Validación de los datos del préstamo
const validationDataPrestamo = () =>{

}


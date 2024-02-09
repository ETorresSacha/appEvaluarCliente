//Todo--> Validación

//! Validación de los datos del cliente
export const validationDataPerson = (dataPerson) =>{
    let error = {
     nombre:"",
     apellidos:"",
     direccion:"",
     ndi:"",
     celular:"",
    correo:""

    }
    
    // Datos en blanco
    if(dataPerson.nombre.trim() === "" ) {
         error = {...error,nombre:"Nombre incompleto"}
    }
    if(dataPerson.apellido.trim() === ""  ) {
     error = {...error,apellidos:"Apellidos incompletos"}
     }
     if(  dataPerson.direccion.trim() === ""  ) {
     error = {...error,direccion:"Dirección incompleto"}
     }

    // Datos solo número
    //Expresion Regular Solo Números
//     var ExpRegSoloNumeros="^[0-9]+$";

//     if(dataPerson.dni.match(ExpRegSoloNumeros) == null || dataPerson.celular.match(ExpRegSoloNumeros) == null){

//          error = {...error,noEsNumero : "Formato incorrecto"}
//     }
    if(dataPerson.dni.trim().length !== 8){

     error = {...error,dni : "Solo se acepta 8 caracteres"}
     }
     if(dataPerson.celular.trim().length !== 9){

          error = {...error,celular : "Solo se acepta 9 caracteres"}
     }

    // Correo
    //Expresión Regular Email
    let ExpRegEmail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

    if(dataPerson.correo.match(ExpRegEmail) == null ){

         error = {...error, correo:"No es un correo"}
    }
    return error
}

//! Validación de los datos del préstamo
export const validationDataPrestamo = (dataPrestamo) =>{
    
    let error = {
     periodo:"",
     capital:"",
     tea:"",
     cuotas:"",
     fechaDesembolso:"",
     fechaPrimeraCuota:""
    }

      if(dataPrestamo.periodo.trim() === ""  ) {
          error = {...error,periodo:"Periodo incompleto"}
      }
      if(dataPrestamo.capital?.trim() === ""  ) {
          error = {...error,capital:"Capital incompleto"}
      }
      if(dataPrestamo.tea.trim() === "" ) {
          error = {...error,tea:"TEA incompleto"}
      }
      if(dataPrestamo.cuotas?.trim() === ""  ) {
          error = {...error,cuotas:"Cuota incompleto"}
      }
      if(dataPrestamo.fechaDesembolso.trim() === "" ) {
          error = {...error,fechaDesembolso:"Fecha de desembolso incompleto"}
      }
      if(dataPrestamo.fechaPrimeraCuota.trim() === "" ) {
          error = {...error,fechaPrimeraCuota:"Fecha de la primera cuota incompleto"}
      }


    return error

}

//! Validación de los datos del préstamo

export const validationInfNegocios = (data) =>{
    let error = {
     celular:""
    }
    // Datos en blanco
    if (data.celular) {      
        if (data.celular?.trim().length != 9){
            error = {...error,celular : "Solo se acepta 9 caracteres"}
        }  
    }
    return error
}

//Expresión Regular Número Decimal
// var ExpRegNumDec=/^\d*\.\d+$/;
 
// var NumDecValido="10.2225";//Cadena de Número Decimal
// var NumDecinvalido="10";//Cadena de Número Decimal
 
// //Evaluación de Cadena Valida de Número Decimal
// if(NumDecValido.match(ExpRegNumDec)!=null)
//     console.log("Número Decimal Válido");
 
// //Evaluación de Cadena Invalida de Número Decimal  
// if(NumDecinvalido.match(ExpRegNumDec)==null)
//     console.log("Número Decimal Invalido");

//! Validación de la tasa prima media
export const validationTPM = (data)=>{

    let ExpRegNumDec=/^\d*\.\d+$/;
    let error = {
        errorTPM:""
       }
       if( parseFloat(data) < 0 ){
        error={...error, errorTPM:"Dato inválido"}
       }
       if(data.match(ExpRegNumDec)==null){
        error={...error, errorTPM:"Dato inválido"}
       }
    
    // if (data<0 ){
    //     error={...errorTPM, errorTPM:"Dato inválido"}
    // }
    
    return error
}


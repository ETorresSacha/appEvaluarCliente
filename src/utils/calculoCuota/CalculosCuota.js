// import { FRC, IntCuo, TED, TEM } from "./Formulas"

import {  diasAcum, diasXmes, sumarMes } from "./CalculoDiasXMes";

// export const Calculos = (data)=>{

//     // Cálculo de TEM
//     const resultTEM = TEM(data.tea)

//     // Cálculo de TED
//     const resultTED = TED(resultTEM)

//     // Cálculo de los dias acumulados
//     let fechaInicio = new Date(data.fechaDesembolso).getTime();
//     let fechaFin    = new Date(data.fechaPrimeraCuota).getTime();
//     let diff = fechaFin - fechaInicio;
//     const resultDA = diff/(1000*60*60*24)

//     // Cálculo FRC
//     const resultFRC = FRC(resultTED,resultDA)

//     // Cálculo FRCA

//     const calculoParaCambiar = () =>{
//         for (let i = 1;i<=n;i++){
//             console.log(1);

//         }
//     }
//     const resultFRCA = FRC(resultTED,resultDA)

//     // Cálculo del interés de la cuota
//     const resultIntCuo = IntCuo(resultTEM,resultDA,data.capital) //! solo para este caso como es el primer mes los dias que es lo que va en esta formula se usara los DA. PARA LOS SIGUIENTES SE TIENE QUE CAMBIAR

//     return {da:resultDA,
//         tem:resultTEM,
//         ted:resultTED, 
//         frc:resultFRC,
//         interesCuota :resultIntCuo}
    


// }

//! tenemos que hacer un for para calcular la suma total del FRCA, desues calcular la cuota capital, el seguro desgravamen y hacer el cronograma


 export const calculoParaCambiar = (data) =>{
    let [anio, mes, dia] = data.fechaPrimeraCuota.split('-')
    const cronogrrama =[]

    let fechaInicio = new Date(data.fechaDesembolso).getTime();
    let fechaFin    = new Date(data.fechaPrimeraCuota).getTime();
    let diff = fechaFin - fechaInicio;
    const resultDA = diff/(1000*60*60*24)



    //console.log(data.fechaPrimeraCuota);
    for (let i = 1;i<=data.nCuotas;i++){
        
        cronogrrama.push({cuota:i, fechaPago:sumarMes(data,i-1),Dias:diasXmes(data,i-1), DiasAcum:diasAcum(data,i-1)})
    }
   
    return cronogrrama
}

// se añade la columna con los dias por mes
// export const columnaDias = (data) =>{
//     for (let i = 1;i<=data.nCuotas;i++){
        
//         cronogrrama.push(...,{cuota:i, fechaPago:sumarMes(data.fechaPrimeraCuota,i-1)})
//     }
// }


//!usar despues
// const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
// const options = {
//   weekday: 'long',
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
// };

// console.log(event.toLocaleDateString('de-DE', options));
// // Expected output (varies according to local timezone): Donnerstag, 20. Dezember 2012

// console.log(event.toLocaleDateString('ar-EG', options));
// // Expected output (varies according to local timezone): الخميس، ٢٠ ديسمبر، ٢٠١٢

// console.log(event.toLocaleDateString(undefined, options));
// // Expected output (varies according to local timezone and default locale): Thursday, December 20, 2012


// let datasss = data.fechaPrimeraCuota
// console.log(data.fechaPrimeraCuota);
// const date = new Date(datasss);

// // ✅ DD/MM/YYYY
// const result1 = date.toLocaleDateString('en-GB');
// console.log(result1); // 👉️ 24/07/2023
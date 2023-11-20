 import { FRC, IntCuo, TED, TEM, TSegDD } from "./Formulas"

import {  CuotInt, SegDesg, diasAcum, diasXmes, solutionFRC, sumarMes } from "./CalculoDiasXMes";

export const Calculos = (data)=>{

    // Cálculo de TEM
    const resultTEM = TEM(data.tea)

    // Cálculo de TED
    const resultTED = TED(resultTEM)

    return {
        tem:resultTEM,
        ted:resultTED, 
    }
}

export const calculoParaCambiar = (data) =>{
    let capital = data.capital
   
    const cronograma =[]
    const resultTED = Calculos(data).ted
    let acumFRCA = []


    for (let i = 1;i<=data.nCuotas;i++){
        
        cronograma.push(
            {cuota:i, 
            fechaPago:sumarMes(data,i-1),
            Dias:diasXmes(data,i-1), 
            DiasAcum:diasAcum(data,i-1),
            FRC :solutionFRC(resultTED,data,i,acumFRCA)})
    }
    
    // FRCA
    const resultFRCA = acumFRCA.reduce((accum, currentValue) => accum + currentValue,0);
   

    return {
        cronog:cronograma,
        FRCA : resultFRCA
    }
}

 export const resultCuotas = (data)=>{

    const TSegM = 0.08 // %  //!este dato es en porcentaje, y es el valor de cada seguro, por lo que es modificable(tenerlo presente)
    let cronograma2=[]
    let acumFRCA = []
    let newCapital = []
    let resultFRCA = calculoParaCambiar(data).FRCA
    const resultTED = Calculos(data).ted
    const resultTEM = Calculos(data).tem

    for (let i = 1;i<=data.nCuotas;i++){
        
        cronograma2.push(
            {cuota:i, 
            fechaPago:sumarMes(data,i-1),
            Dias:diasXmes(data,i-1), 
            DiasAcum:diasAcum(data,i-1),
            FRC :solutionFRC(resultTED,data,i,acumFRCA),
            cuotaInteres:CuotInt(data,i-1,resultTEM,resultFRCA,newCapital).resultInt,
            cuotaCapital:CuotInt(data,i-1,resultTEM,resultFRCA,newCapital).resultCuo,
            capital:CuotInt(data,i-1,resultTEM,resultFRCA,newCapital).resultCap,
            SegDesgrvamen: CuotInt(data,i-1,resultTEM,resultFRCA,newCapital,TSegM).resultSeg,
            
         
        })
    }

    return cronograma2
 
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
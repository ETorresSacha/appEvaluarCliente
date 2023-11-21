 import {TED, TEM } from "./Formulas"

import {  CuotInt, diasAcum, diasXmes, solutionFRC, sumarMes } from "./CalculoDiasXMes";

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

    const CuotasT = []

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
            CuoSinITF : CuotInt(data,i-1,resultTEM,resultFRCA,newCapital,TSegM).resultCuoSinITF,
            CuoConITF : CuotInt(data,i-1,resultTEM,resultFRCA,newCapital,TSegM).resultCuoConITF,
            
         
        })
    }

       // CUOTA PROMEDIO
    //    let resultPromCuo = Cuotas.reduce((accum, currentValue) => accum + currentValue,0);
    //    resultPromCuo = resultPromCuo/data.nCuotas
       

    return cronograma2
 
 }

 // AJUSTANDO LOS RESULTADOS DEL CRONOGRAMA
 export const resutCronograma = (data)=>{

    const result = resultCuotas(data)
    let cuotas = []
    let promCuota
    

    // Cuota promedio
    result.map((element) => cuotas.push(element.CuoConITF))
    let resultPromCuo = cuotas.reduce((accum, currentValue) => accum + currentValue,0);
    promCuota = resultPromCuo/data.nCuotas

    // ITF
    let itf = promCuota * 0.00005

    // result
    let cronogramaAjustado = result.map((element) =>{

        return {
            cuota:element.cuota,
            fechaPago: element.fechaPago,
            capital: (promCuota-(element.cuotaInteres+element.SegDesgrvamen+itf)).toFixed(2),
            interes: element.cuotaInteres.toFixed(2),
            SegDesg:element.SegDesgrvamen.toFixed(2),
            ITF:itf.toFixed(2),
            cuota:promCuota.toFixed(2),
            dias:element.Dias


        }
        
    })

    return cronogramaAjustado


 } 

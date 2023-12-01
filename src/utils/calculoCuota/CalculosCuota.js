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

export const calculoFRCA = (data) =>{
   
    const resultTED = Calculos(data).ted
    let acumFRCA = []

    for (let i = 1;i<=data.cuotas;i++){
        solutionFRC(resultTED,data,i,acumFRCA)
    }
      
    // FRCA
    const resultFRCA = acumFRCA.reduce((accum, currentValue) => accum + currentValue,0);

    return resultFRCA
}

 export const cronPagos = (data)=>{

    const TSegM = 0.08 // %  //!este dato es en porcentaje, y es el valor de cada seguro, por lo que es modificable(tenerlo presente)
    let cronograma=[]
    let acumFRCA = []
    let newCapital = []
    let resultFRCA = calculoFRCA(data)
    const resultTED = Calculos(data).ted
    const resultTEM = Calculos(data).tem

    for (let i = 1;i<=data.cuotas;i++){
        
        cronograma.push(
            {
            cuota:i, 
            fechaPago:sumarMes(data,i-1),
            //sfechaPago:data.fechaPago,
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
       
    return cronograma
 
 }

 // AJUSTANDO LOS RESULTADOS DEL CRONOGRAMA
 export const resutCronograma = (data)=>{

    const result = cronPagos(data)
    let cuotas = []
    let promCuota
    
    // Cuota promedio
    result.map((element) => cuotas.push(element.CuoConITF))
    let resultPromCuo = cuotas.reduce((accum, currentValue) => accum + currentValue,0);
    promCuota = resultPromCuo/data.cuotas

        //! Cuota promedio 
        let cuotass = []
        result.map((element) => cuotass.push(element.cuotaCapital))
        let resultSumaCapi = cuotass.reduce((accum, currentValue) => accum + currentValue,0);
        //promCuota = resultPromCuo/data.cuotas
        console.log(resultSumaCapi.toFixed(2));

    // ITF
    let itf = (promCuota * 0.00005)
    itf = parseFloat(itf.toFixed(2))


    // result
    let cronogramaAjustado = result.map((element,index) =>{

        return {
   
            cuota:element.cuota,
            fechaPago: element.fechaPago,
            capital: (promCuota-(element.cuotaInteres+element.SegDesgrvamen+itf)).toFixed(2),
            interes: element.cuotaInteres.toFixed(2),
            SegDesg:element.SegDesgrvamen.toFixed(2),
            ITF:itf.toFixed(2),
            montoCuota:promCuota.toFixed(2),
            dias:element.Dias
        }
        
    })

    return cronogramaAjustado

 } 

 //! ver si sirve, sino eliminar
 export const OJO =(data)=>{
    let cuotas = []
    let promCuota
    const result = resutCronograma(data)
    
    // Cuota promedio
    result.map((element) => cuotas.push(parseFloat(element.capital)))
    let resultPromCuo = cuotas.reduce((accum, currentValue) => accum + currentValue,0);
    console.log("suma total capital: "+resultPromCuo.toFixed(2));
 }
 //!jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
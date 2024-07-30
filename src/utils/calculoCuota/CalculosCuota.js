 import {TED, TEM } from "./Formulas"

import {  CuotInt, diasAcum, diasXmes, paymentDate, solutionFRC } from "./CalculosFuncionesCrediticios";

//TODO --> TASA EFECTIVA
export const tasaEfectiva = (data)=>{

    // Cálculo de TEM
    const {tasaEfectivaPeriodico, periodo} = TEM(data)

    // Cálculo de TED
    const resultTED = TED(tasaEfectivaPeriodico,periodo)

    return {
        tem:tasaEfectivaPeriodico,
        ted:resultTED, 
        periodo:periodo
    }
}

    //TODO --> FRCA
export const calculoFRCA = (data) =>{
   
    const resultTED = tasaEfectiva(data).ted
    let acumFRCA = []

    for (let i = 1;i<=data.cuotas;i++){
        solutionFRC(resultTED,data,i,acumFRCA)
    }
    
    const resultFRCA = acumFRCA.reduce((accum, currentValue) => accum + currentValue,0);
    return resultFRCA
}

//TODO --> CRONOGRAMA DE PAGOS
 export const cronPagos = (data)=>{

    const TSegM = parseFloat(data?.tasaPrimaMensual) // % 
    let cronograma=[]
    let acumFRCA = []
    let newCapital = []
    let resultFRCA = calculoFRCA(data)
    const {tem, ted, periodo} = tasaEfectiva(data)
    for (let i = 1;i<=data.cuotas;i++){
        cronograma.push(
            {
            cuota:i, 
            fechaPago:paymentDate(data,i-1),
            fechaDesembolso:data?.fechaDesembolso,
            Dias:diasXmes(data,i-1), 
            DiasAcum:diasAcum(data,i-1),
            FRC :solutionFRC(ted,data,i,acumFRCA),
            cuotaInteres:CuotInt(data,i-1,tem,periodo,resultFRCA,newCapital).resultInt,
            cuotaCapital:CuotInt(data,i-1,tem,periodo,resultFRCA,newCapital).resultCuo,
            capital:CuotInt(data,i-1,tem,periodo,resultFRCA,newCapital).resultCap,
            SegDesgrvamen: CuotInt(data,i-1,tem,periodo,resultFRCA,newCapital,TSegM).resultSeg,
            CuoSinITF : CuotInt(data,i-1,tem,periodo,resultFRCA,newCapital,TSegM).resultCuoSinITF,
            CuoConITF : CuotInt(data,i-1,tem,periodo,resultFRCA,newCapital,TSegM).resultCuoConITF,
        })
    }
    return cronograma
 
 }

 //TODO --> AJUSTANDO LOS RESULTADOS DEL CRONOGRAMA
 export const resultCronograma = (data)=>{

    console.log("data: ",data);
    if(data.tipo == "Independiente"){
        return cuotaIndependiente(data)
    }
    else{
    const result = cronPagos(data) 
  
    let cuotas = []
    let promCuota
    
    // Cuota promedio
    result.map((element) => cuotas.push(element.CuoConITF))
    let resultPromCuo = cuotas.reduce((accum, currentValue) => accum + currentValue,0);
    promCuota = resultPromCuo/data.cuotas

    // ITF
    let itf = (promCuota * 0.00005)
    itf = parseFloat(itf.toFixed(2))


    // resultado
    let cronogramaAjustado = result.map((element,index) =>{

        return {
   
            cuota:element.cuota,//
            fechaDesembolso:element.fechaDesembolso,//
            fechaPago: paymentDate(data,i-1),
            capital: (promCuota-(element.cuotaInteres+element.SegDesgrvamen+itf)).toFixed(2),//
            interes: element.cuotaInteres.toFixed(2),//
            SegDesg:element.SegDesgrvamen.toFixed(2),
            ITF:itf.toFixed(2),
            montoCuota:promCuota.toFixed(2),//
            dias:element.Dias,
            statusPay:false//
        }
        
    })

    return cronogramaAjustado

}


 } 

 const calculoCuota = (data,i)=>{
    let cuota
    console.log("tipo pago",  data?.cuotas == i);
        //console.log(("i: ",typeof i));
    if(data?.tipoPago == "Interes"){
        
        if(data?.cuotas != i) cuota = data?.capital*data?.interes/100
        if (data?.cuotas == i) cuota = parseFloat(data?.capital*data?.interes/100)+parseFloat(data?.capital)

    }
    if (data?.tipoPago == "Fraccionado"){
        cuota = ((data?.capital*data?.interes/100+data?.capital)+data?.capital)/data?.cuota
    
    }

    return cuota
}

 //! se creara una funcion para hacer un cálculo de un  préstamo de manera independiente, esta en prueba
 export const cuotaIndependiente =(data)=>{
    let cronograma = []
    for (let i =1; i<=data?.cuotas;i++){
        cronograma.push({
            cuota:i,
            fechaDesembolso:data?.fechaDesembolso,
            fechaPago: paymentDate(data,i-1),//
            montoCuota:calculoCuota(data,i).toFixed(2),//
            statusPay:false//
        })

    }

    
    //TODO--> ESTAMOS EN ESTA PARTE, TOCA REALIZAR LA LÓGICA PARA QUE EL CREDITO SE EFECTUE
    //TODO--> DE ACUERDO A UN CRONOGRAMA DE PAGO, TIENE QUE VARIAR DE ACUERDO AL PERIODO Y 
    //TODO--> VER TAMBIEN EL INTERES
    //! es casi una reestructuracion de todo el credito

    return cronograma


 }
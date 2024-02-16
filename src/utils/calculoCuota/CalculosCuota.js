 import {TED, TEM } from "./Formulas"

import {  CuotInt, diasAcum, diasXmes, paymentDate, solutionFRC, sumarMes } from "./CalculoDiasXMes";

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

export const calculoFRCA = (data) =>{
   
    const resultTED = tasaEfectiva(data).ted
    let acumFRCA = []
    for (let i = 1;i<=data.cuotas;i++){
        solutionFRC(resultTED,data,i,acumFRCA)
    }
      
    // FRCA
    const resultFRCA = acumFRCA.reduce((accum, currentValue) => accum + currentValue,0);
    return resultFRCA
}
//! lo qu3 se tiene agregar el que el prestamo tambien saque el calculo por el tipo de periodo( EMPEZAR POR ESO)

 export const cronPagos = (data)=>{
    console.log(data);

    const TSegM = parseFloat(data.tasaPrimaMensual[0]) // %  //! tercero aqui. este dato es en porcentaje, y es el valor de cada seguro, por lo que es modificable(tenerlo presente)
    let cronograma=[]
    let acumFRCA = []
    let newCapital = []
    let resultFRCA = calculoFRCA(data)
    const {tem, ted, periodo} = tasaEfectiva(data)
    for (let i = 1;i<=data.cuotas;i++){
        ///! OJO: el interes mensual al finals e convierte en interes diario, por lo que cuando hacemos un prestamo
        //! por periodo tenemos que hacerlo al final con un tasa efectivo diario, modificar eso para todo, 
        //! TAMBIEN TEM ESTA EN LA CUOTINT ver ese tema para no alterar los resultados
        //! comienxa en FRC, Y SIGUE LA SECUENCIA
        cronograma.push(
            {
            cuota:i, 
            //fechaPago:sumarMes(data,i-1),
            fechaPago:paymentDate(data,i-1),
            fechaDesembolso:data.fechaDesembolso,
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
       //console.log(cronograma);
    return cronograma
 
 }

 // AJUSTANDO LOS RESULTADOS DEL CRONOGRAMA
 export const resultCronograma = (data)=>{

    const result = cronPagos(data) //! despues sigue aqui
    //console.log(result);
  
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

    // ITF
    let itf = (promCuota * 0.00005)
    itf = parseFloat(itf.toFixed(2))


    // result
    let cronogramaAjustado = result.map((element,index) =>{
        // let result
        // let [anio,mes,dia,] = element.fechaDesembolso.split('-')
        // result=`${dia.toString().padStart(2, "0")}-${mes.toString().padStart(2, "0")}-${anio}`

        return {
   
            cuota:element.cuota,
            fechaDesembolso:element.fechaDesembolso,
            fechaPago: element.fechaPago,
            capital: (promCuota-(element.cuotaInteres+element.SegDesgrvamen+itf)).toFixed(2),
            interes: element.cuotaInteres.toFixed(2),
            SegDesg:element.SegDesgrvamen.toFixed(2),
            ITF:itf.toFixed(2),
            montoCuota:promCuota.toFixed(2),
            dias:element.Dias,
            statusPay:false
        }
        
    })

    return cronogramaAjustado

 } 

 //! ver si sirve, sino eliminar
 export const OJO =(data)=>{
    let cuotas = []
    let promCuota
    const result = resultCronograma(data)
    
    // Cuota promedio
    result.map((element) => cuotas.push(parseFloat(element.capital)))
    let resultPromCuo = cuotas.reduce((accum, currentValue) => accum + currentValue,0);
    console.log("suma total capital: "+resultPromCuo.toFixed(2));
 }
 //!jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
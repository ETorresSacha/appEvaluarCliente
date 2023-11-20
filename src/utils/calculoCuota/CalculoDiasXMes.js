import { CapitalCuo, FRC, IntCuo } from "./Formulas"

// CRONOGRAMA DE LA FECHA
export const sumarMes = (data,i)=>{
    let fechaPago =""
    let [anio, mes, dia] = data.fechaPrimeraCuota.split('-')
    let nuevoAnio =""
    let parseMes = parseInt(mes)+i

    if(parseMes<=12) fechaPago=`${dia.toString().padStart(2, "0")}-${parseMes.toString().padStart(2, "0")}-${anio}`

    else  {
        
        let nuevoMes = parseInt(mes)+i

        if(nuevoMes % 12 === 0){
             nuevoAnio =parseInt(anio) + (nuevoMes/12 - 1)
        }

         if(nuevoMes % 12 !== 0){
             nuevoAnio = parseInt(anio)+(Math.trunc(nuevoMes/12))
         }

        mes=(parseInt(mes)+i)-(12*(nuevoMes % 12 ===0 ? (nuevoMes/12)-1 : Math.trunc(nuevoMes/12)))

        fechaPago=`${dia.toString().padStart(2, "0")}-${mes.toString().padStart(2, "0")}-${nuevoAnio}` 
    }
    return fechaPago   
}

// DIAS POR MES
export const diasXmes = (data,i)=>{
    let NDias = ""

    if (i===0){
        let fechaInicio = new Date(data.fechaDesembolso).getTime();
        let fechaFin    = new Date(data.fechaPrimeraCuota).getTime();
        let diff = fechaFin - fechaInicio;
        const resultDA = diff/(1000*60*60*24)
        NDias = resultDA
    }
    else{
        const resultDateIni = sumarMes(data,i-1)
        const resultDateFin = sumarMes(data,i)

        let [diaI,mesI, anioI ] = resultDateIni.split('-')
        let [diaF,mesF, anioF ] = resultDateFin.split('-')

        let fechaInicio   = new Date(`${anioI}-${mesI}-${diaI}`).getTime();
        let fechaFin   = new Date(`${anioF}-${mesF}-${diaF}`).getTime();
        let result = (fechaFin-fechaInicio)/(1000*60*60*24)
        NDias = result

    }

    return NDias
}

// DIAS ACUMULADOS
export const diasAcum = (data,i)=>{
    let acum = 0
    let fechaInicio = new Date(data.fechaDesembolso).getTime();
    let fechaFin    = new Date(data.fechaPrimeraCuota).getTime();

    if (i===0){
        let diff = fechaFin - fechaInicio;
        acum = diff/(1000*60*60*24)
    }
    else{

        const resultDateFin = sumarMes(data,i)
        let [diaF,mesF, anioF ] = resultDateFin.split('-')

        let fechaFin   = new Date(`${anioF}-${mesF}-${diaF}`).getTime();
        let result = (fechaFin-fechaInicio)/(1000*60*60*24)
        acum = result
    }
    return acum

}

// FRC
export const solutionFRC = (ted,data,i,acumFRCA)=>{

    let resultDiasAcum = diasAcum(data,i-1)
     let resul = FRC(ted,resultDiasAcum)
     acumFRCA.push(parseFloat(resul))
    
     return resul

}

// CUOTA INTERES, CAPITAL Y CAPITAL RESTANTE
export const CuotInt = (data,i,tem,resultFRCA,newCapital)=>{

    let resultDiasMes = diasXmes(data,i)
    let CAPITAL = parseFloat(data.capital)
    let resultCapital
    let resultCuoInt
    let resultCuoCap

    if(i === 0){

         // Cuota interes
         resultCuoInt = IntCuo(tem,resultDiasMes,CAPITAL)
         
         // Cuota capital
         resultCuoCap =  CapitalCuo(CAPITAL,resultFRCA,resultCuoInt)
         
         //Capital restante
         resultCapital = CAPITAL-resultCuoCap
         newCapital.push(resultCapital)
   
    }
    else{

        // Cuota interes
        resultCuoInt = IntCuo(tem,resultDiasMes,newCapital[0])
        
        // Cuota capital
        resultCuoCap =  CapitalCuo(CAPITAL,resultFRCA,resultCuoInt)
        
        //Capital restante
        resultCapital = (newCapital[0])-resultCuoCap
        resultCapital = Number.parseFloat(resultCapital).toFixed(10)
        newCapital.shift()
        newCapital.push(resultCapital)
 
    }
   

    return {
        resultInt:resultCuoInt,
        resultCuo: resultCuoCap,
        resultCap:resultCapital}

}


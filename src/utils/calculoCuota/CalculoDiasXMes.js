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
    // const mes30Dias = ['04','06','09','11']
    // const mes28Dias = ['02'] 
    // let accum=0
    // let fechaFin    = new Date(data.fechaPrimeraCuota).getTime();
 

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
    let acum = 0

    let resultDiasAcum = diasAcum(data,i-1)
     let resul = FRC(ted,resultDiasAcum)
     acumFRCA.push(parseFloat(resul))
    
     return resul

}

// CUOTA INTERES
//diasXmes("02-10-2010",1)
export const CuotInt = (data,i,tem,resultFRCA,newCapital)=>{
    //console.log(data);
    let resultDiasMes = diasXmes(data,i)
    let CAPITAL = parseFloat(data.capital)

 
    let resultCapital
    let resultCuoInt
    let resultCuoCap
    //console.log(resultDiasMes);
    //console.log("este es el capital: " + newCapital);//!


    
    if(i === 0){
         // Cuota interes
         console.log(tem);

    resultCuoInt = IntCuo(tem,resultDiasMes,CAPITAL)
    console.log(resultCuoInt);
    //const result = ((Math.pow((1+(1.6/100)),(32/30)))-1)*10000
    const result =  ((Math.pow((1+(20.98/100)),(30/360)))-1)*100
    console.log(Number.parseFloat(result).toFixed(2));
    console.log(result);

    // Cuota capital

    resultCuoCap =  CapitalCuo(CAPITAL,resultFRCA,resultCuoInt)

    //Capital restante
    resultCapital = CAPITAL-resultCuoCap
    //console.log("dentro del i=0: "+resultCapital);

    newCapital.push(resultCapital)
   
        

    }
    else{
         // Cuota interes
         //console.log(tem);
        
     //console.log("inicio: "+ newCapital[0]);//!

    resultCuoInt = IntCuo(tem,resultDiasMes,newCapital[0])
    

    // Cuota capital

    resultCuoCap =  CapitalCuo(CAPITAL,resultFRCA,resultCuoInt)
    //console.log(resultCuoCap);
   

    //Capital restante
   // console.log(typeof (newCapital[0]));
    //console.log( typeof resultCuoCap);
   // console.log(parseFloat(newCapital[0]));
   resultCapital = (newCapital[0])-resultCuoCap
   resultCapital = Number.parseFloat(resultCapital).toFixed(2)
    newCapital.shift()
    newCapital.push(resultCapital)
    //console.log(resultCapital);
    //console.log("fin: "+ newCapital);//!
 

    }
   
    //console.log(resultCuoInt);
    //console.log(newCapital);

    return {
        resultInt:resultCuoInt,
        resultCuo: resultCuoCap,
        resultCap:resultCapital}

}

// let a = [3]
//  a.shift()
// a.push(9)
// console.log(a);



//! EL CAPITAL NO SE ESTA MODIFICANDO, ESO TEM¿NEMOS QUE CORREGIR

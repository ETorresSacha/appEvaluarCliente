import { CapitalCuo, FRC, IntCuo, MonSegDM, TSegDD } from "./Formulas"
import { compareAsc, format,add,formatDistance, differenceInDays,getDate,isFuture} from 'date-fns'
// CRONOGRAMA DE LA FECHA
export const sumarMes = (data,i)=>{
    //console.log(data);
    let fechaPago =""
    let [anio, mes, dia] = data.fechaPrimeraCuota.split('-')
    let nuevoAnio =""
    let parseMes = parseInt(mes)+i

    if(parseMes<=12) fechaPago=`${anio}-${parseMes.toString().padStart(2, "0")}-${dia.toString().padStart(2, "0")}`

    else  {
        
        let nuevoMes = parseInt(mes)+i

        if(nuevoMes % 12 === 0){
             nuevoAnio =parseInt(anio) + (nuevoMes/12 - 1)
        }

         if(nuevoMes % 12 !== 0){
             nuevoAnio = parseInt(anio)+(Math.trunc(nuevoMes/12))
         }

        mes=(parseInt(mes)+i)-(12*(nuevoMes % 12 ===0 ? (nuevoMes/12)-1 : Math.trunc(nuevoMes/12)))

        fechaPago=`${nuevoAnio}-${mes.toString().padStart(2, "0")}-${dia.toString().padStart(2, "0")}` 
    }
    return fechaPago   
}

//! tenemos que ver como inplementar esto para que se visualice la fecha de pago de acuerdo al periodo
//! no esta entrando al switch
export const paymentDate = (data, value)=>{

    // Agregamos un dia a la decha de la primera cuota, porque por defecto del metododo "new Date" sale con un dia anterior a la fecha seleccionado
    const date = add(new Date(data.fechaPrimeraCuota), {
        days:1
      });

    let constante =1
    let time=''

    switch (data?.periodo){
        case 'Mensual':
            time='months'
            break
        case 'Quincenal':
            constante=15
            time='days'
            break
        case 'Semanal':
            time='weeks'
            break
        case 'Diario':
            time='days'
            break
        default:
            constante
    }

    // Forma la fecha de pago al tipo de periodo
    const newDate = add(new Date(date), {
        [time]: [constante*value]
      });
      
      return format(newDate,'yyyy-MM-dd')
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
        const resultDateIni = paymentDate(data,i-1)
        const resultDateFin = paymentDate(data,i)

        let [anioI,mesI,diaI] = resultDateIni.split('-')
        let [anioF,mesF,diaF ] = resultDateFin.split('-')

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

        const resultDateFin = paymentDate(data,i)
        let [ anioF,mesF,diaF ] = resultDateFin.split('-')

        let fechaFin   = new Date(`${anioF}-${mesF}-${diaF}`).getTime();
        let result = (fechaFin-fechaInicio)/(1000*60*60*24)
        acum = result
    }
    return acum

}

// FRC
export const solutionFRC = (ted,data,i,acumFRCA)=>{
    let resultDiasAcum = diasAcum(data,i-1)
    console.log(resultDiasAcum);
     let result = FRC(ted,resultDiasAcum)
     acumFRCA.push(parseFloat(result))
    
     return result

}


// CUOTA INTERES, CAPITAL Y CAPITAL RESTANTE
export const CuotInt = (data,i,tem,periodo,resultFRCA,newCapital,TSegM)=>{

    let resultDiasMes = diasXmes(data,i)
    let CAPITAL = parseFloat(data.capital)
    let resultTSegDD = TSegDD(TSegM)
    let resultCapital
    let resultCuoInt
    let resultCuoCap
    let resultMonSegDesg
    let CuoSinITF
    let RITF
    let CuoConITF

    if(i === 0){

         // Cuota interes
         resultCuoInt = IntCuo(tem,periodo,resultDiasMes,CAPITAL)
         
         // Cuota capital
         resultCuoCap =  CapitalCuo(CAPITAL,resultFRCA,resultCuoInt)
         
         //Capital restante
         resultCapital = CAPITAL-resultCuoCap
         newCapital.push(resultCapital)

        // Cálculo de la tasa de seguro de desgravamen diario
       
        resultMonSegDesg = MonSegDM(resultTSegDD,CAPITAL,resultDiasMes)
        
        // Cálculo de la cuota sin ITF
       
        CuoSinITF = resultCuoInt + resultCuoCap + resultMonSegDesg

        // Cálculo de ITF
        let ITF = CuoSinITF*0.00005
        RITF = Number.parseFloat(ITF).toFixed(2)

        // Cálculo de la cuota con ITF
        CuoConITF = parseFloat(CuoSinITF) + parseFloat(RITF)
      
    }
    else{

        // Cálculo de la tasa de seguro de desgravamen diario
        resultMonSegDesg = MonSegDM(resultTSegDD,newCapital[0],resultDiasMes)

        // Cuota interes
        resultCuoInt = IntCuo(tem,periodo,resultDiasMes,newCapital[0])
        
        // Cuota capital
        resultCuoCap =  CapitalCuo(CAPITAL,resultFRCA,resultCuoInt)
        
        // Cálculo de la cuota sin ITF
        CuoSinITF = resultCuoInt + resultCuoCap + resultMonSegDesg
        //CuotasT.push(CuoSinITF)

        // Cálculo de ITF
        let ITF = CuoSinITF*0.00005
        RITF = Number.parseFloat(ITF).toFixed(2)

        // Cálculo de la cuota con ITF
        CuoConITF = parseFloat(CuoSinITF) + parseFloat(RITF)
        //CuotasT.push(CuoConITF)
        
        //Capital restante
        resultCapital = (newCapital[0])-resultCuoCap
        resultCapital = Number.parseFloat(resultCapital).toFixed(10)
        newCapital.shift()
        newCapital.push(resultCapital)
 
    }

    return {
        resultInt:resultCuoInt,
        resultCuo: resultCuoCap,
        resultCap:resultCapital,
        resultSeg:resultMonSegDesg,
        resultCuoSinITF:CuoSinITF,
        resultCuoConITF:CuoConITF
    }
}



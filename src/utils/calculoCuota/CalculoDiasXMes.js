export const diasXmes = (data,i)=>{
    let NDias = ""
    const mes30Dias = ['04','06','09','11']
    const mes28Dias = ['02'] 
    let accum=0
    let fechaFin    = new Date(data.fechaPrimeraCuota).getTime();
 

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




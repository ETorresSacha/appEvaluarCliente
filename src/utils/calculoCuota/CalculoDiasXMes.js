export const diasXmes = (date)=>{
    let NDias = ""
    const mes30Dias = ['04','06','09','11']
    const mes28Dias = ['02'] 
    const [dia, mes,anio] = date.split('-')

    // Si el año es biciesto o no
    if (mes28Dias.includes(mes)){
        if((anio % 4 === 0) && (anio % 100 !=0 || anio % 400 ==0)){
            return NDias=29
        }
        else{
            return NDias=28
        }

    }
    else{
        if(mes30Dias.includes(mes)) { NDias=30}
        else  {NDias=31}
    }
    return NDias
}

// CRONOGRAMA DE LA FECHA
export const sumarMes = (date,i)=>{
    let fechaPago =""
    let [anio, mes, dia] = date.split('-')

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




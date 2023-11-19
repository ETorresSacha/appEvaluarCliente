const diasXmes = (date)=>{
    let NDias = ""
    const mes30Dias = ['04','06','09','11']
    const mes28Dias = ['02'] 
    const [anio, mes, dia] = date.split('-')

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

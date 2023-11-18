
// Cálculo de la tasa efectiva mensual
export const TEM = (TEA)=>{
    const periodo = 30
    const result =  ((Math.pow((1+(TEA/100)),(periodo/360)))-1)*100
    return Number.parseFloat(result).toFixed(3)
}

// Cálculo de la tasa efectiva diaria
export const TED = (TEM)=>{
 
    const result =  ((Math.pow((1+(TEM/100)),(1/30)))-1)*100
    return Number.parseFloat(result).toFixed(3)
}

// Cálculo de la tasa de seguro de desgravamen diario
export const TSegDD = (TSegM) =>{
    const result = (TSegM/30)
    return result
}

// Cálculo del factor de retorno de capital (FRC)
export const FRC = (TED,DA)=>{
    const result = (1/(Math.pow((1+(TED)),(DA))))
    return Number.parseFloat(result).toFixed(10)
}

// Cálculo del monto de seguro de desgravamen
export const MonSegDM = (TSegDD,capital,dias)=>{
    const result = TSegDD*capital*dias
    return Number.parseFloat(result).toFixed(2)
}

// Cálculo del interés de la cuota
export const IntCuo = (TEM,dias,capital)=>{
    const result = ((Math.pow((1+(TEM/100)),(dias/30)))-1)*capital
    return Number.parseFloat(result).toFixed(2)
}

// Cálculo del capital de la cuota
export const CapitalCuo =(capital,FRCA,IntCuo)=>{
    const result = (capital/FRCA) - IntCuo 
    return Number.parseFloat(result).toFixed(2)
}

// Cálculo de la cuota mensual
export const CM = (capital,FRCA,MonSegDM)=>{
    const result = (capital/FRCA) + MonSegDM 
    return Number.parseFloat(result).toFixed(2)
}

// Cálculo de la tasa de costo efectivo anual
export const TCEA =(tm,n)=>{
    const result = ((Math.pow((1+tm),(n)))-1)*100
    return Number.parseFloat(result).toFixed(2)

}







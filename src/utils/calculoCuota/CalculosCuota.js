import { FRC, IntCuo, TED, TEM } from "./Formulas"

export const Calculos = (data)=>{

    // Cálculo de TEM
    const resultTEM = TEM(data.tea)

    // Cálculo de TED
    const resultTED = TED(resultTEM)

    // Cálculo de los dias acumulados
    let fechaInicio = new Date(data.fechaDesembolso).getTime();
    let fechaFin    = new Date(data.fechaPrimeraCuota).getTime();
    let diff = fechaFin - fechaInicio;
    const resultDA = diff/(1000*60*60*24)

    // Cálculo FRC
    const resultFRC = FRC(resultTED,resultDA)

    // Cálculo del interés de la cuota
    const resultIntCuo = IntCuo(resultTEM,resultDA,data.capital) //! solo para este caso como es el primer mes los dias que es lo que va en esta formula se usara los DA. PARA LOS SIGUIENTES SE TIENE QUE CAMBIAR

    return {da:resultDA,
        tem:resultTEM,
        ted:resultTED, 
        frc:resultFRC,
        interesCuota :resultIntCuo}
    


}

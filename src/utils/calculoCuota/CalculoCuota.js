//Todo--> Fórmulas para el cálculo de la cuota y el cronograma de pagos

// Variables

const TEA = "" // Tasa Efectiva Anual
const TEM = "" // Tasa Efectiva Mensual
const TED = "" // Tasa Efectiva Diaria
const periodo="" // periodo
const TSegM = "" // Tasa de Seguro de Desgravamen Mensual
const TSegDD ="" // Tasa de Seguro de Desgravamen Diario
const FRC = "" // Factor de Retorno de Capital
const DA =""  // Dias Acumulados
const capital = "" //capital
const MonSegDM = "" // Monto Seguro de Desgravamen Mensual
const TCEA ="" // Tasa de Costo Efestivo Anual
const tm ="" // Tasa de Costo Efectivo Mensual
const n = "" // Número de cuotas
const IntCuo = "" // Capital de la cuota
const CapitalCuo = "" // Capital de la cuota


const ITF = 0.005 // Impuesto a las Transacciones Financieras (0.005%)

//! Cálculo de la tasa efectiva mensual

TEM = ((Math.pow((1+(TEA/100)),(periodo/360)))-1)*100

//! Cálculo de la tasa efectiva diaria

TED = ((Math.pow((1+(TEA/100)),(1/360)))-1)*100

//! Cálculo de la tasa de seguro de desgravamen diario

 TSegDD = (TSegM/30)*100

//! Cálculo del factor de retorno de capital (FRC)

FRC = (1/(Math.pow((1+TED),(DA))))

//! Cálculo del monto de seguro de desgravamen

 MonSegDM = TSegDD*capital*Dias(entrecuotas) //ojo

//! Cálculo del interés de la cuota

IntCuo = ((Math.pow((1+(TEM/100)),(DA/30)))-1)*capital

//! Cálculo del capital de la cuota

CapitalCuo = (capital/FRCA) - IntCuo // ojo FRCA
//! Cálculo de la cuota mensual

const CM = (capital/FRCA) + MonSegDM // ojo FRCA

//! Cálculo de la tasa de costo efectivo anual

TCEA = ((Math.pow((1+tm),(n)))-1)*100


//EJEMPLO

// Calcular la cuota mensual a pagar por un préstamo de  S/.5000 que se desembolsa el 18-12-2011;
// por el plazo de 12 meses y una Tasa Efectiva Anual(TEA) de 51.11%.

// DATOS:

    // Capital = 5000
    // TEA = 51.11%
    // n = 12 meses
    // ITF = 0.005%
    // P = Periodo entre cuotas (30 días)
    // TsegM = 0.03%

//? SOLUCIÓN


    capital = 5000  // soles
    TEA = 51.11     // %
    n= 12           // meses
    ITF = 0.005     // %
    P = 30          // dias
    TSegM = 0.03    //%

// CALCULO DE LA TASA EFECTIVA MENSUAL

TEM = ((Math.pow((1+(TEA/100)),(periodo/360)))-1)*100

TEM = ((Math.pow((1+(51.11/100)),(30/360)))-1)*100
console.log(TEM);
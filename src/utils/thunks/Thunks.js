import { compareAsc, format,add,formatDistance, getDate,isFuture,isEqual} from 'date-fns'
// ORDENAR
export const orderData = (type,data,value)=>{
    let result
    switch (type) {
        case 'dni':
            if (value) {
               result = data.sort((a, b) => a.dni - b.dni);
            
              } else {
                result = data.sort((a, b) => b.dni - a.dni);
              }
          break;

          case 'nombre':
            if (value) {
                
               result = data.sort((a, b) => a.nombre.localeCompare(b.nombre));
            
              } else {
                result = data.sort((a, b) => b.nombre.localeCompare(a.nombre));
              }
          break;
          case 'fecha':
            if (value) {

                result = data.sort((a, b) => new Date(b.resultPrestamo[0]?.fechaPago).getTime() - new Date(a.resultPrestamo[0]?.fechaPago).getTime());
               } else {
                 result = data.sort((a, b) => new Date(a.resultPrestamo[0]?.fechaPago).getTime() - new Date(b.resultPrestamo[0]?.fechaPago).getTime());
               }
          break;
          case 'cuota':
            if (value) {
                result = data.sort((a, b) => a.resultPrestamo[0].montoCuota - b.resultPrestamo[0].montoCuota);
             
               } else {
                 result = data.sort((a, b) => b.resultPrestamo[0].montoCuota - a.resultPrestamo[0].montoCuota);
               }
          break;
        
        default:
          result
            }
            return result
}

//CAMBIAR EL FORMATO DE LA FECHA
export const formatDate = (date)=>{
  let result
  let [mes,dia,anio] = date.split('-')
  result=`${dia.toString().padStart(2, "0")}-${mes.toString().padStart(2, "0")}-${anio}`
return result
}

// CUOTA DE PAGO AUTOMÁTICO

let data =[
{apellido: "Torres", celular: "965231452", correo: "Bshs@jeheh.com", direccion: "Jdjdhd", dni: "85632145", nombre: "Maritza", resultPrestamo:  [{ITF: "0.02", SegDesg: "0.05", capital: "337.53", cuota: 1, dias: 4, fechaPago: "12-29-2023", interes: "1.71", montoCuota: "339.31"}, {ITF: "0.02", SegDesg: "1.54", capital: "280.13", cuota: 2, dias: 354, fechaPago: "01-29-2024", interes: "57.62", montoCuota: "339.31"}], uuid: "49dcfc98-4338-4952-b62b-92d63e92a181"}, 
{apellido: "Torres", celular: "698563254", correo: "Bdhdh@hdhdh.com", direccion: "Jdhdhd", dni: "12346578", nombre: "Yerson", resultPrestamo: [{ITF: "0.03", SegDesg: "0.05", capital: "563.09", cuota: 1, dias: 2, fechaPago: "12-08-2023", interes: "2.10", montoCuota: "565.28"}, {ITF: "0.03", SegDesg: "4.16", capital: "362.53", cuota: 2, dias: 355, fechaPago: "01-08-2024", interes: "198.56", montoCuota: "565.28"}], uuid: "f32ccc62-7b93-40c5-a34e-4192d741a8a9"}, 
{apellido: "Torres",celular: "985632541", correo: "Hdh@hdhd.com", direccion: "Hdhdhd", dni: "98754236", nombre: "Adrian", resultPrestamo: [{ITF: "0.01", SegDesg: "0.12", capital: "189.84", cuota: 1, dias: 17, fechaPago: "12-28-2023", interes: "5.63", montoCuota: "195.60"}, {ITF: "0.01", SegDesg: "0.65", capital: "156.07", cuota: 2, dias: 354, fechaPago: "01-28-2024", interes: "38.87", montoCuota: "195.60"}], uuid: "4d2cafc9-5142-41b8-829c-dffc2d42ae32"}, 
{apellido: "Torres", celular: "968574262", correo: "eriktorressacha@gmail.com", direccion: "Dhhdhd", dni: "72161371", nombre: "Erik", resultPrestamo: [{ITF: "0.06", SegDesg: "1.39", capital: "1258.23", cuota: 1, dias: 26, fechaPago: "12-30-2023", interes: "32.49", montoCuota: "1292.17"}, {ITF: "0.06", SegDesg: "7.03", capital: "1102.39", cuota: 2, dias: 354, fechaPago: "01-30-2024", interes: "182.69", montoCuota: "1292.17"}], uuid: "6f1958b7-86ec-4d9b-9cfa-483352b480fc"}, 
{apellido: "Jdhdh", celular: "985623452", correo: "Hdhdg@jdjf.com", direccion: "Jshdvd", dni: "25487963", nombre: "Eeik", resultPrestamo: [{ITF: "0.06", SegDesg: "0.11", capital: "1269.82", cuota: 1, dias: 2, fechaPago: "12-30-2023", interes: "2.48", montoCuota: "1272.46"}, {ITF: "0.06", SegDesg: "6.93", capital: "1085.48", cuota: 2, dias: 354, fechaPago: "01-30-2024", interes: "179.99", montoCuota: "1272.46"}], uuid: "1b526522-a4bd-4e63-88e0-9eb4539d0b83"}, 
{apellido: "Torres sacha", celular: "964523325", correo: "eriktorressacha@gmail.com", direccion: "Jdhdhd", dni: "72161371", nombre: "Erik edson", resultPrestamo: [{ITF: "0.02", SegDesg: "0.43", capital: "419.28", cuota: 1, dias: 16, fechaPago: "12-21-2023", interes: "9.97", montoCuota: "429.69"}, {ITF: "0.02", SegDesg: "5.50", capital: "281.31", cuota: 2, dias: 354, fechaPago: "01-21-2024", interes: "142.87", montoCuota: "429.69"}, {ITF: "0.02", SegDesg: "0.01", capital: "429.48", cuota: 3, dias: 1, fechaPago: "02-21-2024", interes: "0.18", montoCuota: "429.69"}], uuid: "b0cdbb44-3a9c-4afb-95bc-104f838d9894"}, 
{apellido: "Lazaro", celular: "985632453", correo: "Hdhfh@jdhdh.com", direccion: "Hhhhf", dni: "78546321", nombre: "Carlos", resultPrestamo: [{ITF: "0.02", SegDesg: "0.19", capital: "390.26", cuota: 1, dias: 7, fechaPago: "12-14-2023", interes: "4.35", montoCuota: "394.81"}, {ITF: "0.02", SegDesg: "0.50", capital: "382.45", cuota: 2, dias: 31, fechaPago: "01-14-2024", interes: "11.83", montoCuota: "394.81"}, {ITF: "0.02", SegDesg: "0.19", capital: "390.19", cuota: 3, dias: 31, fechaPago: "02-14-2024", interes: "4.41", montoCuota: "394.81"}], uuid: "16fc4582-1fda-433c-b045-d683aa336ea5"},
{apellido: "Carlos", celular: "658723156", correo: "Vdhdh@jdhdh.com", direccion: "Hdhdhd", dni: "85463215", nombre: "Jose vera", resultPrestamo: [{ITF: "0.02", SegDesg: "0.13", capital: "365.01", cuota: 1, dias: 5, fechaPago: "12-08-2023", interes: "3.10", montoCuota: "368.26"}, {ITF: "0.02", SegDesg: "0.53", capital: "355.40", cuota: 2, dias: 31, fechaPago: "01-08-2024", interes: "12.32", montoCuota: "368.26"}, {"ITF": "0.02", SegDesg: "0.23", capital: "362.59", cuota: 3, dias: 31, fechaPago: "02-08-2024", interes: "5.42", montoCuota: "368.26"}], uuid: "928ae5cd-9a48-4dcb-afa4-8053a9f7d648"},
{apellido: "Carlos", celular: "658723156", correo: "Vdhdh@jdhdh.com", direccion: "Hdhdhd", dni: "85463215", nombre: "Jose vera", resultPrestamo: [{ITF: "0.02", SegDesg: "0.13", capital: "365.01", cuota: 1, dias: 5, fechaPago: "12-08-2023", interes: "3.10", montoCuota: "368.26"}, {ITF: "0.02", SegDesg: "0.53", capital: "355.40", cuota: 2, dias: 31, fechaPago: "01-08-2024", interes: "12.32", montoCuota: "368.26"}, {"ITF": "0.02", SegDesg: "0.23", capital: "362.59", cuota: 3, dias: 31, fechaPago: "02-08-2024", interes: "5.42", montoCuota: "368.26"}], uuid: "928ae5cd-9a48-4dcb-afa4-8053a9f7d648"},

]

export const fechaPagoAtomatico=(data)=>{
  let datesFilter=[]
  let resultDia
  let n=0
if(n==0){
  data.filter(element=>{
    if(element.fechaPago !== "") datesFilter.push(element.fechaPago)
})
n=1
}

if(n==1){

let toDay = format(new Date(), 'MM-dd-yyyy')

 let result=datesFilter.find(element=>toDay===element)

 if(result !==undefined){
  resultDia=result
 }
 else{
  result = datesFilter.find(element=>{
    let [mes,dia,anio] =element.split("-")
 
    return isFuture(new Date(anio, mes-1, dia))
  })
  resultDia=result
 }

  

  }
return formatDate(resultDia)

}


// ALERTA DE LA FECHA DE PAGO
let toDay = format(new Date(), 'MM-dd-yyyy')

export const alertDatePay =(data,toDay)=>{
  let morosos=[]
  let customerOk =[]
  
if(morosos.length==0){
  data.map((element)=>{

    let result = element.resultPrestamo.find(elem=>toDay==elem.fechaPago)

    if(result!==undefined){
      morosos.push(element)
    }
    else{
      customerOk.push(element)
    }
  })

}

return {
  resultMorosos:morosos,
  resultCustomerOk:customerOk
}

}
let result = alertDatePay(data,toDay)
console.log(result);

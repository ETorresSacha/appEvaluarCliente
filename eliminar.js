import { compareAsc, format,add,formatDistance, differenceInDays,getDate,isFuture} from 'date-fns'
// let array = [1.5,2.8,0.4,1]
// let result =array.sort((a,b) => a-b)
// console.log(result);

// let fechaInicio = new Date("12-30-2023").getTime();
// let fechaFin = new Date("02-10-2023").getTime();
// console.log(fechaInicio);
// console.log(fechaFin);

// console.log("A".charCodeAt());
// console.log("B".charCodeAt());
// console.log("C".charCodeAt());
// export const sumaUnicode = (string,index)=>{
//     let total
//     string = string.split('')
//     string=string.map(element=>element.charCodeAt())
//     total=string.reduce((acum,ind)=>acum+ind,index)
//     return total
// }

// const date1 = (new Date("10-02-2023")).getDate();
// console.log((date1));
// console.log(new Date("11-30-2023").getDate().toString().padStart(2, "0"));
// console.log(new Date("10-02-2023").getMonth().toString().padStart(2, "0"));
// console.log(new Date("10-02-2023").getFullYear().toString().padStart(2, "0"));


// console.log(sumaUnicode("02-10-2023",0));
// console.log(sumaUnicode("23-11-2023",0));
// console.log(sumaUnicode("30-11-2023",0));
// console.log(sumaUnicode("21-12-2023",0));

// // import { compareAsc, format,add,formatDistance, differenceInDays,getDate,isFuture} from 'date-fns'

// // let result = format(new Date(2014, 11, 11), 'dd-MM-yyyy')
// // console.log(result);
//=> '2014-02-11'

// var result2 = add(new Date(2014, 8, 1, 10, 19, 50), {
//     years: 2,
//     months: 9,
//     weeks: 1,
//     days: 7,
//     hours: 5,
//     minutes: 9,
//     seconds: 30,
//   })
// console.log(result);
// var result2 = add(new Date(2014, 8-1, 1), {
//     days: 30,
//   })
//   console.log(format(new Date(result2), 'dd-MM-yyyy'));

//   const result3= formatDistance(new Date(2023,12,29), new Date(2023,12,30))
//   console.log(result3);
//   console.log(new Date().getTime())
//   console.log(new Date().getDate()+24*60*60*1000);

//   let resultDia = dates.filter(element=>{
//     let [anio,mes,dia] =element.split("-")
//     //console.log(anio,mes,dia);
//     return isFuture(new Date(anio, mes, dia))
//   })
//   console.log(resultDia);
//   console.log(new Date(2023, 11, 31));
//   var resultu = isFuture(new Date(2023, 11, 8))
//   console.log(resultu);
//   // while (n<=DataTransfer.length){
    
//     // }
//     for(let i;i<=dates.length;i++){
//       let anio,mes,dia
      
//     }
//     let dates=["15-10-2023","15-11-2023","15-12-2023"]
//   let resultt=dates.map(element=>{
//      let [dia,mes,anio] =element.split("-")
//      console.log( mes-1);
//      if(isFuture(new Date(anio, mes-1, dia))){
//       return element
//      }
//   })
//     //let [anio,mes,dia] =element.split("-")
//     console.log(resultt);
//   let resultDia = dates.find(element=>{
//     let [dia,mes,anio] =element.split("-")
//     return isFuture(new Date(anio, mes-1, dia))
//   })
//   console.log(resultDia);

//   console.log(new Date("12-15-2023").getTime())
// let date =new Date()
// const trigger = add(new Date(date), {
//   //years: 2,
//   //months: 9,
//   // weeks: 1,
//   days: 7,
//   //hours: 5,
//  // minutes: 2,
//   //seconds: 30,
// });
// console.log(trigger);


// export const payDate = (periodo, value)=>{
//   console.log(value);
//   const trigger = add(new Date(date), {
//       //years: 2,
//       //months: 9,
//       // weeks: 1,
//       [periodo]: [value],
//       //hours: 5,
//      // minutes: 2,
//       //seconds: 30,
//     });
//     console.log(format(trigger,'dd-MM-yyyy'));
// return trigger 
// }
// let fecha = new Date()
// for (let i=0; i<=5;i++){
//   console.log(format(payDate("days",2),'dd-MM-yyyy'));
// }




// console.log(format(trigger,'dd-MM-yyyy'));
console.log(differenceInDays(new Date(2023,5,1), new Date(2023,4,30)))
console.log(new Date(2023,1,));
// console.log(new Date("12-18-2023").getTime())
// console.log(new Date("12-17-2023").getTime())
// console.log((new Date('01-08-2024').getTime())*(-1))
// console.log(new Date('01-09-2024'))

// var assert = require('assert');
// var equal = require('deep-equal');
// var x = { a : { n: 0 } };
// var y = { a : { n: 0 } };
// var z = { a : { n: 1 } };
// console.log(equal(x, y));
// let a = { age: 29, name: "Dionysia" };
// let b = { name: "Dionysia", age: 29 };

// console.log(equal(a, b));


// let numero = 12;
// let decimal = 12.4;
// let obj_numero = new Number(12);
// let cadena = 'Soy una cadena';
// let sin_numero = NaN;

// //console.log(Number.isInteger(numero));     // true
// //console.log(Number.isInteger(decimal));    // false
// //console.log(Number.isInteger(obj_numero)); // false
// //console.log(Number.isInteger(cadena));     // false
// console.log(Number.isInteger(sin_numero)); // false
let hoy = format(new Date(),"yyyy-MM-dd")
console.log((new Date(hoy).getTime()))
console.log(new Date());
console.log((new Date("2024-03-07").getTime()));
var Xmas95 = new Date();
var hours = Xmas95.getHours();

console.log(hours); // 23
var Xmas95 = new Date();
var minutos = Xmas95.getMinutes();

console.log(minutos); // 15

const timeAlert = ()=>{
    let horaActual = new Date();
    let horaProgramada = new Date()
    horaProgramada.setHours(18)
    horaProgramada.setMinutes(43)
    horaProgramada.setSeconds(0)

    return horaProgramada.getTime()-horaActual.getTime()
}
console.log(timeAlert());

// agregar tiempo a una fecha
var resultAgregardia = add(new Date(2014, 8, 1, 10, 19, 50), {
    years: 2,
    months: 9,
    weeks: 1,
    days: 7,
    hours: 5,
    minutes: 9,
    seconds: 30,
  });

  const dataExcel = [
    { name: "John", age: 30, city: "New York" },
    { name: "Jane", age: 25, city: "Los Angeles" },
    { name: "Peter", age: 40, city: "Chicago" },
    { name: "Erik", age: 32, city: "Perú" },
  ];
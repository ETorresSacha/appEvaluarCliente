let array = [1.5,2.8,0.4,1]
let result =array.sort((a,b) => a-b)
console.log(result);

let fechaInicio = new Date("12-30-2023").getTime();
let fechaFin = new Date("02-10-2023").getTime();
console.log(fechaInicio);
console.log(fechaFin);

console.log("A".charCodeAt());
console.log("B".charCodeAt());
console.log("C".charCodeAt());
export const sumaUnicode = (string,index)=>{
    let total
    string = string.split('')
    string=string.map(element=>element.charCodeAt())
    total=string.reduce((acum,ind)=>acum+ind,index)
    return total
}


console.log(sumaUnicode("02-10-2023",0));
console.log(sumaUnicode("23-11-2023",0));
console.log(sumaUnicode("30-11-2023",0));
console.log(sumaUnicode("21-12-2023",0));

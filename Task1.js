// <---------- Asynshronus and Non Blocking----------->


// console.log('Shivam');

// setTimeout(()=>{
//     console.log('Singh');
// },3000)

// console.log('Shiv');


// <---------- Single Threaded ----------->


// let fun = ()=>{
//     setTimeout(()=>{
//         console.log('1');
//     },1000)
//     setTimeout(()=>{
//         console.log('2');
//     },2000)
//     setTimeout(()=>{
//         console.log('3');
//     },2500)
// }

// fun()

// <---------- Dynamically Typed ----------->

// let a = 'Shivam'
// console.log(a);

// function dynamic(){
//     let a = 2
//     console.log(a);
// }
// console.log(a);

// dynamic() 

// <---------- Event Driven  ----------->



// In html file



// <---------- Let Example ----------->


// let x = 3

// x = 8
// {
//     let x = 4
//     console.log(x);
// }
// console.log(x);

// <---------- var example ----------->

// var x = 3
// x = 6

// {
//     var x = 4
//     console.log(x);
// }

// console.log(x);

// <---------- const example ----------->


// const x = 3
// x = 7
// {
//     const x = 4
//     console.log(x);
// }
// console.log(x);


// <---------- while example ----------->


// let i = 0

// while (i < 3) {
//     console.log(`Value of I is ${i}`);
//     i++;
// }

// <---------- do while  ----------->



// let i = 0

// do{
//     console.log(`Value of I is ${i}`);
//     i++;
// }while(i < 4)


// <---------- for example ----------->


// for example

// const array = ["Saab", "Volvo", "BMW"];

// for (let i = 0; i < array.length; i++) {
//     console.log(array[i]);
// }


// <---------- for each  does not return new array ----------->

// const colors = ["pink","red","blue","green"]

// colors.forEach((color)=>{
//     console.log(color);
// })


// <---------- Map example returns new array ----------->


// const numbers = [1 , 2 , 3 , 4]

// const newArray = numbers.map((number)=>number * 2)
// console.log(newArray);

// console.log(numbers);

// <---------- sort() example ----------->


// 

// const colors = ["pink","red","blue","green"]

// let sortArray = colors.sort()

// console.log(sortArray);


// <---------- filter method  .. filter the array  ----------->



// 

// const department = [
//     {name:'Shivam',department:'Node'},
//     {name:'Ayush',department:'Angular'},
//     {name:'SWapnil',department:'Angular'},
//     {name:'Arpit',department:'React'},
// ]

// const filterDept = department.filter((ele)=> ele.department == 'Angular')
// console.log(filterDept);


// <----------  reduce method  ----------->


const number = [2,4,5,5,5]

const reduced = number.reduce((acc,value)=>{
    return acc*value;
})

console.log(reduced);


//













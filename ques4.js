var DidPayment = true;

function message(){
    console.log("Payment Successful");
}

// function message1(){
//     return  "Payment Successful";
// }
function UserPayment(DidPayment, callback){
    if(DidPayment){
 	   callback();
    }else{
 	   UserPayment();
 	   if(DidPayment){
   	     callback();
 	   }else{
   	     UserPayment();
   	     if(Didpayment){
     	       callback();
   	     }else{
     	       UserPayment();
     	       //... And so on 
   	     }
 	   }
    }
}
// Making the call
UserPayment(DidPayment, message);

// when userPayment is called didPayment and message function is passed in the argument and userPayment function checks if didPayment is true then callback function is called which is message() function passed in the argument and message funtion prints "Payment successful" and when didPayment is false the it calls itself in a circular pattern and throws error 



// <----------------------- async and await  ---------------->


// function paymentStatus(){
//     return new Promise((resolve, reject)=> {
//         if(DidPayment == true){
//             setTimeout(() => {
//                 resolve('successful')
//             }, 1000);
//         }else{
//             setTimeout(() => {
                
//                 reject('failed')
//             }, 1000);
//         }
//     })
// }


// async function UserPayment(){
//     try{
//         let ans = await paymentStatus();
//         console.log(ans,"result");
//     }catch(e){
//         console.log(e,"err");
//     }
// }




// <----------------------- promise  ---------------->

// let p = new Promise((resolve, reject)=>{
//     if(DidPayment){
//         let ans = message1()
//         resolve(ans);
//     }else{
//         reject("fail")
//     }
// })


// p.then((res)=>{
//     console.log(res,"success");

// }).catch((e)=>{
//     console.log(e,"fail");
// })



function simple(delay){
    return new Promise((resolve, reject) => {
        setTimeout(()=>
         resolve(`Hello World ${delay}`), delay);
         reject(err)
    })
}

async function asyncData(){
    try{
        console.log('before delay');
        const result = await simple(3000); 
        const result1 = await simple(2000); 
        const result2 = await simple(1000); 
        console.log(result);
        console.log(result1);
        console.log(result2);

        console.log('After delay');
    }catch(err){
        console.log(err);
    }
}

asyncData()

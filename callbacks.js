function simpleFunction(callback , delay){
    setTimeout(() => {
        const result = `hello After ${delay} delay`;

        callback(result)
       

    }, delay);
}

function display(result){
    console.log(result,'kkk');
}

simpleFunction(display,1000)
simpleFunction(display,2000)
simpleFunction(display,3000)

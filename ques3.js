function print(i){
    console.log("This is call number "+i)
}

function fun1(callback){
    setTimeout(()=>{
        let i = 1 ;
 	   callback(i); i++ ;
 	   setTimeout(()=>{
 	
      	    callback(i); i++;
      	    setTimeout(()=>{
    	
        	    callback(i); i++ ;
        	    setTimeout(()=>{
      	
          		    callback(i); i++ ;
          		    setTimeout(()=>{
        	
            		    callback(i); i++ ;
            		    // .... and so on
            		    
          		    }, 800)
        	    }, 700)
      	    }, 500)
 	   }, 300)
    }, 100)
}

// Calling fun1 with print function as parameter
fun1(print);


// this is a callback hell example so when fun1 is called with argument print function which makes it a callback function and when it execute
// s the code setTimeout of 100 milliseconds is envoked immediately and it call the callback function that is print function and 
// print "this is call number 1" and then it increment i value to 2 and then so on






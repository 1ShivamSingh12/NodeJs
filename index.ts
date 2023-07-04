// const http = require('http');


// const server = http.createServer((req,res)=>{
//     res.write("hello world")
//     res.end()
// })

// server.listen(3000 , ()=>{
    //     console.log(`listen on ${port}`);
    // })
    

import { Response,Request } from "express"
const express = require('express')
const app = express()

const bodyParser = require('body-parser')

const port = 3000

app.use(bodyParser.json())

app.get('/sum',(req:Request,res:Response)=>{
    let sum:Number = req.body.num1 + req.body.num2
    res.send(`Sum of ${req.body.num1} and ${req.body.num2} is ${sum}`)
})

app.post('/subtraction',(req:Request,res:Response)=>{
    let sub:Number = req.body.num1 - req.body.num2
    res.send(`Subtraction of ${req.body.num1} and ${req.body.num2} is ${sub}`)
})

app.post('/multiply',(req:Request,res:Response)=>{
    let product:Number = req.body.num1 * req.body.num2
    res.send(`Product of ${req.body.num1} and ${req.body.num2} is ${product}`)
})

app.post('/divide',(req:Request,res:Response)=>{
    let divide:Number = req.body.num2 / req.body.num1
    res.send(`Divison of ${req.body.num1} and ${req.body.num2} is ${divide}`)
})

app.post('/modulus',(req:Request,res:Response)=>{
    let modulo:Number = req.body.num2 % req.body.num1
    res.send(`Modulus of ${req.body.num1} and ${req.body.num2} is ${modulo}`)
})

app.post('/square-root',(req:Request,res:Response)=>{
    let square:Number = req.body.num1 ** req.body.num2
    res.send(`Square Root of ${req.body.num1} and ${req.body.num2} is ${square}`)
})

app.post('/log',(req:Request,res:Response)=>{
    let log:Number= Math.log(req.body.num1)
    res.send(`Log of ${req.body.num1} is ${log}`)
})

app.listen(port,()=>{
    console.log(`listining on ${port}`);
})


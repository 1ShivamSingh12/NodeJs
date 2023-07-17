import express from 'express'
import connectDB from './db';


const app = express()


app.listen(6000 , async()=>{

    console.log('Listening at port 4000');

    await connectDB()

})
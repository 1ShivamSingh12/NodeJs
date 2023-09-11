
import mongoose from 'mongoose';
import { createClient } from 'redis';
 
const DATABASE_URL = "mongodb+srv://shivamsingh5:shivam791@cluster0.cmhyb3s.mongodb.net/cricketTournament";


export const connectDB = async () => {
  try {

    await mongoose.connect(DATABASE_URL)
    mongoose.set('debug', true);
    console.log('Connected Successfully...')
    
  } catch (error) {
    console.log(error)

  }
}


export const client = createClient();
client.on("error", (err:Error) => console.log("Redis Client Error", err));




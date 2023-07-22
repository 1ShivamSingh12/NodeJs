
import mongoose from 'mongoose';
import * as models from './models/syncCollection';
import { createClient } from "redis";
 
const DATABASE_URL = "mongodb+srv://shivamsingh5:shivam123@cluster0.oxeqemq.mongodb.net/instagram";
const client = createClient();


const connectDB = async () => {
  try {

    await mongoose.connect(DATABASE_URL)
    mongoose.set('debug', true);
    models.userData;
    console.log('Connected Successfully...')
    
  } catch (error) {
    console.log(error)

  }
}

export default connectDB
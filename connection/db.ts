
import mongoose from 'mongoose';
// import * as models from './models/syncCollection';
 
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


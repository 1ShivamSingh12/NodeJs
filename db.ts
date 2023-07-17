
import mongoose from 'mongoose';

const DATABASE_URL = "mongodb+srv://shivamsingh5:shivam123@cluster0.oxeqemq.mongodb.net/instagram";


const connectDB = async () => {
  try {

    await mongoose.connect(DATABASE_URL)
    console.log('Connected Successfully...')
    
  } catch (error) {
    console.log(error)

  }
}

export default connectDB
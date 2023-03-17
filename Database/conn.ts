// require('dotenv').config();
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}
const uri:string = process.env.MONGODB_URI;

const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(uri);

    if (connection.readyState === 1) {
      console.log('Database Connected');
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectMongo;

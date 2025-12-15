import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
const DB = async () => {
  dotenv.config();
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is undefined! Check your Vercel Environment Variables.');
    return;
  }
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(`Error : ${err.message}`.red.underline.bold);
    // process.exit(1); // Do not exit on Vercel
  }
};
export default DB;

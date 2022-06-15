import mongoose from 'mongoose';
import colors from 'colors';
import dotenv from 'dotenv';
const DB = async () => {
  dotenv.config();
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connect.connection.host}`.cyan.underline);
  } catch (err) {
    console.error(`Error : ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};
export default DB;

import mongoose from 'mongoose';
import users from './data/users.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import products from './data/products.js';
import dotenv from 'dotenv';
import DB from './config/db.js';
import colors from 'colors';

dotenv.config();
DB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const createdProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(createdProducts);
    console.log('Data Imported'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}

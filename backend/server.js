import path from 'path';
import express from 'express';

import colors from 'colors';

import morgan from 'morgan';
// import cloudinary from './utils/cloudinary.js';
import DB from './config/db.js';
import { frontError, backError } from './Middleware/errorMiddileware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import cookieSession from 'cookie-session';
import './passport.js';

dotenv.config();

DB();

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// app.use(express.json({ limit: '30mb', extended: true }));
// app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://h-storecart.herokuapp.com'],
    credentials: true,
  }),
);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID),
);

const __dirname = path.resolve();
app.use('/uploads', express.static('uploads'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')),
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.use(frontError);
app.use(backError);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);

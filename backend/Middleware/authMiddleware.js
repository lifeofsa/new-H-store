import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id);

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('unAuthorized');
    }
  }
  if (!token) {
    res.status(404);
    throw new Error('unAuthorized');
  }
});

const admin = async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'not Authorized as an admin' });
  }
};
export { protect, admin };

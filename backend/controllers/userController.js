import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import webToken from '../utils/webToken.js';
import e from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
// import _ from 'loadash';
dotenv.config();

// @desc       Fetch all products
// @method     POST /api/products
// @access     public
const userController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    if (await user.matchPassword(password)) {
      res.json({
        token: webToken(user._id),
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(401);
      throw new Error('Password is incorrect');
    }
  } else {
    res.status(401);
    throw new Error('Email is incorrect');
  }
});

// @desc     POST register facebook user
// @method   POST /api/users/facebook/auth
// @access   public

const facebookController = asyncHandler((req, res) => {
  const { accessToken, userID } = req.body;
  // let pa = `https://graph.facebook.com/v2.11/${userID}/?fields=id,email,name&access_token=${accessToken}`;
  let urlGraphFacebook = `https://graph.facebook.com/${userID}?fields=id,name,email&access_token=${accessToken}`;
  fetch(urlGraphFacebook, {
    method: 'GET',
    redirect: 'https://h-storecart.herokuapp.com/',
  })
    .then((response) => response.json())
    .then((response) => {
      const { email, name } = response;
      User.findOne({ email }).exec((err, user) => {
        if (err) {
          res.status(400);
          throw new Error('Something Went Wrong....');
        } else {
          if (user) {
            res.json({
              id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token: webToken(user._id),
            });
            // res.redirect('/auth/facebook/callback');
          } else {
            let password = email + process.env.JWT_SECRET;
            let newUser = new User({ name, email, password });
            newUser.save((err, data) => {
              if (err) {
                res.status(400).json('Something went wrong..');
              } else {
                res.json({
                  id: data._id,
                  name: data.name,
                  email: data.email,
                  isAdmin: data.isAdmin,
                  token: webToken(data._id),
                });
                // res.redirect('/auth/facebook/callback');
              }
            });
          }
        }
      });
    });
});

// @desc     POST register new user
// @method   POST /api/users
// @access   public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).json('Something went wrong/..');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: webToken(user._id),
    });
  } else {
    res.status(400).json('Something went wrong/..');
  }
});

// @desc      GET Userr Profile
// @method    GET /api/users/profile
// @access    private
const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
};
// @desc      Update User Profile
// @method    PUT /api/users/profile
// @access    private
const getUserUpdate = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: webToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('Something went wrong');
  }
});

// @desc      GET All User by admin
// @method    GET /api/users
// @access    private/admin
const getUserAdmin = asyncHandler(async (req, res) => {
  const user = await User.find({});
  res.json(user);
});

// @desc      DELETE user by admin
// @method    Delete/api/users/:id
// @access    private/admin
const deleteUserAdmin = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ msg: 'User Deleted Succesfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
// @desc      GET User by id
// @method    GET /api/users/:id
// @access    private/admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User Not Found');
  }
});

// @desc      Update User Profile
// @method    PUT /api/users/:id
// @access    private/admin
const getUpdateById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const UpdatedUserById = await user.save();
    res.json({
      _id: UpdatedUserById._id,
      name: UpdatedUserById.name,
      email: UpdatedUserById.email,
      isAdmin: UpdatedUserById.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('Something went wrong');
  }
});

export {
  userController,
  registerUser,
  getUser,
  getUserUpdate,
  getUserAdmin,
  deleteUserAdmin,
  getUserById,
  getUpdateById,
  facebookController,
};

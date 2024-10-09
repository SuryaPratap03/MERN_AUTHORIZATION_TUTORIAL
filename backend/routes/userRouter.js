import express from 'express';
import User from '../models/users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { getUser, login, logout, refreshtoken, signup, verifytoken } from '../controllers/userControllers.js';

const router = express.Router();

//signup
router.post('/signup',signup)

//login
router.post('/login',login)

//verifytoken + getUser
router.get('/user',verifytoken,getUser);

//refreshtoken
router.get('/refreshtoken',refreshtoken,verifytoken,getUser);

//logout
router.get('/user/logout',logout);
export default router;

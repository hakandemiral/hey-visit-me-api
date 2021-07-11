import express from 'express';
import captchaVerify from '../middlewares/captchaVerify.js';
import { signUp, signIn } from '../controllers/auth.js';

const auth = express.Router();

auth.post('/sign-up', /* captchaVerify, */ signUp);
auth.post('/sign-in', /* captchaVerify, */ signIn);

export default auth;

import express from 'express';
import { getUser } from '../controllers/public.js';

const publicRoute = express.Router();

publicRoute.get('/getUser/:userName', getUser);

export default publicRoute;
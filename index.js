// Cores
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import tokenVerify from './middlewares/tokenVerify.js';

// Routers
import authRouter from './routes/auth.js';
import userRouter from './routes/user.js';
import publicRouter from './routes/public.js';

// express initialize
dotenv.config();
const app = express();

// configure express
app.use(express.json({ limit: '5mb', extended: true }));
app.use(cors({
    origin: '*'
}));
app.use(morgan('tiny'));

// routes
app.use('/auth', authRouter);
app.use('/user', tokenVerify, userRouter);
app.use('/public', publicRouter);

const serverStart = async () => {
    try {
        // db connection and server run
        const PORT = process.env.PORT || 8080;
        const DB_URL = process.env.MONGO_DB_URL;

        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => {
            console.log('Server is running on', PORT);
        });
    } catch (error) {
        console.log(error);
    }
};


serverStart();

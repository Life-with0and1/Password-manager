import express from 'express';
import dbConnect from './config/dbConnection.js';
import { config } from 'dotenv';
import userRouter from './src/routes/user.route.js';
import credentialRouter from './src/routes/credentials.route.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

config();
dbConnect();

const PORT = process.env.PORT;

app.use("/api", userRouter);

app.use("/api/credential", credentialRouter);

app.listen(PORT)
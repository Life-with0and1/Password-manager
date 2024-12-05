import express from 'express';
import { signIn, signUp } from '../controllers/user.controller.js';
const userRouter = express.Router();

userRouter.post("/register",signUp);

userRouter.post("/login",signIn);

export default userRouter;
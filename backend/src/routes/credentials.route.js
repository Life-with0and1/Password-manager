import express from 'express';
import { add, get, remove, update } from '../controllers/credentials.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const credentialRouter = express.Router();

credentialRouter.post("/add", authMiddleware, add);

credentialRouter.get("/get", authMiddleware, get);

credentialRouter.patch("/update/:id", authMiddleware, update);

credentialRouter.delete("/remove/:id", authMiddleware, remove);


export default credentialRouter;
import express from 'express';
import { newUserController } from '../controllers/userController.js';

const app = express.Router();

app.post("/new", newUserController);

export default app;
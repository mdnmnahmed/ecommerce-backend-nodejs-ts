import express from 'express';
import { getAllUsersController, newUserController } from '../controllers/userController.js';

const app = express.Router();

app.post("/new", newUserController);
app.get("/all-users", getAllUsersController);


export default app;
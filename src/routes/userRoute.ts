import express from 'express';
import { getAllUsersController, getUserDetailsController, newUserController } from '../controllers/userController.js';

const app = express.Router();

app.post("/new", newUserController);
app.get("/all-users", getAllUsersController);
app.get("/user-details/:userId", getUserDetailsController);

export default app;
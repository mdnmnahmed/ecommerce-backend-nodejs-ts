import express from 'express';
import { deleteUserController, getAllUsersController, getUserDetailsController, newUserController } from '../controllers/userController.js';

const app = express.Router();

app.post("/new", newUserController);
app.get("/all-users", getAllUsersController);
app.get("/user-details/:userId", getUserDetailsController);
app.delete("/delete-user/:userId", deleteUserController);

export default app;
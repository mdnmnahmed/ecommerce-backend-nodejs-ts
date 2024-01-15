import express from 'express';
import { deleteUserController, getAllUsersController, getUserDetailsController, newUserController } from '../controllers/userController.js';
import { isAdminMiddleware } from '../middlewares/isAdminMiddleware.js';

const app = express.Router();

app.post("/new", newUserController);
app.get("/all-users", isAdminMiddleware, getAllUsersController);
app.get("/user-details/:userId", isAdminMiddleware, getUserDetailsController);
app.delete("/delete-user/:userId", isAdminMiddleware, deleteUserController);

export default app;
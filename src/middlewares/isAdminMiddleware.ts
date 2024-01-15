import ErrorHandlerClass from '../utils/ErrorHandlerClass.js';
import { TryCatchHandler } from './errorMiddleware.js';
import { UserModel } from '../models/userModel.js';

export const isAdminMiddleware = TryCatchHandler(async (req, res, next) => {
    const { id } = req.query;
    if (!id) {
        return next(new ErrorHandlerClass("Please login first.", 401));
    }

    const userData = await UserModel.findById(id);
    if (!userData) {
        return next(new ErrorHandlerClass("Unauthorize user.", 401));
    }
    if (userData.role !== "admin") {
        return next(new ErrorHandlerClass("Unauthorize user to perform this action.", 401));
    }

    next();
});
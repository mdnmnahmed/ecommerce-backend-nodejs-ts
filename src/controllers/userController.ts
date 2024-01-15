import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/userModel.js";
import { NewUserRequestBody } from "../types/commonTypes.js";
import ErrorHandlerClass from "../utils/ErrorHandlerClass.js";
import { TryCatchHandler } from "../middlewares/errorMiddleware.js";


export const newUserController = TryCatchHandler(async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
) => {
    const { _id, name, email, gender, dob, photo } = req.body;

    const existingUser = await UserModel.findById(_id);
    if (existingUser) {
        return res.status(200).json({
            success: true,
            message: `Welcome, ${existingUser.name}`,
        });
    }

    if (!_id || !name || !email || !photo || !gender || !dob) {
        return next(new ErrorHandlerClass("Please add all fields", 400));
    }


    const newUser = await UserModel.create({
        _id,
        name,
        email,
        gender,
        dob: new Date(dob),
        photo
    });
    return res.status(201).json({
        success: true,
        message: `Welcome, ${newUser.name}`,
    });
});


export const getAllUsersController = TryCatchHandler(async (req, res, next) => {
    const allUsers = await UserModel.find({});
    return res.status(200).json({
        success: true,
        message: `Fetched all users`,
        data: allUsers
    });
});

export const getUserDetailsController = TryCatchHandler(async (req, res, next) => {
    const { userId } = req.params;
    const userDetails = await UserModel.findById(userId);

    if (!userDetails) {
        return next(new ErrorHandlerClass("User not found", 404));
    }

    return res.status(200).json({
        success: true,
        message: `Fetched user details`,
        data: userDetails
    });
});

export const deleteUserController = TryCatchHandler(async (req, res, next) => {
    const { userId } = req.params;
    const userData = await UserModel.findById(userId);

    if (!userData) {
        return next(new ErrorHandlerClass("User not found", 404));
    }

    await userData.deleteOne();

    return res.status(200).json({
        success: true,
        message: `User deleted successfully`,
        data: userData
    });
});
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/userModel.js";
import { NewUserRequestBody } from "../types/commonTypes.js";


export const newUser = async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
) => {
    try {
        const { _id, name, email, gender, dob, photo } = req.body;

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
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Something went wrong.`,
            error
        });
    }
} 
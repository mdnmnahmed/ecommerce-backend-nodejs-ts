import { NextFunction, Request, Response } from "express";
export interface NewUserRequestBody {
    _id: string;
    name: string;
    email: string;
    gender: string;
    dob: Date;
    photo: string;
}

export type ControllerType = (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
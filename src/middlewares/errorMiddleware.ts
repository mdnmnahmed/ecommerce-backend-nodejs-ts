import { NextFunction, Request, Response } from 'express';
import ErrorHandlerClass from '../utils/ErrorHandlerClass.js';
import { ControllerType } from '../types/commonTypes.js';

export const errorMiddleware = (err: ErrorHandlerClass, req: Request, res: Response, next: NextFunction) => {
    err.message ||= "Internal server error.";
    err.statusCode ||= 500;
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        error: err
    });
}

export const TryCatchHandler = (func: ControllerType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        return Promise.resolve(func(req, res, next)).catch(next);
    }
}
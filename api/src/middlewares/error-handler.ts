import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({
        status: false,
        errors: [{ message: "Something went wrong", param: "Server Error" }],
    });
};

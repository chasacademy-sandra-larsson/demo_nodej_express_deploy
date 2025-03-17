import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const validateUser = [
    body("email").isEmail(),
    body("password").isLength({min: 8}),
    (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
            return;
        }
        next();
    }
]